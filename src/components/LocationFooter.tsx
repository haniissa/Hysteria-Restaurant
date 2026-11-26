import { STORE_INFO } from '../shared/menuData.ts';
import { FoodImage } from './FoodImage.tsx';

interface LocationFooterProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategoryAll: () => void;
}

export function LocationFooter({
  cartCount,
  onOpenCart,
  onSelectCategoryAll,
}: LocationFooterProps) {
  return (
    <>
      {/* LOCATION, HOURS & PRACTICAL INFO SECTION */}
      <section
        id="location-info"
        className="py-10 lg:py-16 bg-surface-container-low border-t border-surface-container-highest"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop 12-Col Location Grid (lg+) */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
            {/* Left: Hours & Details */}
            <div className="col-span-5 flex flex-col gap-6">
              <div>
                <span className="text-street-yellow font-montserrat font-black uppercase tracking-widest text-xs">
                  Tabarbour, Amman
                </span>
                <h2 className="font-montserrat font-black text-3xl text-white uppercase tracking-tight mt-1">
                  VISIT THE JOINT
                </h2>
                <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
                  Located in the heart of Tabarbour (Tariq district) in North Amman. No reservations
                  required — drive by, pull up, or walk in!
                </p>
              </div>

              {/* Operating Hours Box */}
              <div className="p-5 rounded-2xl bg-surface-container border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-street-yellow flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    Operating Hours
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-montserrat font-black uppercase bg-emerald-500/20 text-emerald-400">
                    Late Night 4 AM
                  </span>
                </div>
                <div className="flex flex-col gap-2 font-inter text-xs tabular-nums">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-white font-medium">Mon, Wed, Thu, Fri, Sat, Sun</span>
                    <span className="text-street-yellow font-bold">{STORE_INFO.hoursStandard}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-white font-medium">Tuesday</span>
                    <span className="text-street-yellow font-bold">{STORE_INFO.hoursTuesday}</span>
                  </div>
                </div>
              </div>

              {/* Practical Amenities Checklist */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-surface-container border border-white/5 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-street-red text-[20px]">
                    local_parking
                  </span>
                  <div>
                    <strong className="block text-white">Free Parking</strong>
                    <span className="text-[11px] text-on-surface-variant">
                      Street &amp; Lot space
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container border border-white/5 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-street-yellow text-[20px]">
                    no_meals
                  </span>
                  <div>
                    <strong className="block text-white">No Booking</strong>
                    <span className="text-[11px] text-on-surface-variant">Walk-ins only</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container border border-white/5 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-[20px]">
                    payments
                  </span>
                  <div>
                    <strong className="block text-white">Payment Options</strong>
                    <span className="text-[11px] text-on-surface-variant">
                      Cash, Card, NFC Tap
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container border border-white/5 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-street-orange text-[20px]">
                    dinner_dining
                  </span>
                  <div>
                    <strong className="block text-white">Dine-in &amp; Takeout</strong>
                    <span className="text-[11px] text-on-surface-variant">Drive-by pickup</span>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={STORE_INFO.phoneHref}
                  className="btn flex-1 h-12 rounded-xl bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-bold text-xs uppercase tracking-wider"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Call Kitchen ({STORE_INFO.phoneDisplay})</span>
                </a>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn h-12 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-white font-montserrat font-bold text-xs border border-white/10"
                >
                  <span className="material-symbols-outlined text-street-yellow text-[18px]">
                    directions
                  </span>
                  <span>Maps</span>
                </a>
              </div>
            </div>

            {/* Right: Tabarbour Map Visual & Verified Pin */}
            <div className="col-span-7 flex flex-col gap-4">
              <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface-container">
                <FoodImage
                  src={STORE_INFO.images.tabarbourMap}
                  alt="Tabarbour Amman street map location of Hysteria Restaurant"
                  className="w-full h-full object-cover object-center"
                  fallbackTitle="TABARBOUR, AMMAN"
                  fallbackSubtitle={STORE_INFO.coordinates}
                />

                {/* Verified Pin Tag */}
                <div className="absolute top-6 left-6 p-4 rounded-xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-street-red flex items-center justify-center text-white shrink-0 font-black shadow-[0_0_15px_rgba(217,4,41,0.6)]">
                      <span className="material-symbols-outlined text-xl">restaurant</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-montserrat font-black text-sm text-white leading-tight">
                          Hysteria - Crazy Taste
                        </h3>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-montserrat font-bold bg-street-yellow/20 text-street-yellow uppercase">
                          Verified
                        </span>
                      </div>
                      <p className="font-arabic text-xs text-street-yellow">
                        مطعم هيستيريا • طبربور
                      </p>
                      <p className="font-inter text-[11px] text-on-surface-variant mt-0.5">
                        {STORE_INFO.addressShort}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-inter text-white/70">
                    <span className="flex items-center gap-1 font-mono text-street-yellow text-[10px]">
                      <span className="material-symbols-outlined text-[13px] text-street-red">
                        my_location
                      </span>
                      {STORE_INFO.coordinates}
                    </span>
                    <span className="text-[10px] text-white/50">Near Tariq Mall Area</span>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-montserrat font-bold">
                      Open til 4:00 AM
                    </span>
                    <a
                      href={STORE_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-street-yellow font-montserrat font-bold hover:underline inline-flex items-center gap-1"
                    >
                      Open in Google Maps
                      <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                    </a>
                  </div>
                </div>

                {/* Bottom Street Bar */}
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-surface-container-low/95 backdrop-blur-md border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-street-red text-[18px]">
                      near_me
                    </span>
                    <span className="text-white font-medium">
                      Drive-by curbside pickup: Just call ahead!
                    </span>
                  </div>
                  <a
                    href={STORE_INFO.phoneHref}
                    className="text-street-yellow font-montserrat font-bold hover:underline tabular-nums"
                  >
                    {STORE_INFO.phoneIntl}
                  </a>
                </div>
              </div>

              {/* Driving Directions Strip */}
              <div className="p-5 rounded-2xl bg-surface-container border border-white/10 flex items-center justify-between gap-4 shadow-xl">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-street-red/20 text-street-red flex items-center justify-center shrink-0 border border-street-red/30 mt-0.5">
                    <span className="material-symbols-outlined text-2xl">explore</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-montserrat font-black text-sm text-white uppercase tracking-tight">
                        Location &amp; Directions
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-white/10 text-street-yellow font-mono text-[10px] font-bold">
                        {STORE_INFO.coordinates}
                      </span>
                    </div>
                    <p className="font-inter text-xs text-white mt-1">{STORE_INFO.addressFull}</p>
                    <p className="font-inter text-[11px] text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                      <span className="material-symbols-outlined text-[14px] text-street-orange">
                        navigation
                      </span>
                      {STORE_INFO.landmark}
                    </p>
                  </div>
                </div>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn h-11 px-4 rounded-xl bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(217,4,41,0.4)] shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Location & Late Hours Card (< lg) — Faithfully matches Mobile Stitch Design */}
          <div className="lg:hidden bg-surface-container-low border border-surface-container-highest rounded-xl p-4 shadow-xl flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-street-red text-[22px]">
                  pin_drop
                </span>
                <h2 className="font-montserrat font-black text-base text-white">
                  Location &amp; Late Hours
                </h2>
              </div>
              <span className="font-arabic font-bold text-xs text-secondary-soft">
                طبربور - عمّان
              </span>
            </div>

            <div className="w-full bg-surface-container-low rounded-xl border border-outline-variant/50 p-3.5 flex flex-col space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-montserrat font-black text-sm text-white">
                    HYSTERIA - Crazy Taste
                  </div>
                  <div className="text-xs text-zinc-300 mt-0.5">{STORE_INFO.addressShort}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-secondary-soft">
                      near_me
                    </span>
                    <span>Close to Queen Alia Hospital &amp; Tariq</span>
                  </div>
                </div>
                <span className="bg-street-red/20 text-primary-soft border border-street-red/40 text-[10px] font-montserrat font-black px-2 py-0.5 rounded shrink-0">
                  LATE NIGHT
                </span>
              </div>

              <div className="bg-surface-container-high/60 rounded px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono border border-outline-variant/30">
                <span className="text-zinc-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-street-red">
                    explore
                  </span>
                  GPS Coordinates
                </span>
                <span className="text-secondary-soft font-bold tracking-tight">
                  {STORE_INFO.coordinates}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm flex-1 h-10 bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-extrabold text-xs rounded-lg"
                >
                  <span className="material-symbols-outlined text-[16px]">navigation</span>
                  <span>Open Live GPS Navigation</span>
                </a>
                <a
                  href={STORE_INFO.phoneHref}
                  className="btn btn-sm h-10 bg-surface-container-high border border-outline-variant/60 text-white font-montserrat font-bold text-xs px-3 rounded-lg"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary-soft">
                    phone_in_talk
                  </span>
                  <span>Call</span>
                </a>
              </div>
            </div>

            <div className="bg-surface-container rounded-lg p-3 flex flex-col space-y-2 border border-outline-variant/30 tabular-nums">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-semibold">Wednesday – Monday</span>
                <span className="text-primary-soft font-mono font-bold">
                  {STORE_INFO.hoursStandard}
                </span>
              </div>
              <div className="h-[1px] bg-surface-container-highest" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-semibold">Tuesday</span>
                <span className="text-secondary-soft font-mono font-bold">
                  {STORE_INFO.hoursTuesday}
                </span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-center space-x-2 text-zinc-400 text-xs">
              <span className="material-symbols-outlined text-[15px] text-street-red">
                support_agent
              </span>
              <span>
                Order Hotline: <strong className="text-white">{STORE_INFO.phoneDisplay}</strong>{' '}
                (WhatsApp / Direct)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALLOUT BANNER (Desktop & Tablet) */}
      <section className="py-12 bg-gradient-to-r from-street-red via-red-900 to-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="font-arabic font-black text-2xl text-yellow-300 block">
            مشتهي شاورما أو سماش برجر هسا؟
          </span>
          <h2 className="font-montserrat font-black text-2xl sm:text-5xl uppercase tracking-tight mt-1 text-balance">
            SATISFY YOUR LATE-NIGHT CRAVINGS IN TABARBOUR
          </h2>
          <p className="font-inter text-sm sm:text-base text-white/90 max-w-xl mx-auto mt-2">
            From 11 AM until 4 AM. Best prices in town (1 to 5 JOD). Walk in anytime or order
            delivery directly.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenCart}
              className="btn h-12 px-6 rounded-xl bg-white text-street-red hover:bg-yellow-300 hover:text-black border-none font-montserrat font-black text-xs uppercase tracking-wider shadow-xl"
            >
              Order Direct Now
            </button>
            <a
              href={STORE_INFO.talabatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn h-12 px-6 rounded-xl bg-street-orange hover:bg-orange-600 border-none text-white font-montserrat font-black text-xs uppercase tracking-wider"
            >
              Order on Talabat
            </a>
            <a
              href={STORE_INFO.careemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn h-12 px-6 rounded-xl bg-black text-white hover:bg-neutral-800 font-montserrat font-black text-xs uppercase tracking-wider border border-white/20"
            >
              Order on Careem
            </a>
            <a
              href={STORE_INFO.phoneHref}
              className="btn h-12 px-6 rounded-xl bg-black/40 hover:bg-black text-white font-montserrat font-black text-xs uppercase tracking-wider border border-white/20"
            >
              Call {STORE_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* DESKTOP 4-COLUMN FOOTER */}
      <footer className="bg-surface-container-lowest text-on-surface-variant border-t border-surface-container-highest pb-24 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-street-red flex items-center justify-center text-white font-black text-sm">
                  H
                </div>
                <span className="font-montserrat font-black text-xl text-white tracking-tight">
                  HYSTERIA
                </span>
                <span className="font-arabic font-black text-lg text-street-red">هيستيريا</span>
              </div>
              <p className="text-xs font-inter text-on-surface-variant leading-relaxed">
                Hysteria Restaurant (Crazy Taste) — Tabarbour&apos;s go-to street food destination
                for super saj shawarma, loaded smashed burgers, and epic stuffed calzones.
              </p>
              <div className="flex items-center gap-3 mt-1">
                <a
                  href={STORE_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hysteria Facebook Page"
                  className="btn btn-xs btn-square w-8 h-8 rounded-lg bg-surface-container-high hover:bg-street-red border-none text-white"
                >
                  <span className="material-symbols-outlined text-[16px]">public</span>
                </a>
                <a
                  href={STORE_INFO.phoneHref}
                  aria-label="Call Hysteria"
                  className="btn btn-xs btn-square w-8 h-8 rounded-lg bg-surface-container-high hover:bg-emerald-600 border-none text-white"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                </a>
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Hysteria"
                  className="btn btn-xs btn-square w-8 h-8 rounded-lg bg-surface-container-high hover:bg-emerald-500 border-none text-white"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="font-montserrat font-black text-xs uppercase tracking-widest text-white">
                Opening Hours
              </span>
              <ul className="flex flex-col gap-1 text-xs tabular-nums">
                <li className="flex justify-between py-1 border-b border-white/5">
                  <span>Mon, Wed – Sun</span>
                  <span className="text-street-yellow font-bold">{STORE_INFO.hoursStandard}</span>
                </li>
                <li className="flex justify-between py-1 border-b border-white/5">
                  <span>Tuesday</span>
                  <span className="text-street-yellow font-bold">{STORE_INFO.hoursTuesday}</span>
                </li>
                <li className="pt-1 text-[11px] text-emerald-400 font-semibold">
                  Open 7 days a week until dawn!
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="font-montserrat font-black text-xs uppercase tracking-widest text-white">
                Tabarbour Branch
              </span>
              <p className="text-xs text-white">
                Tabarbour Enclave (Tariq district), Amman, Hashemite Kingdom of Jordan
              </p>
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-street-red">phone</span>
                <a
                  href={STORE_INFO.phoneHref}
                  className="text-white hover:text-street-yellow font-bold tabular-nums"
                >
                  {STORE_INFO.phoneDisplay} / {STORE_INFO.phoneIntl}
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-street-yellow">
                  directions_car
                </span>
                <span>Free Street &amp; Accessible Parking</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="font-montserrat font-black text-xs uppercase tracking-widest text-white">
                Top Cravings
              </span>
              <ul className="flex flex-col gap-1.5 text-xs">
                <li>
                  <a href="#menu-showcase" className="hover:text-street-yellow transition-colors">
                    • Michigan Mushroom Burger (3.50 JOD)
                  </a>
                </li>
                <li>
                  <a href="#menu-showcase" className="hover:text-street-yellow transition-colors">
                    • Super Saj Shawarma Platter (3.00 JOD)
                  </a>
                </li>
                <li>
                  <a href="#menu-showcase" className="hover:text-street-yellow transition-colors">
                    • Shawarma Pockets Basket (2.75 JOD)
                  </a>
                </li>
                <li>
                  <a href="#menu-showcase" className="hover:text-street-yellow transition-colors">
                    • Stuffed Calzone Melt (4.00 JOD)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-surface-container-highest flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
            <span>
              © 2021–2026 Hysteria Restaurant (Crazy Taste / هيستيريا). Tabarbour, Amman. All rights
              reserved.
            </span>
            <div className="flex items-center gap-3 font-montserrat font-bold text-[11px]">
              <span className="text-white/60">No reservations needed</span>
              <span aria-hidden="true">•</span>
              <span className="text-street-yellow">First-Come, First-Served</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION DOCK (< lg) — Faithfully matches Mobile Stitch Design */}
      <nav
        aria-label="Mobile quick navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#0e0e10]/95 backdrop-blur-2xl border-t border-surface-container-highest/70 shadow-[0_-4px_24px_rgba(0,0,0,0.85)]"
      >
        <div className="flex justify-between items-center h-16 px-3">
          <a
            href="#menu-showcase"
            onClick={onSelectCategoryAll}
            className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 text-primary-soft font-bold"
          >
            <span className="material-symbols-outlined text-[22px] text-street-red">
              restaurant
            </span>
            <span className="font-montserrat text-[10px] tracking-wide">Menu</span>
          </a>

          <a
            href="#vibes-gallery"
            className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">local_offer</span>
            <span className="font-montserrat text-[10px] tracking-wide whitespace-nowrap">
              1–5 JOD
            </span>
          </a>

          {/* Center Hero Action: Open Live Order Drawer */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open mobile order bag, ${cartCount} items`}
            className="flex flex-col items-center justify-center -mt-5 group relative"
          >
            <div className="relative w-13 h-13 p-3 rounded-full bg-gradient-to-tr from-[#bf0022] via-street-red to-street-orange flex items-center justify-center shadow-[0_4px_20px_rgba(217,4,41,0.6)] transition-transform group-active:scale-95 border-2 border-surface">
              <span className="material-symbols-outlined text-white text-[24px]">moped</span>
              {cartCount > 0 && (
                <span
                  data-testid="mobile-cart-count"
                  className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-street-yellow text-black font-montserrat font-black text-[10px] flex items-center justify-center shadow tabular-nums"
                >
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-montserrat font-extrabold text-[10px] text-primary-soft mt-1 tracking-wider uppercase">
              Order
            </span>
          </button>

          <a
            href="#location-info"
            className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">location_on</span>
            <span className="font-montserrat text-[10px] tracking-wide">Tabarbour</span>
          </a>

          <a
            href={STORE_INFO.phoneHref}
            className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">call</span>
            <span className="font-montserrat text-[10px] tracking-wide tabular-nums">
              0790699111
            </span>
          </a>
        </div>
      </nav>
    </>
  );
}
