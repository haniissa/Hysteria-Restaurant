import {
  INITIAL_REVIEWS,
  MENU_CATALOG,
  STORE_INFO,
  type MenuItem,
  type ReviewItem,
} from '../shared/menuData.ts';
import {
  getStoreOpenStatus,
  validateOrderRequest,
  validateReviewRequest,
  type ConfirmedOrder,
  type OrderRequestPayload,
  type ReviewPayload,
} from './orderLogic.ts';

const STATIC_REVIEWS_KEY = 'hysteria_static_reviews_v1';
const STATIC_ORDERS_KEY = 'hysteria_static_orders_v1';

function isJsonResponse(res: Response): boolean {
  const ct = res.headers.get('content-type') ?? '';
  return ct.toLowerCase().includes('application/json');
}

function readStaticStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStaticStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or private-mode restrictions
  }
}

export async function fetchBootstrapData(): Promise<{
  catalog: MenuItem[];
  reviews: ReviewItem[];
  liveStatusLabel: string;
  averageRating: number;
}> {
  try {
    const [menuRes, storeRes, reviewsRes] = await Promise.all([
      fetch('/api/menu'),
      fetch('/api/store-info'),
      fetch('/api/reviews'),
    ]);

    if (menuRes.ok && isJsonResponse(menuRes)) {
      const menuData = (await menuRes.json()) as { allItems?: MenuItem[] };
      const storeData =
        storeRes.ok && isJsonResponse(storeRes)
          ? ((await storeRes.json()) as {
              liveStatus?: { statusLabel: string };
              averageRating?: number;
            })
          : {};
      const reviewsData =
        reviewsRes.ok && isJsonResponse(reviewsRes)
          ? ((await reviewsRes.json()) as { reviews?: ReviewItem[] })
          : {};

      return {
        catalog:
          Array.isArray(menuData.allItems) && menuData.allItems.length > 0
            ? menuData.allItems
            : MENU_CATALOG,
        reviews: Array.isArray(reviewsData.reviews) ? reviewsData.reviews : INITIAL_REVIEWS,
        liveStatusLabel: storeData.liveStatus?.statusLabel ?? getStoreOpenStatus().statusLabel,
        averageRating:
          typeof storeData.averageRating === 'number'
            ? storeData.averageRating
            : STORE_INFO.rating,
      };
    }
  } catch {
    // Static host (e.g. GitHub Pages) has no Hono backend; fall through cleanly
  }

  return {
    catalog: MENU_CATALOG,
    reviews: readStaticStorage<ReviewItem[]>(STATIC_REVIEWS_KEY, INITIAL_REVIEWS),
    liveStatusLabel: getStoreOpenStatus().statusLabel,
    averageRating: STORE_INFO.rating,
  };
}

export async function submitOrder(
  payload: OrderRequestPayload,
  catalog: MenuItem[],
): Promise<
  { ok: true; order: ConfirmedOrder } | { ok: false; errors: Record<string, string> }
> {
  const clientCheck = validateOrderRequest(payload, catalog);
  if (!clientCheck.ok) {
    return { ok: false, errors: clientCheck.errors };
  }

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (isJsonResponse(res)) {
      const data = (await res.json()) as {
        order?: ConfirmedOrder;
        errors?: Record<string, string>;
        error?: string;
      };
      if (res.ok && data.order) {
        return { ok: true, order: data.order };
      }
      return {
        ok: false,
        errors: data.errors ?? { form: data.error ?? 'Could not place order.' },
      };
    }
  } catch {
    // Fall through to static GitHub Pages mode below
  }

  // Static GitHub Pages mode: confirm validated order locally
  const existing = readStaticStorage<ConfirmedOrder[]>(STATIC_ORDERS_KEY, []);
  const orderId = `HYS-${1042 + existing.length}`;
  const estimatedMinutes =
    clientCheck.data.fulfillment === 'delivery'
      ? 30
      : clientCheck.data.fulfillment === 'pickup'
        ? 12
        : 10;

  const confirmed: ConfirmedOrder = {
    orderId,
    status: 'grilling',
    estimatedMinutes,
    customerName: clientCheck.data.customerName,
    phone: clientCheck.data.phone,
    fulfillment: clientCheck.data.fulfillment,
    address: clientCheck.data.address,
    notes: clientCheck.data.notes,
    items: clientCheck.data.items,
    subtotalJod: clientCheck.data.subtotalJod,
    deliveryFeeJod: clientCheck.data.deliveryFeeJod,
    totalJod: clientCheck.data.totalJod,
    createdAt: new Date().toISOString(),
  };

  writeStaticStorage(STATIC_ORDERS_KEY, [confirmed, ...existing.slice(0, 19)]);
  return { ok: true, order: confirmed };
}

export async function submitReview(
  payload: ReviewPayload,
): Promise<{ ok: true; review: ReviewItem } | { ok: false; errors: Record<string, string> }> {
  const check = validateReviewRequest(payload);
  if (!check.ok) {
    return { ok: false, errors: check.errors };
  }

  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (isJsonResponse(res)) {
      const data = (await res.json()) as {
        review?: ReviewItem;
        errors?: Record<string, string>;
        error?: string;
      };
      if (res.ok && data.review) {
        return { ok: true, review: data.review };
      }
      return {
        ok: false,
        errors: data.errors ?? { form: data.error ?? 'Could not submit review.' },
      };
    }
  } catch {
    // Fall through to static GitHub Pages mode below
  }

  const newReview: ReviewItem = {
    id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    author: check.data.author,
    role: check.data.role,
    rating: check.data.rating,
    comment: check.data.comment,
    createdAt: new Date().toISOString(),
  };

  const existing = readStaticStorage<ReviewItem[]>(STATIC_REVIEWS_KEY, INITIAL_REVIEWS);
  writeStaticStorage(STATIC_REVIEWS_KEY, [newReview, ...existing]);
  return { ok: true, review: newReview };
}
