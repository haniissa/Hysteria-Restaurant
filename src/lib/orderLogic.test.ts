import test from 'node:test';
import assert from 'node:assert/strict';
import { MENU_CATALOG } from '../shared/menuData.ts';
import {
  calculateCartTotals,
  filterMenuItems,
  formatJod,
  getStoreOpenStatus,
  validateOrderRequest,
  validateReviewRequest,
} from './orderLogic.ts';

test('formatJod formats Jordanian dinars to 2 decimal places', () => {
  assert.equal(formatJod(3.5), '3.50 JOD');
  assert.equal(formatJod(0.35), '0.35 JOD');
  assert.equal(formatJod(10), '10.00 JOD');
});

test('filterMenuItems returns 6 core items for all and filters by category & query', () => {
  const allCore = filterMenuItems(MENU_CATALOG, 'all');
  assert.equal(allCore.length, 6);

  const burgers = filterMenuItems(MENU_CATALOG, 'burgers');
  assert.equal(burgers.length, 2);
  assert.ok(burgers.every((item) => item.category === 'burgers'));

  const shawarma = filterMenuItems(MENU_CATALOG, 'shawarma');
  assert.equal(shawarma.length, 3);

  const calzones = filterMenuItems(MENU_CATALOG, 'calzones');
  assert.equal(calzones.length, 1);

  const sides = filterMenuItems(MENU_CATALOG, 'sides');
  assert.equal(sides.length, 2);

  const searchArabic = filterMenuItems(MENU_CATALOG, 'all', 'ماشروم');
  assert.equal(searchArabic.length, 1);
  assert.equal(searchArabic[0].id, 'michigan-mushroom-burger');
});

test('calculateCartTotals computes pickup free and delivery fee with 10 JOD free threshold', () => {
  const pickupTotals = calculateCartTotals(
    [
      { itemId: 'michigan-mushroom-burger', quantity: 1 },
      { itemId: 'extra-garlic-toum', quantity: 1 },
    ],
    MENU_CATALOG,
    'pickup',
  );
  assert.equal(pickupTotals.subtotalJod, 3.85);
  assert.equal(pickupTotals.deliveryFeeJod, 0);
  assert.equal(pickupTotals.totalJod, 3.85);
  assert.equal(pickupTotals.itemCount, 2);

  const smallDelivery = calculateCartTotals(
    [{ itemId: 'super-saj-shawarma-platter', quantity: 2 }],
    MENU_CATALOG,
    'delivery',
  );
  assert.equal(smallDelivery.subtotalJod, 6.0);
  assert.equal(smallDelivery.deliveryFeeJod, 1.0);
  assert.equal(smallDelivery.totalJod, 7.0);
  assert.equal(smallDelivery.amountToFreeDeliveryJod, 4.0);

  const freeDelivery = calculateCartTotals(
    [{ itemId: 'mini-saj-party-platter', quantity: 3 }],
    MENU_CATALOG,
    'delivery',
  );
  assert.equal(freeDelivery.subtotalJod, 13.5);
  assert.equal(freeDelivery.deliveryFeeJod, 0);
  assert.equal(freeDelivery.totalJod, 13.5);
  assert.equal(freeDelivery.amountToFreeDeliveryJod, 0);
});

test('validateOrderRequest enforces required fields and computes authoritative server prices', () => {
  const invalidEmpty = validateOrderRequest(
    { customerName: '', phone: '123', fulfillment: 'delivery', address: '', items: [] },
    MENU_CATALOG,
  );
  assert.equal(invalidEmpty.ok, false);
  if (!invalidEmpty.ok) {
    assert.ok(invalidEmpty.errors.customerName);
    assert.ok(invalidEmpty.errors.phone);
    assert.ok(invalidEmpty.errors.address);
    assert.ok(invalidEmpty.errors.items);
  }

  const validPickup = validateOrderRequest(
    {
      customerName: 'Tariq Al-Masri',
      phone: '0790699111',
      fulfillment: 'pickup',
      items: [
        { itemId: 'michigan-mushroom-burger', quantity: 2, spiceLevel: 'spicy' },
        { itemId: 'sinalco-ice-cold-can', quantity: 1 },
      ],
    },
    MENU_CATALOG,
  );
  assert.equal(validPickup.ok, true);
  if (validPickup.ok) {
    assert.equal(validPickup.data.subtotalJod, 7.5);
    assert.equal(validPickup.data.deliveryFeeJod, 0);
    assert.equal(validPickup.data.totalJod, 7.5);
    assert.equal(validPickup.data.items[0].spiceLevel, 'spicy');
  }
});

test('validateReviewRequest validates author, rating range, and comment length', () => {
  const bad = validateReviewRequest({ author: 'A', rating: 9, comment: 'short' });
  assert.equal(bad.ok, false);

  const good = validateReviewRequest({
    author: 'Lina H.',
    role: 'Amman Foodie',
    rating: 5,
    comment: 'Best late-night saj shawarma in Tabarbour, super crispy bread!',
  });
  assert.equal(good.ok, true);
  if (good.ok) {
    assert.equal(good.data.rating, 5);
    assert.equal(good.data.author, 'Lina H.');
  }
});

test('getStoreOpenStatus respects Amman UTC+3 late-night schedule until 4:00 AM', () => {
  // 02:30 Amman time (23:30 UTC previous day) -> Open
  const lateNight = getStoreOpenStatus(new Date('2026-05-10T23:30:00.000Z'));
  assert.equal(lateNight.isOpen, true);

  // 07:00 Amman time (04:00 UTC) -> Closed, opens at 11:00 AM (Monday)
  const earlyMorning = getStoreOpenStatus(new Date('2026-05-11T04:00:00.000Z'));
  assert.equal(earlyMorning.isOpen, false);
  assert.match(earlyMorning.statusLabel, /11:00 AM/);

  // Tuesday 11:15 Amman time (08:15 UTC) -> Closed, opens at 11:30 AM
  const tuesdayEarly = getStoreOpenStatus(new Date('2026-05-12T08:15:00.000Z'));
  assert.equal(tuesdayEarly.isOpen, false);
  assert.match(tuesdayEarly.statusLabel, /11:30 AM/);
});
