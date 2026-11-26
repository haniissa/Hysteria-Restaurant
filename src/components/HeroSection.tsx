import { STORE_INFO, type MenuItem } from '../shared/menuData.ts';
import { formatJod } from '../lib/orderLogic.ts';
import { FoodImage } from './FoodImage.tsx';

interface HeroSectionProps {
  bestseller?: MenuItem;
  averageRating: number;
  onQuickAdd: (item: MenuItem) => void;
  onOpenCart: () => void;
}

export function HeroSection({
  bestseller,
  averageRating,
  onQuickAdd,
  onOpenCart,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative bg-surface-container-lowest pt-28 pb-6 lg:pt-10 lg:pb-20 border-b border-surface-container-highest overflow-hidden"
    >
      {/* Ambient Street Glows (Desktop) */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-0 right-1/4 w-[500px] h-[500px] bg-street-red/15 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="hidden lg:block absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-street-orange/10 rounded-full blur-[140px] pointer-events-none"
      />

      {/* ==================== DESKTOP HERO (lg+) ==================== */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-montserrat">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-street-red/20 text-street-red border border-street-red/30 font-black uppercase tracking-wide">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
            Craziest Taste in Amman
          </span>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-white/10 text-white font-bold tabular-nums">
            <span className="flex items-center text-street-yellow">
              <span className="material-symbols-outlined material-fill text-[16px]">star</span>
              <span className="ml-1 text-white font-black">{averageRating.toFixed(1)}</span>
            </span>
            <span className="text-white/40">|</span>
            <span className="text-on-surface-variant font-medium">
              Shawarma &amp; Saj in Tabarbour
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
            Open Daily til 4:00 AM
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high text-street-yellow font-black tabular-nums">
            1 - 5 JOD
          </span>
        </div>

        {/* Hero 12-Column Split Grid */}
        <div className="grid grid-cols-12 gap-12 items-center">
          {/* Left: Big Street Copy */}
          <div className="col-span-6 flex flex-col gap-5">
            <div className="flex flex-col">
              <span className="font-arabic text-4xl text-street-yellow font-black">
                {STORE_INFO.arabicHeadline}
              </span>
              <h1 className="font-montserrat text-5xl xl:text-6xl font-black text-white uppercase tracking-tight leading-[1.03] mt-2 text-balance">
                SUPER SAJ, SMASH BURGERS &amp;{' '}
                <span className="text-street-red neon-text-red">LATE-NIGHT CRAVINGS</span>
              </h1>
            </div>

            <p className="text-on-surface-variant font-inter text-base lg:text-lg leading-relaxed">
              Welcome to the real <strong className="text-white">Hysteria (Crazy Taste)</strong> in
              Tabarbour. From loaded Michigan mushroom smashed patties to golden garlic chicken saj
              platters and cheesy calzone pulls — straight off the grill until 4:00 AM every night.
              No reservations. High energy. Pure Amman street culture.
            </p>

            {/* Action Links */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={STORE_INFO.talabatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn h-12 px-5 rounded-xl bg-street-orange hover:bg-orange-600 border-none text-white font-montserrat font-extrabold text-sm uppercase tracking-wide shadow-lg shadow-street-orange/20 hover:scale-[1.02] transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
                <span>Order on Talabat</span>
              </a>
              <a
                href={STORE_INFO.careemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn h-12 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 border-none text-white font-montserrat font-extrabold text-sm uppercase tracking-wide shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">moped</span>
                <span>Order on Careem</span>
              </a>
              <a
                href={STORE_INFO.phoneHref}
                className="btn h-12 px-5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-white font-montserrat font-bold text-sm border border-white/10"
              >
                <span className="material-symbols-outlined text-street-red text-[20px]">call</span>
                <span>Call: {STORE_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* DaisyUI Stats Quick-Facts Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-surface-container-highest mt-1 text-center">
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-white/5">
                <span className="block font-montserrat font-black text-xl text-street-red tabular-nums">
                  11 AM - 4 AM
                </span>
                <span className="text-[11px] font-montserrat uppercase font-semibold text-on-surface-variant">
                  Non-Stop Late Night
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-white/5">
                <span className="block font-montserrat font-black text-xl text-street-yellow">
                  Walk-in
                </span>
                <span className="text-[11px] font-montserrat uppercase font-semibold text-on-surface-variant">
                  No Booking Needed
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-white/5">
                <span className="block font-montserrat font-black text-xl text-white">
                  Tabarbour
                </span>
                <span className="text-[11px] font-montserrat uppercase font-semibold text-on-surface-variant">
                  Tariq • Amman
                </span>
              </div>
            </div>
          </div>

          {/* Right: Visual Montage Featuring Real Restaurant Front & Smashed Burger */}
          <div className="col-span-6 grid grid-cols-2 gap-4 relative">
            {/* Real Storefront Photo */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-surface-container-highest shadow-2xl group h-96">
              <FoodImage
                src={STORE_INFO.images.storefront}
                alt="Hysteria Restaurant Front with Neon Sign and Arabic Graffiti in Tabarbour Amman"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                fallbackTitle="HYSTERIA TABARBOUR"
                fallbackSubtitle="Neon Sign & Graffiti Front"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-low/90 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-montserrat font-black uppercase text-street-yellow flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">pin_drop</span>
                  Real Tabarbour Front
                </span>
                <p className="font-montserrat font-extrabold text-xs text-white">
                  The Famous Graffiti &amp; Neon Sign
                </p>
              </div>
            </div>

            {/* Signature Michigan Mushroom Burger */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-street-red shadow-2xl group h-96 flex flex-col justify-end">
              <FoodImage
                src={STORE_INFO.images.michiganBurger}
                alt="Michigan Mushroom Burger with melted cheese and onion ring at Hysteria Restaurant"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                fallbackTitle="MICHIGAN MUSHROOM"
                fallbackSubtitle="3.50 JOD Bestseller"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              {/* Price Tag */}
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-street-red text-white font-montserrat font-black text-sm shadow-lg tabular-nums">
                {bestseller ? formatJod(bestseller.priceJod) : '3.50 JOD'}
              </div>
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-low/90 backdrop-blur-md border border-white/10 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] font-montserrat font-black uppercase text-street-red flex items-center gap-1">
                    <span className="material-symbols-outlined material-fill text-[13px]">
                      star
                    </span>
                    #1 Bestseller
                  </span>
                  <p className="font-montserrat font-extrabold text-xs text-white leading-tight truncate">
                    Michigan Mushroom Burger (منشيغان ماشروم)
                  </p>
                </div>
                {bestseller && (
                  <button
                    type="button"
                    onClick={() => onQuickAdd(bestseller)}
                    aria-label="Quick add Michigan Mushroom Burger"
                    className="btn btn-xs btn-circle bg-street-red hover:bg-red-700 border-none text-white shrink-0"
                  >
                    <span className="material-symbols-outlined text-[15px]">add</span>
                  </button>
                )}
              </div>
            </div>

            {/* Happy Customer / Pick-up Strip */}
            <div className="col-span-2 p-3.5 rounded-xl bg-surface-container border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <FoodImage
                  src={STORE_INFO.images.happyCustomer}
                  alt="Happy Customer with Hysteria Takeout Boxes"
                  className="w-12 h-12 rounded-lg object-cover border border-white/20 shrink-0"
                  fallbackTitle="BOX"
                />
                <div className="min-w-0">
                  <p className="font-montserrat font-black text-xs text-white truncate">
                    &ldquo;Best late night street food box in Amman!&rdquo;
                  </p>
                  <p className="font-inter text-[11px] text-on-surface-variant truncate">
                    Hot, fresh, and wrapped in iconic Hysteria paper
                  </p>
                </div>
              </div>
              <a
                href="#menu-showcase"
                className="btn btn-sm h-9 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest border-none text-street-yellow font-montserrat text-xs font-bold shrink-0"
              >
                View All Platters →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE HERO (< lg) — Faithfully matches Mobile Stitch Design ==================== */}
      <div className="lg:hidden px-4 space-y-4">
        {/* 1-Tap Instant Ordering Banner */}
        <div className="bg-gradient-to-r from-surface-container to-surface-container-high border border-street-red/30 rounded-xl p-3 shadow-xl">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="font-montserrat font-bold text-[11px] uppercase tracking-wider text-white flex items-center gap-1 whitespace-nowrap">
              <span className="material-symbols-outlined text-street-red text-[15px]">moped</span>
              1-Tap Instant Ordering
            </span>
            <span className="text-[10px] font-bold text-secondary-soft bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/40 whitespace-nowrap shrink-0">
              Tabarbour &amp; Amman
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={STORE_INFO.talabatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff5a00] hover:bg-[#ff6a15] text-white text-center py-2.5 px-1 rounded-lg font-montserrat font-extrabold text-[11px] flex flex-col items-center justify-center active:scale-95 transition-transform shadow-md"
            >
              <span className="text-[9px] font-medium tracking-tight opacity-90">ORDER VIA</span>
              <span>Talabat</span>
            </a>
            <a
              href={STORE_INFO.careemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00e166] text-black text-center py-2.5 px-1 rounded-lg font-montserrat font-extrabold text-[11px] flex flex-col items-center justify-center active:scale-95 transition-transform shadow-md"
            >
              <span className="text-[9px] font-semibold tracking-tight opacity-80">
                DELIVER VIA
              </span>
              <span>Careem</span>
            </a>
            <a
              href={STORE_INFO.phoneHref}
              className="bg-street-red hover:bg-[#bf0022] text-white text-center py-2.5 px-1 rounded-lg font-montserrat font-extrabold text-[11px] flex flex-col items-center justify-center active:scale-95 transition-transform shadow-md"
            >
              <span className="text-[9px] font-medium tracking-tight opacity-90">
                CALL &amp; COLLECT
              </span>
              <span className="tabular-nums">{STORE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Mobile Hero Card: Late-Night Shawarma & Saj */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-surface-container-lowest border border-surface-container-highest">
          <div className="relative w-full h-80">
            <FoodImage
              src={STORE_INFO.images.calzoneHero}
              alt="Amman's Craziest Late-Night Shawarma and Cheesy Saj at Hysteria"
              className="w-full h-full object-cover object-center"
              fallbackTitle="HYSTERIA CRAZY TASTE"
              fallbackSubtitle="Shawarma, Saj & Smash Burgers"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/60 to-black/25" />

            {/* Top Tags */}
            <div className="absolute top-3 left-3 bg-street-red text-white font-montserrat font-black text-[10px] tracking-widest uppercase px-2.5 py-1 rounded shadow-lg flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
              CRAZY TASTE
            </div>
            <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-street-yellow font-montserrat font-bold text-[11px] px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              Until 4:00 AM
            </div>

            {/* Bottom Content */}
            <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col space-y-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-montserrat font-bold text-[11px] text-secondary-soft tracking-wide uppercase whitespace-nowrap">
                  Tabarbour Specialty
                </span>
                <span className="text-xs text-white/50">•</span>
                <span className="text-[11px] text-zinc-200 font-arabic font-bold whitespace-nowrap">
                  سناكات و شاورما صاج
                </span>
              </div>
              <h1 className="font-montserrat font-black text-2xl leading-tight text-white tracking-tight text-balance">
                Amman&apos;s Craziest Late-Night Shawarma &amp; Saj
              </h1>
              <p className="font-inter text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                Freshly sliced chicken &amp; beef saj, smashed burgers &amp; loaded cheesy fries
                until 4 AM in Tabarbour.
              </p>
              <div className="flex items-center gap-2 pt-1.5">
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="btn btn-primary btn-sm flex-1 h-11 bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-extrabold text-xs rounded-lg shadow-[0_4px_16px_rgba(217,4,41,0.5)]"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  <span>Direct Order</span>
                </button>
                <a
                  href="#menu-showcase"
                  className="btn btn-sm h-11 bg-surface-container-high border border-outline-variant/60 text-white font-montserrat font-bold text-xs px-3.5 rounded-lg"
                >
                  <span>View Menu</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_downward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
