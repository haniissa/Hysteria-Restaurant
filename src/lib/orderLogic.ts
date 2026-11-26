import type { MenuCategory, MenuItem } from '../shared/menuData.ts';

export type FulfillmentMode = 'pickup' | 'delivery' | 'dine_in';

export interface CartLineInput {
  itemId: string;
  quantity: number;
  spiceLevel?: 'mild' | 'spicy' | 'extra_crazy';
  notes?: string;
}

export interface OrderRequestPayload {
  customerName: string;
  phone: string;
  fulfillment: FulfillmentMode;
  address?: string;
  notes?: string;
  items: CartLineInput[];
}

export interface ConfirmedOrderItem {
  itemId: string;
  name: string;
  arabicName: string;
  unitPriceJod: number;
  quantity: number;
  lineTotalJod: number;
  spiceLevel: 'mild' | 'spicy' | 'extra_crazy';
  notes: string;
}

export interface ConfirmedOrder {
  orderId: string;
  status: 'received' | 'grilling' | 'ready';
  estimatedMinutes: number;
  customerName: string;
  phone: string;
  fulfillment: FulfillmentMode;
  address: string;
  notes: string;
  items: ConfirmedOrderItem[];
  subtotalJod: number;
  deliveryFeeJod: number;
  totalJod: number;
  createdAt: string;
}

export interface ReviewPayload {
  author: string;
  role?: string;
  rating: number;
  comment: string;
}

export interface CartSummary {
  subtotalJod: number;
  deliveryFeeJod: number;
  totalJod: number;
  itemCount: number;
  freeDeliveryThresholdJod: number;
  amountToFreeDeliveryJod: number;
}

export const FREE_DELIVERY_THRESHOLD_JOD = 10.0;
export const STANDARD_DELIVERY_FEE_JOD = 1.0;

