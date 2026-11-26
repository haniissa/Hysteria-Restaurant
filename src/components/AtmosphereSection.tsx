import { ATMOSPHERE_CARDS, STORE_INFO } from '../shared/menuData.ts';
import { FoodImage } from './FoodImage.tsx';

function badgeToneClass(tone: 'yellow' | 'emerald' | 'red'): string {
  if (tone === 'emerald') return 'text-emerald-400';
  if (tone === 'red') return 'text-street-red';
  return 'text-street-yellow';
}

export function AtmosphereSection() {
  return (
    <section
      id="vibes-gallery"
      className="py-10 lg:py-16 bg-surface-container-lowest border-y border-surface-container-highest"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Atmosphere Header + 3-Card Mosaic (lg+) */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-8 items-center mb-12">
            <div className="col-span-7">
              <span className="text-street-red font-montserrat font-black uppercase tracking-widest text-xs">
                Tabarbour Street Culture
              </span>
              <h2 className="font-montserrat font-black text-4xl text-white uppercase tracking-tight mt-1 text-balance">
                INSIDE HYSTERIA: POP-ART, GRAFFITI &amp; NOCTURNAL ENERGY
              </h2>
              <p className="text-on-surface-variant font-inter text-base mt-2 max-w-2xl">
                Step into the spot where urban pop-art meets Middle Eastern street food. Custom
                Marilyn &amp; Salvador Dalí murals with juicy burgers, industrial steel partitions,
                hot neon signage, and a nonstop crowd of hungry Amman night owls.
              </p>
            </div>
            <div className="col-span-5 flex flex-wrap gap-2 justify-end">
              <span className="px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/10 text-white font-montserrat text-xs font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-street-yellow text-[16px]">
                  wifi
                </span>
                Free High-Speed Wi-Fi
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/10 text-white font-montserrat text-xs font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-street-red text-[16px]">
                  no_meeting_room
                </span>
                Walk-ins Welcome
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/10 text-white font-montserrat text-xs font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-400 text-[16px]">
                  deck
                </span>
                Outdoor Seating
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {ATMOSPHERE_CARDS.map((card) => (
              <article
                key={card.id}
                className="card rounded-2xl overflow-hidden bg-surface-container border border-white/10 group flex flex-col shadow-lg"
              >
                <figure className="h-64 overflow-hidden relative">
                  <FoodImage
                    src={card.imageUrl}
                    alt={card.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    fallbackTitle={card.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span
                    className={`absolute bottom-3 left-3 px-2 py-1 rounded bg-black/75 backdrop-blur-md font-montserrat font-extrabold text-[10px] uppercase ${badgeToneClass(
                      card.tagTone,
                    )}`}
                  >
                    {card.tag}
                  </span>
                </figure>
                <div className="card-body p-4 flex-1 flex flex-col justify-between">
                  <h3 className="font-montserrat font-extrabold text-sm text-white">
                    {card.title}
                  </h3>
                  <p className="text-on-surface-variant text-xs mt-1 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile Urban Store & Vibe Card (< lg) — Faithfully matches Mobile Stitch Design */}
        <div className="lg:hidden bg-surface-container-low border border-surface-container-highest rounded-xl p-4 shadow-xl flex flex-col space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-montserrat font-bold text-[10px] text-street-red tracking-widest uppercase">
                STREET CULTURE
              </span>
              <h2 className="font-montserrat font-black text-lg text-white">The Tabarbour Vibe</h2>
            </div>
            <span className="text-[11px] font-bold text-secondary-soft bg-surface-container px-2.5 py-1 rounded">
              Est. 2021
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative h-44 rounded-lg overflow-hidden border border-surface-container-highest group">
              <FoodImage
                src={STORE_INFO.images.storefront}
                alt="Hysteria exterior neon storefront Tabarbour Amman"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                fallbackTitle="Outdoor Seating"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 text-[10px] font-montserrat font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
                Outdoor Seating
              </span>
            </div>
            <div className="relative h-44 rounded-lg overflow-hidden border border-surface-container-highest group">
              <FoodImage
                src={STORE_INFO.images.murals}
                alt="Hysteria pop-art mural wall interior"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                fallbackTitle="Graffiti Murals"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 text-[10px] font-montserrat font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
                Graffiti Murals
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-surface-container rounded-lg p-2.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-street-red text-[18px]">
                no_meeting_room
              </span>
              <div className="text-[11px] font-semibold text-zinc-200">
                No Reservations Needed
              </div>
            </div>
            <div className="bg-surface-container rounded-lg p-2.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-soft text-[18px]">
                takeout_dining
              </span>
              <div className="text-[11px] font-semibold text-zinc-200">Dine-in &amp; Takeaway</div>
            </div>
            <div className="bg-surface-container rounded-lg p-2.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-soft text-[18px]">
                local_parking
              </span>
              <div className="text-[11px] font-semibold text-zinc-200">Free Street Parking</div>
            </div>
            <div className="bg-surface-container rounded-lg p-2.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-street-red text-[18px]">wifi</span>
              <div className="text-[11px] font-semibold text-zinc-200">Free Ultra-Fast Wi-Fi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
