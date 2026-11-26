import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getRequestListener } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import {
  ATMOSPHERE_CARDS,
  INITIAL_REVIEWS,
  MENU_CATALOG,
  STORE_INFO,
  type MenuCategory,
  type ReviewItem,
} from './src/shared/menuData.ts';
import {
  filterMenuItems,
  getStoreOpenStatus,
  validateOrderRequest,
  validateReviewRequest,
  type ConfirmedOrder,
} from './src/lib/orderLogic.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApiApp() {
  const api = new Hono();
  const reviews: ReviewItem[] = [...INITIAL_REVIEWS];
  const orders = new Map<string, ConfirmedOrder>();
  let orderSequence = 1041;

  api.get('/api/health', (c) => {
    return c.json({ ok: true, framework: 'hono', service: 'hysteria-tabarbour' });
  });

  api.get('/api/store-info', (c) => {
    const liveStatus = getStoreOpenStatus(new Date());

    return c.json({
      ...STORE_INFO,
      liveStatus,
      reviewCount: reviews.length,
      averageRating: STORE_INFO.rating,
      atmosphere: ATMOSPHERE_CARDS,
    });
  });

  api.get('/api/menu', (c) => {
    const rawCat = c.req.query('category') ?? 'all';
    const validCategories: MenuCategory[] = [
      'all',
      'shawarma',
      'burgers',
      'calzones',
      'sides',
      'drinks',
    ];
    const category: MenuCategory = validCategories.includes(rawCat as MenuCategory)
      ? (rawCat as MenuCategory)
      : 'all';
    const q = c.req.query('q') ?? '';
    const includeAddons = c.req.query('includeAddons') === 'true';

    const items = filterMenuItems(MENU_CATALOG, category, q, includeAddons);
    const counterAddons = MENU_CATALOG.filter((item) => !item.isCore);

    return c.json({
      category,
      total: items.length,
      items,
      counterAddons,
      allItems: MENU_CATALOG,
    });
  });

  api.get('/api/reviews', (c) => {
    return c.json({
      reviews,
      rating: STORE_INFO.rating,
      total: reviews.length,
    });
  });

  api.post('/api/reviews', async (c) => {
    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: 'Invalid JSON request body.' }, 400);
    }

    const validated = validateReviewRequest(body);
    if (!validated.ok) {
      return c.json({ error: 'Validation failed.', errors: validated.errors }, 400);
    }

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      author: validated.data.author,
      role: validated.data.role,
      rating: validated.data.rating,
      comment: validated.data.comment,
      createdAt: new Date().toISOString(),
    };

    reviews.unshift(newReview);
    return c.json({ review: newReview, total: reviews.length }, 201);
  });

  api.get('/api/orders', (c) => {
    const recent = Array.from(orders.values()).reverse().slice(0, 20);
    return c.json({ orders: recent });
  });

  api.get('/api/orders/:id', (c) => {
    const id = c.req.param('id').trim().toUpperCase();
    const order = orders.get(id);
    if (!order) {
      return c.json({ error: 'Order not found.' }, 404);
    }
    return c.json({ order });
  });

  api.post('/api/orders', async (c) => {
    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: 'Invalid JSON request body.' }, 400);
    }

    const validated = validateOrderRequest(body, MENU_CATALOG);
    if (!validated.ok) {
      return c.json({ error: 'Please fix the highlighted order fields.', errors: validated.errors }, 400);
    }

    orderSequence += 1;
    const orderId = `HYS-${orderSequence}`;
    const estimatedMinutes =
      validated.data.fulfillment === 'delivery'
        ? 30
        : validated.data.fulfillment === 'pickup'
          ? 12
          : 10;

    const confirmed: ConfirmedOrder = {
      orderId,
      status: 'grilling',
      estimatedMinutes,
      customerName: validated.data.customerName,
      phone: validated.data.phone,
      fulfillment: validated.data.fulfillment,
      address: validated.data.address,
      notes: validated.data.notes,
      items: validated.data.items,
      subtotalJod: validated.data.subtotalJod,
      deliveryFeeJod: validated.data.deliveryFeeJod,
      totalJod: validated.data.totalJod,
      createdAt: new Date().toISOString(),
    };

    orders.set(orderId, confirmed);
    return c.json({ order: confirmed }, 201);
  });

  return api;
}

async function startServer() {
  const port = Number(process.env.PORT ?? 3000);
  const isProd = process.env.NODE_ENV === 'production';
  const app = createApiApp();

  if (isProd) {
    app.use('/*', serveStatic({ root: './dist' }));
    app.get('*', (c) => {
      const indexPath = path.resolve(__dirname, 'dist', 'index.html');
      if (fs.existsSync(indexPath)) {
        return c.html(fs.readFileSync(indexPath, 'utf-8'));
      }
      return c.text('Production build not found. Run npm run build first.', 404);
    });

    const listener = getRequestListener(app.fetch);
    const server = http.createServer(listener);
    server.listen(port, '0.0.0.0', () => {
      console.log(`Hysteria Hono server listening on http://0.0.0.0:${port}`);
    });
    return;
  }

  // Development mode: Hono handles all /api/* routes, Vite handles SPA/assets
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  const apiListener = getRequestListener(app.fetch);
  const server = http.createServer((req, res) => {
    const url = req.url ?? '/';
    if (url === '/api' || url.startsWith('/api/')) {
      void apiListener(req, res);
      return;
    }
    vite.middlewares(req, res, () => {
      res.statusCode = 404;
      res.end('Not Found');
    });
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`Hysteria Hono + Vite dev server listening on http://0.0.0.0:${port}`);
  });
}

const isEntryPoint =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (isEntryPoint) {
  void startServer();
}