export function roundJod(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatJod(amount: number): string {
  return `${roundJod(amount).toFixed(2)} JOD`;
}

export function filterMenuItems(
  items: MenuItem[],
  category: MenuCategory,
  searchQuery = '',
  includeCounterAddonsInAll = false,
): MenuItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory =
      category === 'all'
        ? includeCounterAddonsInAll || item.isCore
        : item.category === category;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return (
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.arabicName.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.tag.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function calculateCartTotals(
  lines: CartLineInput[],
  catalog: MenuItem[],
  fulfillment: FulfillmentMode,
): CartSummary {
  const byId = new Map(catalog.map((item) => [item.id, item]));
  let subtotal = 0;
  let itemCount = 0;

  for (const line of lines) {
    const product = byId.get(line.itemId);
    if (!product || !Number.isInteger(line.quantity) || line.quantity <= 0) {
      continue;
    }
    subtotal += product.priceJod * line.quantity;
    itemCount += line.quantity;
  }

  subtotal = roundJod(subtotal);
  const deliveryFeeJod =
    fulfillment === 'delivery' && subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD_JOD
      ? STANDARD_DELIVERY_FEE_JOD
      : 0;
  const totalJod = roundJod(subtotal + deliveryFeeJod);
  const amountToFreeDeliveryJod =
    fulfillment === 'delivery' && subtotal < FREE_DELIVERY_THRESHOLD_JOD
      ? roundJod(FREE_DELIVERY_THRESHOLD_JOD - subtotal)
      : 0;

  return {
    subtotalJod: subtotal,
    deliveryFeeJod,
    totalJod,
    itemCount,
    freeDeliveryThresholdJod: FREE_DELIVERY_THRESHOLD_JOD,
    amountToFreeDeliveryJod,
  };
}

export function validateOrderRequest(
  payload: unknown,
  catalog: MenuItem[],
):
  | {
      ok: true;
      data: {
        customerName: string;
        phone: string;
        fulfillment: FulfillmentMode;
        address: string;
        notes: string;
        items: ConfirmedOrderItem[];
        subtotalJod: number;
        deliveryFeeJod: number;
        totalJod: number;
      };
    }
  | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!payload || typeof payload !== 'object') {
    return { ok: false, errors: { form: 'Order payload must be a JSON object.' } };
  }

  const raw = payload as Record<string, unknown>;
  const customerName = typeof raw.customerName === 'string' ? raw.customerName.trim() : '';
  const phone = typeof raw.phone === 'string' ? raw.phone.trim() : '';
  const fulfillment = raw.fulfillment;
  const address = typeof raw.address === 'string' ? raw.address.trim() : '';
  const notes = typeof raw.notes === 'string' ? raw.notes.trim().slice(0, 280) : '';
  const itemsRaw = Array.isArray(raw.items) ? raw.items : [];

  if (customerName.length < 2 || customerName.length > 80) {
    errors.customerName = 'Please enter your name (at least 2 characters).';
  }

  const digitsOnly = phone.replace(/[^\d]/g, '');
  if (digitsOnly.length < 9 || digitsOnly.length > 15) {
    errors.phone = 'Enter a valid Jordanian phone number (e.g. 0790699111).';
  }

  const validModes: FulfillmentMode[] = ['pickup', 'delivery', 'dine_in'];
  if (typeof fulfillment !== 'string' || !validModes.includes(fulfillment as FulfillmentMode)) {
    errors.fulfillment = 'Select Pickup, Delivery, or Dine-In.';
  }

  if (fulfillment === 'delivery' && address.length < 6) {
    errors.address = 'Please enter your Amman delivery street / building address.';
  }

  if (itemsRaw.length === 0) {
    errors.items = 'Add at least one menu item before placing your order.';
  }

  const byId = new Map(catalog.map((item) => [item.id, item]));
  const normalizedItems: ConfirmedOrderItem[] = [];

  for (const entry of itemsRaw) {
    if (!entry || typeof entry !== 'object') {
      errors.items = 'Invalid menu item in order.';
      break;
    }
    const line = entry as Record<string, unknown>;
    const itemId = typeof line.itemId === 'string' ? line.itemId : '';
    const quantity = typeof line.quantity === 'number' ? line.quantity : Number.NaN;
    const product = byId.get(itemId);

    if (!product) {
      errors.items = `Unknown menu item: ${itemId || 'empty'}.`;
      break;
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 25) {
      errors.items = `Quantity for ${product.name} must be between 1 and 25.`;
      break;
    }

    const spiceRaw = line.spiceLevel;
    const spiceLevel =
      spiceRaw === 'spicy' || spiceRaw === 'extra_crazy' || spiceRaw === 'mild'
        ? spiceRaw
        : 'mild';
    const itemNotes = typeof line.notes === 'string' ? line.notes.trim().slice(0, 140) : '';

    normalizedItems.push({
      itemId: product.id,
      name: product.name,
      arabicName: product.arabicName,
      unitPriceJod: product.priceJod,
      quantity,
      lineTotalJod: roundJod(product.priceJod * quantity),
      spiceLevel,
      notes: itemNotes,
    });
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const mode = fulfillment as FulfillmentMode;
  const totals = calculateCartTotals(
    normalizedItems.map((i) => ({ itemId: i.itemId, quantity: i.quantity })),
    catalog,
    mode,
  );

  return {
    ok: true,
    data: {
      customerName,
      phone,
      fulfillment: mode,
      address: mode === 'delivery' ? address : 'Tabarbour Commercial Strip, Tariq District, Amman',
      notes,
      items: normalizedItems,
      subtotalJod: totals.subtotalJod,
      deliveryFeeJod: totals.deliveryFeeJod,
      totalJod: totals.totalJod,
    },
  };
}

export function validateReviewRequest(
  payload: unknown,
):
  | { ok: true; data: { author: string; role: string; rating: number; comment: string } }
  | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!payload || typeof payload !== 'object') {
    return { ok: false, errors: { form: 'Review payload must be an object.' } };
  }
  const raw = payload as Record<string, unknown>;
  const author = typeof raw.author === 'string' ? raw.author.trim() : '';
  const role =
    typeof raw.role === 'string' && raw.role.trim().length > 0
      ? raw.role.trim().slice(0, 40)
      : 'Tabarbour Visitor';
  const comment = typeof raw.comment === 'string' ? raw.comment.trim() : '';
  const rating = typeof raw.rating === 'number' ? raw.rating : Number(raw.rating);

  if (author.length < 2 || author.length > 50) {
    errors.author = 'Please enter your name (2–50 characters).';
  }
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    errors.rating = 'Rating must be between 1 and 5 stars.';
  }
  if (comment.length < 10 || comment.length > 350) {
    errors.comment = 'Please write at least 10 characters about your Hysteria order.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      author,
      role,
      rating: Math.round(rating * 2) / 2,
      comment,
    },
  };
}

/**
 * Computes Hysteria Tabarbour live open status in Amman local time (UTC+3).
 * Hours: Mon, Wed–Sun 11:00 AM – 4:00 AM; Tuesday 11:30 AM – 4:00 AM.
 */
export function getStoreOpenStatus(nowUtc: Date = new Date()): {
  isOpen: boolean;
  statusLabel: string;
  detailLabel: string;
} {
  const ammanMs = nowUtc.getTime() + 3 * 60 * 60 * 1000;
  const amman = new Date(ammanMs);
  const day = amman.getUTCDay(); // 0=Sun, 2=Tue
  const minutes = amman.getUTCHours() * 60 + amman.getUTCMinutes();

  // Open late night between 00:00 and 04:00
  if (minutes < 4 * 60) {
    return {
      isOpen: true,
      statusLabel: 'Open Now • Closes 4:00 AM',
      detailLabel: 'Late-night grill sizzling right now in Tabarbour',
    };
  }

  const openMinutes = day === 2 ? 11 * 60 + 30 : 11 * 60;
  if (minutes >= openMinutes) {
    return {
      isOpen: true,
      statusLabel: 'Open Now • Closes 4:00 AM',
      detailLabel: 'Walk-ins & delivery open until 4:00 AM',
    };
  }

  const opensAt = day === 2 ? '11:30 AM' : '11:00 AM';
  return {
    isOpen: false,
    statusLabel: `Opens Today at ${opensAt}`,
    detailLabel: `Pre-order for pickup or delivery — grill fires up at ${opensAt}`,
  };
}
