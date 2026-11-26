import test from 'node:test';
import assert from 'node:assert/strict';
import { createApiApp } from './server.ts';

test('Hono GET /api/menu returns filtered catalog and counter addons', async () => {
  const app = createApiApp();

  const resAll = await app.request('/api/menu');
  assert.equal(resAll.status, 200);
  const bodyAll = (await resAll.json()) as { total: number; counterAddons: unknown[] };
  assert.equal(bodyAll.total, 6);
  assert.equal(bodyAll.counterAddons.length, 3);

  const resBurgers = await app.request('/api/menu?category=burgers');
  assert.equal(resBurgers.status, 200);
  const bodyBurgers = (await resBurgers.json()) as { total: number };
  assert.equal(bodyBurgers.total, 2);
});

test('Hono POST /api/orders validates input, calculates authoritative totals, and retrieves order by ID', async () => {
  const app = createApiApp();

  const badRes = await app.request('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerName: '', phone: '', fulfillment: 'pickup', items: [] }),
  });
  assert.equal(badRes.status, 400);

  const goodRes = await app.request('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Omar Haddad',
      phone: '0790699111',
      fulfillment: 'delivery',
      address: 'Tariq Street, Building 14, Tabarbour',
      items: [
        { itemId: 'michigan-mushroom-burger', quantity: 1, spiceLevel: 'spicy' },
        { itemId: 'super-saj-shawarma-platter', quantity: 1 },
      ],
    }),
  });
  assert.equal(goodRes.status, 201);
  const created = (await goodRes.json()) as {
    order: { orderId: string; subtotalJod: number; deliveryFeeJod: number; totalJod: number };
  };
  assert.match(created.order.orderId, /^HYS-\d+$/);
  assert.equal(created.order.subtotalJod, 6.5);
  assert.equal(created.order.deliveryFeeJod, 1.0);
  assert.equal(created.order.totalJod, 7.5);

  const fetchRes = await app.request(`/api/orders/${created.order.orderId}`);
  assert.equal(fetchRes.status, 200);
});

test('Hono POST /api/reviews persists valid customer reviews', async () => {
  const app = createApiApp();

  const res = await app.request('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      author: 'Zaid A.',
      role: 'Night Owl',
      rating: 5,
      comment: 'Double smashed burger at 2 AM hits different every single time!',
    }),
  });
  assert.equal(res.status, 201);

  const listRes = await app.request('/api/reviews');
  const listBody = (await listRes.json()) as { reviews: { author: string }[] };
  assert.equal(listBody.reviews[0].author, 'Zaid A.');
});
