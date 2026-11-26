import { useState, type FormEvent } from 'react';
import { STORE_INFO, type MenuItem } from '../shared/menuData.ts';
import {
  calculateCartTotals,
  formatJod,
  type ConfirmedOrder,
  type FulfillmentMode,
} from '../lib/orderLogic.ts';
import { submitOrder } from '../lib/clientApi.ts';
import { FoodImage } from './FoodImage.tsx';

export interface ClientCartLine {
  lineKey: string;
  itemId: string;
  quantity: number;
  spiceLevel: 'mild' | 'spicy' | 'extra_crazy';
  notes: string;
}

interface CartOrderDrawerProps {
  isOpen: boolean;
  cart: ClientCartLine[];
  catalog: MenuItem[];
  counterAddons: MenuItem[];
  recentOrders: ConfirmedOrder[];
  activeOrder: ConfirmedOrder | null;
  customizingItem: MenuItem | null;
  onCloseDrawer: () => void;
  onCloseCustomizer: () => void;
  onConfirmCustomize: (
    item: MenuItem,
    spiceLevel: 'mild' | 'spicy' | 'extra_crazy',
    notes: string,
    quantity: number,
  ) => void;
  onUpdateQty: (lineKey: string, delta: number) => void;
  onRemoveLine: (lineKey: string) => void;
  onQuickAddAddon: (item: MenuItem) => void;
  onOrderConfirmed: (order: ConfirmedOrder) => void;
  onSelectActiveOrder: (order: ConfirmedOrder | null) => void;
}

