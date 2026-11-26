import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  INITIAL_REVIEWS,
  MENU_CATALOG,
  STORE_INFO,
  type MenuCategory,
  type MenuItem,
  type ReviewItem,
} from './shared/menuData.ts';
import {
  filterMenuItems,
  getStoreOpenStatus,
  type ConfirmedOrder,
} from './lib/orderLogic.ts';
import { fetchBootstrapData } from './lib/clientApi.ts';
import { HeaderNav } from './components/HeaderNav.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { OrderingHub } from './components/OrderingHub.tsx';
import { MenuSection } from './components/MenuSection.tsx';
import { AtmosphereSection } from './components/AtmosphereSection.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { LocationFooter } from './components/LocationFooter.tsx';
import { CartOrderDrawer, type ClientCartLine } from './components/CartOrderDrawer.tsx';

export default function App() {
  const [catalog, setCatalog] = useState<MenuItem[]>(MENU_CATALOG);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [liveStatusLabel, setLiveStatusLabel] = useState<string>(
    () => getStoreOpenStatus().statusLabel,
  );
  const [averageRating, setAverageRating] = useState<number>(STORE_INFO.rating);

  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [cart, setCart] = useState<ClientCartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [recentOrders, setRecentOrders] = useState<ConfirmedOrder[]>([]);
  const [activeOrder, setActiveOrder] = useState<ConfirmedOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const loadBootstrapData = useCallback(async () => {
    setMenuLoading(true);
    setMenuError(null);
    try {
      const data = await fetchBootstrapData();
      setCatalog(data.catalog);
      setReviews(data.reviews);
      setLiveStatusLabel(data.liveStatusLabel);
      setAverageRating(data.averageRating);
    } catch (err) {
      setMenuError(err instanceof Error ? err.message : 'Unable to load menu data.');
    } finally {
      setMenuLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBootstrapData();
  }, [loadBootstrapData]);

  const visibleMenuItems = useMemo(
    () => filterMenuItems(catalog, activeCategory, searchQuery, false),
    [catalog, activeCategory, searchQuery],
  );

  const counterAddons = useMemo(() => catalog.filter((item) => !item.isCore), [catalog]);

  const bestseller = useMemo(
    () => catalog.find((item) => item.id === 'michigan-mushroom-burger') ?? catalog[0],
    [catalog],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, line) => sum + line.quantity, 0),
    [cart],
  );

  const addLineToCart = useCallback(
    (
      item: MenuItem,
      spiceLevel: 'mild' | 'spicy' | 'extra_crazy' = 'mild',
      notes = '',
      qty = 1,
    ) => {
      const normalizedNotes = notes.trim();
      const lineKey = `${item.id}::${spiceLevel}::${normalizedNotes.toLowerCase()}`;
      setCart((prev) => {
        const existing = prev.find((l) => l.lineKey === lineKey);
        if (existing) {
          return prev.map((l) =>
            l.lineKey === lineKey ? { ...l, quantity: Math.min(25, l.quantity + qty) } : l,
          );
        }
        return [
          ...prev,
          {
            lineKey,
            itemId: item.id,
            quantity: qty,
            spiceLevel,
            notes: normalizedNotes,
          },
        ];
      });
      setActiveOrder(null);
      showToast(`Added ${qty}× ${item.name} to your bag`);
    },
    [showToast],
  );

  const handleUpdateQty = useCallback((lineKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((line) =>
          line.lineKey === lineKey
            ? { ...line, quantity: Math.min(25, line.quantity + delta) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const handleRemoveLine = useCallback((lineKey: string) => {
    setCart((prev) => prev.filter((line) => line.lineKey !== lineKey));
  }, []);

  const handleOrderConfirmed = useCallback(
    (order: ConfirmedOrder) => {
      setCart([]);
      setRecentOrders((prev) => [order, ...prev]);
      setActiveOrder(order);
      showToast(`Order ${order.orderId} sent to the Tabarbour grill!`);
    },
    [showToast],
  );

  const handleReviewSubmitted = useCallback(
    (review: ReviewItem) => {
      setReviews((prev) => [review, ...prev]);
      showToast('Thanks for reviewing Hysteria Tabarbour!');
    },
    [showToast],
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <HeaderNav
        cartCount={cartCount}
        liveStatusLabel={liveStatusLabel}
        averageRating={averageRating}
        hasActiveOrder={recentOrders.length > 0}
        onOpenCart={() => {
          setActiveOrder(null);
          setDrawerOpen(true);
        }}
        onOpenOrderTracker={() => {
          if (recentOrders[0]) {
            setActiveOrder(recentOrders[0]);
            setDrawerOpen(true);
          }
        }}
      />

      <main className="flex-1">
        <HeroSection
          bestseller={bestseller}
          averageRating={averageRating}
          onQuickAdd={(item) => addLineToCart(item)}
          onOpenCart={() => {
            setActiveOrder(null);
            setDrawerOpen(true);
          }}
        />

        <OrderingHub
          cartCount={cartCount}
          onOpenCart={() => {
            setActiveOrder(null);
            setDrawerOpen(true);
          }}
        />

        <MenuSection
          items={visibleMenuItems}
          counterAddons={counterAddons}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          loading={menuLoading}
          error={menuError}
          onSelectCategory={setActiveCategory}
          onSearchChange={setSearchQuery}
          onQuickAdd={(item) => addLineToCart(item)}
          onCustomize={(item) => setCustomizingItem(item)}
          onRetry={loadBootstrapData}
        />

        <AtmosphereSection />

        <ReviewsSection
          reviews={reviews}
          averageRating={averageRating}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </main>

      <LocationFooter
        cartCount={cartCount}
        onOpenCart={() => {
          setActiveOrder(null);
          setDrawerOpen(true);
        }}
        onSelectCategoryAll={() => setActiveCategory('all')}
      />

      <CartOrderDrawer
        isOpen={drawerOpen}
        cart={cart}
        catalog={catalog}
        counterAddons={counterAddons}
        recentOrders={recentOrders}
        activeOrder={activeOrder}
        customizingItem={customizingItem}
        onCloseDrawer={() => setDrawerOpen(false)}
        onCloseCustomizer={() => setCustomizingItem(null)}
        onConfirmCustomize={(item, spice, notes, qty) => {
          addLineToCart(item, spice, notes, qty);
          setCustomizingItem(null);
        }}
        onUpdateQty={handleUpdateQty}
        onRemoveLine={handleRemoveLine}
        onQuickAddAddon={(item) => addLineToCart(item)}
        onOrderConfirmed={handleOrderConfirmed}
        onSelectActiveOrder={setActiveOrder}
      />

      {/* DaisyUI Toast Feedback */}
      {toastMessage && (
        <div className="toast toast-end toast-bottom bottom-20 lg:bottom-6 z-[80]">
          <div className="alert bg-surface-container-highest border border-street-red/60 text-white shadow-2xl rounded-xl py-2.5 px-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-street-yellow text-[18px]">
              local_fire_department
            </span>
            <span className="font-montserrat font-bold text-xs">{toastMessage}</span>
            <button
              type="button"
              onClick={() => {
                setActiveOrder(null);
                setDrawerOpen(true);
              }}
              className="btn btn-xs bg-street-red border-none text-white font-montserrat font-bold ml-1"
            >
              View Bag
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
