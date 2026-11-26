import { STORE_INFO } from '../shared/menuData.ts';

interface HeaderNavProps {
  cartCount: number;
  liveStatusLabel: string;
  averageRating: number;
  hasActiveOrder: boolean;
  onOpenCart: () => void;
  onOpenOrderTracker: () => void;
}

export function HeaderNav({
  cartCount,
  liveStatusLabel,
  averageRating,
  hasActiveOrder,
  onOpenCart,
  onOpenOrderTracker,
}: HeaderNavProps) {
  return (
    <>
      {/* DESKTOP TOP TICKER BAR (lg+) */}
      <div className="hidden lg:block bg-street-red text-white py-2 px-4 text-[11px] font-montserrat font-extrabold uppercase tracking-wider border-b border-white/10 z-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 bg-black/30 px-2.5 py-0.5 rounded-full text-[11px] whitespace-nowrap shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
            OPEN TONIGHT UNTIL 4:00 AM
          </span>
          <span className="font-bold whitespace-nowrap shrink-0">
            TABARBOUR&apos;S CRAZY TASTE JOINT
          </span>
          <span className="text-white/70 shrink-0" aria-hidden="true">•</span>
          <span className="font-semibold whitespace-nowrap truncate">
            NO RESERVATIONS NEEDED — FIRST-COME FIRST-SERVED!
          </span>
          <span className="hidden xl:inline text-white/70 shrink-0" aria-hidden="true">•</span>
          <span className="hidden xl:inline text-yellow-300 font-bold whitespace-nowrap shrink-0">
            SHAWARMA • SAJ • SMASH BURGERS • 1 - 5 JOD
          </span>
        </div>
      </div>

      {/* DESKTOP STICKY DAISYUI NAVBAR (lg+) */}
      <header className="hidden lg:block sticky top-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-surface-container-highest">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="navbar px-0 h-20 min-h-20 justify-between gap-3">
            {/* Brand Logo */}
            <a
              href="#top"
              className="flex items-center gap-2.5 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-street-yellow rounded-xl"
            >
              <div className="w-10 h-10 rounded-full bg-street-red flex items-center justify-center font-montserrat font-black text-white text-xl shadow-[0_0_15px_rgba(217,4,41,0.6)] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">local_fire_department</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-montserrat font-black text-xl tracking-tighter text-white whitespace-nowrap">
                    {STORE_INFO.brandName}
                  </span>
                  <span className="font-arabic font-black text-lg text-street-red whitespace-nowrap">
                    {STORE_INFO.arabicBrandName}
                  </span>
                </div>
                <span className="font-montserrat text-[9px] uppercase font-bold tracking-[0.16em] text-street-yellow whitespace-nowrap">
                  {STORE_INFO.tagline}
                </span>
              </div>
            </a>

            {/* Navigation Links */}
            <nav
              aria-label="Primary navigation"
              className="flex items-center gap-4 font-montserrat text-[11px] uppercase font-extrabold tracking-wide text-on-surface-variant"
            >
              <a
                href="#menu-showcase"
                className="hover:text-street-yellow transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                <span className="material-symbols-outlined text-[15px] text-street-red">
                  restaurant_menu
                </span>
                Street Menu
              </a>
              <a
                href="#ordering-hub"
                className="hover:text-street-yellow transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                <span className="material-symbols-outlined text-[15px] text-street-orange">
                  delivery_dining
                </span>
                Order Online
              </a>
              <a
                href="#vibes-gallery"
                className="hover:text-street-yellow transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                <span className="material-symbols-outlined text-[15px] text-street-yellow">
                  storefront
                </span>
                The Tabarbour Spot
              </a>
              <a
                href="#location-info"
                className="hover:text-street-yellow transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                <span className="material-symbols-outlined text-[15px] text-street-red">
                  location_on
                </span>
                Hours &amp; Location
              </a>
            </nav>

            {/* Instant CTAs */}
            <div className="flex items-center gap-2.5 shrink-0">
              {hasActiveOrder && (
                <button
                  type="button"
                  onClick={onOpenOrderTracker}
                  className="btn btn-sm h-10 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-montserrat text-xs font-extrabold uppercase tracking-wider whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                  Track
                </button>
              )}
              <a
                href={STORE_INFO.phoneHref}
                className="btn btn-sm h-10 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-white font-montserrat text-xs font-bold border border-white/10 whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[16px] text-emerald-400">call</span>
                <span>{STORE_INFO.phoneDisplay}</span>
              </a>
              <button
                type="button"
                onClick={onOpenCart}
                aria-label={`Open order bag, ${cartCount} items`}
                className="btn btn-primary btn-sm h-10 px-4 rounded-lg bg-street-red hover:bg-red-700 border-none text-white font-montserrat text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(217,4,41,0.4)] whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Order Now</span>
                {cartCount > 0 && (
                  <span
                    data-testid="desktop-cart-count"
                    className="badge badge-sm bg-street-yellow text-black border-none font-black tabular-nums ml-1"
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE STICKY HEADER (< lg) — Faithfully matches Mobile Stitch Design */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-50 bg-[#131315]/95 backdrop-blur-xl pt-safe border-b border-surface-container-highest/60 shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
        <div className="h-[68px] px-4 flex items-center justify-between gap-2">
          <a href="#top" className="flex items-center gap-2.5 min-w-0">
            {/* Hysteria Red Circular Logo Badge with 3 bars */}
            <div className="relative w-10 h-10 rounded-full bg-street-red flex flex-col items-center justify-center gap-[3px] shadow-[0_0_14px_rgba(217,4,41,0.6)] shrink-0">
              <span className="w-4 h-[2.5px] bg-white rounded-full" />
              <span className="w-4 h-[2.5px] bg-white rounded-full" />
              <span className="w-4 h-[2.5px] bg-white rounded-full" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-montserrat font-black text-lg tracking-tight text-white uppercase whitespace-nowrap">
                  {STORE_INFO.brandName}
                </span>
                <span className="text-[9px] font-montserrat font-bold px-1.5 py-0.5 rounded bg-street-red text-white tracking-wide uppercase whitespace-nowrap">
                  CRAZY TASTE
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-on-surface-variant font-medium truncate">
                <span className="text-secondary-soft font-arabic font-bold">
                  {STORE_INFO.arabicBrandName}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="flex items-center text-zinc-300 truncate">
                  <span className="material-symbols-outlined text-[13px] text-street-red mr-0.5">
                    location_on
                  </span>
                  Tabarbour, Amman
                </span>
              </div>
            </div>
          </a>

          {/* WhatsApp & Direct Call CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              aria-label="Direct Call Hysteria Tabarbour"
              href={STORE_INFO.phoneHref}
              className="btn btn-circle btn-sm w-10 h-10 min-h-10 bg-surface-container-high border border-outline-variant/60 text-secondary-soft hover:bg-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[19px]">call</span>
            </a>
            <a
              aria-label="WhatsApp Order Hysteria"
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm w-10 h-10 min-h-10 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </a>
          </div>
        </div>

        {/* Live Status & Rating Sub-bar */}
        <div className="bg-surface-container-lowest px-4 py-1.5 flex items-center justify-between text-[11px] font-montserrat font-semibold border-t border-surface-container-highest/40">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span>{liveStatusLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300 tabular-nums">
            <span className="flex items-center text-street-yellow font-bold">
              <span className="material-symbols-outlined material-fill text-[13px] mr-0.5">
                star
              </span>
              {averageRating.toFixed(1)}
            </span>
            <span className="text-zinc-500">|</span>
            <span className="text-primary-soft font-bold">1 – 5 JOD</span>
          </div>
        </div>
      </header>
    </>
  );
}