export function CartOrderDrawer({
  isOpen,
  cart,
  catalog,
  counterAddons,
  recentOrders,
  activeOrder,
  customizingItem,
  onCloseDrawer,
  onCloseCustomizer,
  onConfirmCustomize,
  onUpdateQty,
  onRemoveLine,
  onQuickAddAddon,
  onOrderConfirmed,
  onSelectActiveOrder,
}: CartOrderDrawerProps) {
  const [fulfillment, setFulfillment] = useState<FulfillmentMode>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Customizer modal state
  const [customSpice, setCustomSpice] = useState<'mild' | 'spicy' | 'extra_crazy'>('mild');
  const [customNotes, setCustomNotes] = useState('');
  const [customQty, setCustomQty] = useState(1);

  const byId = new Map(catalog.map((item) => [item.id, item]));
  const totals = calculateCartTotals(
    cart.map((c) => ({ itemId: c.itemId, quantity: c.quantity })),
    catalog,
    fulfillment,
  );

  async function handlePlaceOrder(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      const result = await submitOrder(
        {
          customerName,
          phone,
          fulfillment,
          address,
          notes: orderNotes,
          items: cart.map((line) => ({
            itemId: line.itemId,
            quantity: line.quantity,
            spiceLevel: line.spiceLevel,
            notes: line.notes,
          })),
        },
        catalog,
      );

      if (!result.ok) {
        setErrors(result.errors);
        return;
      }

      setCustomerName('');
      setPhone('');
      setAddress('');
      setOrderNotes('');
      onOrderConfirmed(result.order);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* ==================== ITEM CUSTOMIZER MODAL ==================== */}
      {customizingItem && (
        <div
          className="modal modal-open z-[60]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="customize-modal-title"
        >
          <div className="modal-box bg-surface-container border border-white/15 text-white max-w-md rounded-2xl p-0 overflow-hidden">
            <div className="relative h-44">
              <FoodImage
                src={customizingItem.imageUrl}
                alt={customizingItem.name}
                className="w-full h-full object-cover"
                fallbackTitle={customizingItem.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-black/40 to-transparent" />
              <button
                type="button"
                onClick={() => {
                  setCustomSpice('mild');
                  setCustomNotes('');
                  setCustomQty(1);
                  onCloseCustomizer();
                }}
                aria-label="Close customize modal"
                className="btn btn-sm btn-circle bg-black/70 hover:bg-black border-none text-white absolute top-3 right-3"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="font-arabic text-xs font-bold text-street-yellow">
                    {customizingItem.arabicName}
                  </span>
                  <h3
                    id="customize-modal-title"
                    className="font-montserrat font-black text-lg text-white leading-tight"
                  >
                    {customizingItem.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-street-red font-montserrat font-black text-xs text-white tabular-nums">
                  {formatJod(customizingItem.priceJod)}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {customizingItem.description}
              </p>

              {/* Spice Level Selector */}
              <div>
                <span className="block font-montserrat font-bold text-xs uppercase text-zinc-300 mb-2">
                  Spice &amp; Sauce Kick
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'mild', label: 'Classic Mild' },
                      { id: 'spicy', label: 'Tabarbour Spicy' },
                      { id: 'extra_crazy', label: 'Extra Crazy' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCustomSpice(opt.id)}
                      className={`btn btn-sm h-10 text-[11px] font-montserrat font-bold rounded-xl ${
                        customSpice === opt.id
                          ? 'bg-street-red text-white border-none'
                          : 'bg-surface-container-high text-zinc-300 border border-white/10 hover:border-street-red/60'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kitchen Note */}
              <div>
                <label
                  htmlFor="custom-item-notes"
                  className="block font-montserrat font-bold text-xs uppercase text-zinc-300 mb-1.5"
                >
                  Kitchen Instructions (Optional)
                </label>
                <input
                  id="custom-item-notes"
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="e.g. Extra crispy saj, no pickles, extra garlic..."
                  className="input input-bordered w-full bg-surface-container-low border-white/15 focus:border-street-red text-xs text-white"
                />
              </div>

              {/* Quantity & Confirm */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
                <div className="join border border-white/15 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    aria-label="Decrease custom item quantity"
                    onClick={() => setCustomQty((q) => Math.max(1, q - 1))}
                    className="btn btn-sm join-item bg-surface-container-high border-none text-white"
                  >
                    −
                  </button>
                  <span className="px-3 flex items-center justify-center bg-surface-container-low text-sm font-montserrat font-black text-white tabular-nums">
                    {customQty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase custom item quantity"
                    onClick={() => setCustomQty((q) => Math.min(20, q + 1))}
                    className="btn btn-sm join-item bg-surface-container-high border-none text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onConfirmCustomize(customizingItem, customSpice, customNotes, customQty);
                    setCustomSpice('mild');
                    setCustomNotes('');
                    setCustomQty(1);
                  }}
                  className="btn btn-sm flex-1 h-10 bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-black uppercase text-xs tabular-nums"
                >
                  Add to Bag • {formatJod(customizingItem.priceJod * customQty)}
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="modal-backdrop bg-black/75"
            aria-label="Dismiss customize modal"
            onClick={onCloseCustomizer}
          />
        </div>
      )}

      {/* ==================== ORDER BAG & LIVE TRACKER SLIDE-OVER DRAWER ==================== */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-drawer-title"
        >
          <button
            type="button"
            aria-label="Close order drawer backdrop"
            onClick={onCloseDrawer}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          <aside className="relative z-10 w-full max-w-md bg-surface-container-low border-l border-white/15 h-full flex flex-col shadow-2xl">
            {/* Drawer Header */}
            <div className="p-5 bg-surface-container border-b border-white/10 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-street-red text-xl">
                    shopping_bag
                  </span>
                  <h2
                    id="order-drawer-title"
                    className="font-montserrat font-black text-lg text-white uppercase tracking-tight"
                  >
                    {activeOrder ? `Order ${activeOrder.orderId}` : 'Your Hysteria Order'}
                  </h2>
                </div>
                <p className="text-[11px] text-on-surface-variant font-inter mt-0.5">
                  Tabarbour Kitchen • Direct Hono Ordering • Cash / Card / Tap
                </p>
              </div>
              <button
                type="button"
                onClick={onCloseDrawer}
                aria-label="Close order drawer"
                className="btn btn-sm btn-circle bg-surface-container-high border-none text-zinc-300 hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Mode Switcher when there are recent orders */}
            {recentOrders.length > 0 && (
              <div className="px-5 py-2.5 bg-surface-container-lowest border-b border-white/10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectActiveOrder(null)}
                  className={`btn btn-xs flex-1 rounded-lg font-montserrat font-bold ${
                    !activeOrder
                      ? 'bg-street-red text-white border-none'
                      : 'bg-surface-container text-zinc-300 border-white/10'
                  }`}
                >
                  Current Bag ({totals.itemCount})
                </button>
                <button
                  type="button"
                  onClick={() => onSelectActiveOrder(recentOrders[0])}
                  className={`btn btn-xs flex-1 rounded-lg font-montserrat font-bold ${
                    activeOrder
                      ? 'bg-emerald-600 text-white border-none'
                      : 'bg-surface-container text-emerald-300 border-white/10'
                  }`}
                >
                  Latest Receipt ({recentOrders[0].orderId})
                </button>
              </div>
            )}

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* CONFIRMED ORDER TRACKER VIEW */}
              {activeOrder ? (
                <div data-testid="order-receipt" className="space-y-5">
                  <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 text-center space-y-1">
                    <span className="material-symbols-outlined text-3xl text-emerald-400">
                      check_circle
                    </span>
                    <h3 className="font-montserrat font-black text-base text-white uppercase">
                      Order Confirmed — On The Grill!
                    </h3>
                    <p className="text-xs text-emerald-200">
                      Ticket <strong className="font-mono">{activeOrder.orderId}</strong> • Est.{' '}
                      {activeOrder.estimatedMinutes} mins (
                      {activeOrder.fulfillment === 'delivery'
                        ? 'Amman Delivery'
                        : activeOrder.fulfillment === 'pickup'
                          ? 'Tabarbour Pickup'
                          : 'Dine-In Table'}
                      )
                    </p>
                  </div>

                  {/* DaisyUI Steps Progress */}
                  <ul className="steps steps-horizontal w-full text-[11px] font-montserrat font-bold">
                    <li className="step step-primary text-white">Received</li>
                    <li className="step step-primary text-street-yellow">On the Grill</li>
                    <li className="step text-zinc-400">
                      {activeOrder.fulfillment === 'delivery' ? 'On the Way' : 'Ready'}
                    </li>
                  </ul>

                  {/* Customer Info */}
                  <div className="p-4 rounded-xl bg-surface-container border border-white/10 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Customer</span>
                      <span className="text-white font-bold">{activeOrder.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Phone</span>
                      <span className="text-white font-mono">{activeOrder.phone}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-on-surface-variant shrink-0">Location</span>
                      <span className="text-white text-right">{activeOrder.address}</span>
                    </div>
                    {activeOrder.notes && (
                      <div className="flex justify-between gap-4 pt-1 border-t border-white/10">
                        <span className="text-on-surface-variant shrink-0">Notes</span>
                        <span className="text-street-yellow text-right">{activeOrder.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Receipt Line Items */}
                  <div className="p-4 rounded-xl bg-surface-container border border-white/10 space-y-2.5 text-xs tabular-nums">
                    <h4 className="font-montserrat font-black uppercase text-street-yellow tracking-wider text-[11px]">
                      Itemized Receipt
                    </h4>
                    {activeOrder.items.map((item, idx) => (
                      <div
                        key={`${item.itemId}-${idx}`}
                        className="flex items-start justify-between gap-2 pb-2 border-b border-white/5 last:border-none last:pb-0"
                      >
                        <div>
                          <p className="font-montserrat font-bold text-white">
                            {item.quantity}× {item.name}
                          </p>
                          <p className="text-[11px] text-on-surface-variant">
                            {item.spiceLevel === 'extra_crazy'
                              ? 'Extra Crazy Spice'
                              : item.spiceLevel === 'spicy'
                                ? 'Tabarbour Spicy'
                                : 'Classic Mild'}
                            {item.notes ? ` · ${item.notes}` : ''}
                          </p>
                        </div>
                        <span className="font-montserrat font-bold text-white shrink-0">
                          {formatJod(item.lineTotalJod)}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-white/10 space-y-1">
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Subtotal</span>
                        <span>{formatJod(activeOrder.subtotalJod)}</span>
                      </div>
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Delivery Fee</span>
                        <span>
                          {activeOrder.deliveryFeeJod === 0
                            ? 'FREE'
                            : formatJod(activeOrder.deliveryFeeJod)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-montserrat font-black text-white pt-1">
                        <span>Total Due (Cash / Tap)</span>
                        <span className="text-street-yellow">{formatJod(activeOrder.totalJod)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectActiveOrder(null)}
                      className="btn btn-sm flex-1 h-10 bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-bold uppercase"
                    >
                      Start New Order
                    </button>
                    <a
                      href={STORE_INFO.phoneHref}
                      className="btn btn-sm h-10 bg-surface-container-high border-white/10 text-white font-montserrat font-bold"
                    >
                      Call Kitchen
                    </a>
                  </div>
                </div>
              ) : cart.length === 0 ? (
                /* EMPTY BAG STATE */
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-street-red/15 text-street-red flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">fastfood</span>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-black text-base text-white">
                      Your Street Bag is Empty
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1 max-w-xs mx-auto">
                      Tap &ldquo;Order Now&rdquo; on any Michigan Mushroom Burger, Super Saj
                      Shawarma, or Cheesy Calzone to fire up the grill.
                    </p>
                  </div>
                  <div className="pt-2 space-y-2 text-left">
                    <p className="font-montserrat font-bold text-[11px] uppercase tracking-wider text-street-yellow">
                      Quick Street Add-Ons:
                    </p>
                    <div className="space-y-2">
                      {catalog.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="p-2.5 rounded-xl bg-surface-container border border-white/10 flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <p className="font-montserrat font-bold text-xs text-white truncate">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-street-yellow font-bold tabular-nums">
                              {formatJod(item.priceJod)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onQuickAddAddon(item)}
                            className="btn btn-xs bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-bold"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* ACTIVE CART + CHECKOUT FORM */
                <>
                  {/* Line Items */}
                  <div className="space-y-3" data-testid="cart-items-list">
                    {cart.map((line) => {
                      const product = byId.get(line.itemId);
                      if (!product) return null;
                      return (
                        <div
                          key={line.lineKey}
                          className="p-3 rounded-xl bg-surface-container border border-white/10 flex items-center gap-3"
                        >
                          <FoodImage
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-14 h-14 rounded-lg object-cover shrink-0"
                            fallbackTitle={product.name}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-montserrat font-bold text-xs text-white leading-tight truncate">
                                {product.name}
                              </h3>
                              <button
                                type="button"
                                onClick={() => onRemoveLine(line.lineKey)}
                                aria-label={`Remove ${product.name}`}
                                className="text-zinc-500 hover:text-street-red shrink-0"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  delete
                                </span>
                              </button>
                            </div>
                            <p className="text-[11px] text-on-surface-variant truncate">
                              {line.spiceLevel === 'extra_crazy'
                                ? 'Extra Crazy Spice'
                                : line.spiceLevel === 'spicy'
                                  ? 'Tabarbour Spicy'
                                  : 'Classic Mild'}
                              {line.notes ? ` · ${line.notes}` : ''}
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="font-montserrat font-black text-xs text-street-yellow tabular-nums">
                                {formatJod(product.priceJod * line.quantity)}
                              </span>
                              <div className="join border border-white/15 rounded-lg overflow-hidden">
                                <button
                                  type="button"
                                  aria-label={`Decrease quantity of ${product.name}`}
                                  onClick={() => onUpdateQty(line.lineKey, -1)}
                                  className="btn btn-xs join-item bg-surface-container-high border-none text-white px-2"
                                >
                                  −
                                </button>
                                <span className="px-2.5 flex items-center text-xs font-montserrat font-bold text-white bg-surface-container-lowest tabular-nums">
                                  {line.quantity}
                                </span>
                                <button
                                  type="button"
                                  aria-label={`Increase quantity of ${product.name}`}
                                  onClick={() => onUpdateQty(line.lineKey, 1)}
                                  className="btn btn-xs join-item bg-surface-container-high border-none text-white px-2"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Counter Add-ons Upsell Strip */}
                  <div className="p-3 rounded-xl bg-surface-container-lowest border border-white/10 space-y-2">
                    <span className="block font-montserrat font-bold text-[10px] uppercase tracking-wider text-street-yellow">
                      Complete Your Feast
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {counterAddons.map((addon) => (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => onQuickAddAddon(addon)}
                          className="btn btn-xs bg-surface-container-high hover:bg-street-red border border-white/10 text-white font-montserrat font-bold text-[10px] tabular-nums"
                        >
                          + {addon.name.replace(' Ice Cold Can', '').replace(' Dip', '')} (
                          {formatJod(addon.priceJod)})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fulfillment Mode Selector */}
                  <form id="hysteria-checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                    <div>
                      <span className="block font-montserrat font-bold text-xs uppercase text-zinc-300 mb-2">
                        How do you want it?
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {(
                          [
                            { id: 'pickup', label: 'Pickup', sub: '12 min · Free' },
                            { id: 'delivery', label: 'Delivery', sub: '30 min · 1 JOD' },
                            { id: 'dine_in', label: 'Dine-In', sub: '10 min · Free' },
                          ] as const
                        ).map((mode) => (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setFulfillment(mode.id)}
                            className={`p-2.5 rounded-xl border text-center transition-colors ${
                              fulfillment === mode.id
                                ? 'bg-street-red/20 border-street-red text-white'
                                : 'bg-surface-container border-white/10 text-zinc-300 hover:border-white/25'
                            }`}
                          >
                            <span className="block font-montserrat font-black text-xs">
                              {mode.label}
                            </span>
                            <span className="block text-[10px] text-on-surface-variant">
                              {mode.sub}
                            </span>
                          </button>
                        ))}
                      </div>
                      {fulfillment === 'delivery' && totals.amountToFreeDeliveryJod > 0 && (
                        <p className="text-[11px] text-street-yellow mt-1.5 tabular-nums">
                          Add {formatJod(totals.amountToFreeDeliveryJod)} more for FREE Amman
                          delivery!
                        </p>
                      )}
                    </div>

                    {errors.form && (
                      <div
                        role="alert"
                        className="alert bg-street-red/20 border border-street-red text-xs text-white py-2"
                      >
                        <span>{errors.form}</span>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor="order-customer-name"
                          className="block font-montserrat font-bold text-[11px] uppercase text-on-surface-variant mb-1"
                        >
                          Full Name *
                        </label>
                        <input
                          id="order-customer-name"
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Tariq Al-Masri"
                          className="input input-sm h-10 input-bordered w-full bg-surface-container border-white/15 focus:border-street-red text-xs text-white"
                        />
                        {errors.customerName && (
                          <p className="text-[11px] text-primary-soft mt-1">
                            {errors.customerName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="order-phone"
                          className="block font-montserrat font-bold text-[11px] uppercase text-on-surface-variant mb-1"
                        >
                          Jordan Mobile Number *
                        </label>
                        <input
                          id="order-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0790 699 111"
                          className="input input-sm h-10 input-bordered w-full bg-surface-container border-white/15 focus:border-street-red text-xs text-white"
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-primary-soft mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {fulfillment === 'delivery' && (
                        <div>
                          <label
                            htmlFor="order-address"
                            className="block font-montserrat font-bold text-[11px] uppercase text-on-surface-variant mb-1"
                          >
                            Amman Delivery Address *
                          </label>
                          <input
                            id="order-address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Tabarbour, Tariq Street, Building & Apt..."
                            className="input input-sm h-10 input-bordered w-full bg-surface-container border-white/15 focus:border-street-red text-xs text-white"
                          />
                          {errors.address && (
                            <p className="text-[11px] text-primary-soft mt-1">{errors.address}</p>
                          )}
                        </div>
                      )}

                      <div>
                        <label
                          htmlFor="order-notes"
                          className="block font-montserrat font-bold text-[11px] uppercase text-on-surface-variant mb-1"
                        >
                          Extra Order Note (Optional)
                        </label>
                        <input
                          id="order-notes"
                          type="text"
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          placeholder="Curbside car color, extra napkins, cutlery..."
                          className="input input-sm h-10 input-bordered w-full bg-surface-container border-white/15 focus:border-street-red text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Totals Summary */}
                    <div className="p-4 rounded-xl bg-surface-container border border-white/10 space-y-1.5 text-xs tabular-nums">
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Subtotal ({totals.itemCount} items)</span>
                        <span data-testid="cart-subtotal">{formatJod(totals.subtotalJod)}</span>
                      </div>
                      <div className="flex justify-between text-on-surface-variant">
                        <span>
                          {fulfillment === 'delivery' ? 'Amman Delivery Fee' : 'Pickup / Dine-In'}
                        </span>
                        <span>
                          {totals.deliveryFeeJod === 0 ? 'FREE' : formatJod(totals.deliveryFeeJod)}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-montserrat font-black text-white pt-2 border-t border-white/10">
                        <span>Total</span>
                        <span data-testid="cart-total" className="text-street-yellow">
                          {formatJod(totals.totalJod)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn w-full h-12 rounded-xl bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(217,4,41,0.45)] tabular-nums"
                    >
                      {submitting
                        ? 'Sending to Tabarbour Grill...'
                        : `Place Order • ${formatJod(totals.totalJod)}`}
                    </button>
                  </form>
                </>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
