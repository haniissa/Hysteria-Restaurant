import { STORE_INFO, type MenuCategory, type MenuItem } from '../shared/menuData.ts';
import { formatJod } from '../lib/orderLogic.ts';
import { FoodImage } from './FoodImage.tsx';

interface MenuSectionProps {
  items: MenuItem[];
  counterAddons: MenuItem[];
  activeCategory: MenuCategory;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  onSelectCategory: (cat: MenuCategory) => void;
  onSearchChange: (q: string) => void;
  onQuickAdd: (item: MenuItem) => void;
  onCustomize: (item: MenuItem) => void;
  onRetry: () => void;
}

const CATEGORIES: { id: MenuCategory; label: string; mobileLabel: string }[] = [
  { id: 'all', label: 'All Items', mobileLabel: 'All Deals' },
  { id: 'shawarma', label: 'Saj & Shawarma', mobileLabel: 'Saj & Shawarma' },
  { id: 'burgers', label: 'Smashed Burgers', mobileLabel: 'Smash Burgers' },
  { id: 'calzones', label: 'Stuffed Calzones', mobileLabel: 'Stuffed Calzones' },
  { id: 'sides', label: 'Fries & Sides', mobileLabel: 'Loaded Fries & Sides' },
  { id: 'drinks', label: 'Cold Drinks', mobileLabel: 'Drinks' },
];

function tagColorClass(tone: MenuItem['tagTone']): string {
  switch (tone) {
    case 'emerald':
      return 'text-emerald-400';
    case 'orange':
      return 'text-street-orange';
    case 'red':
      return 'text-primary-soft';
    default:
      return 'text-street-yellow';
  }
}

function mobileRibbonClass(tone: MenuItem['tagTone']): string {
  switch (tone) {
    case 'orange':
      return 'bg-surface-container-highest text-white';
    case 'emerald':
      return 'bg-street-orange text-black';
    default:
      return 'bg-street-red text-white';
  }
}

export function MenuSection({
  items,
  counterAddons,
  activeCategory,
  searchQuery,
  loading,
  error,
  onSelectCategory,
  onSearchChange,
  onQuickAdd,
  onCustomize,
  onRetry,
}: MenuSectionProps) {
  return (
    <section id="menu-showcase" className="py-8 lg:py-16 bg-surface-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header + Category Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 lg:mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-street-red font-montserrat font-black uppercase tracking-widest text-[11px] lg:text-xs">
                Authentic Street Fuel
              </span>
              <span className="text-white/40" aria-hidden="true">
                •
              </span>
              <span className="text-street-yellow font-arabic font-black text-sm">
                قائمة الطعام الجنونية
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3 mt-1">
              <h2 className="font-montserrat font-black text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                THE CRAZY TASTE MENU
              </h2>
              <span className="lg:hidden text-xs bg-surface-container-high px-2.5 py-1 rounded-lg font-montserrat font-bold text-zinc-300 tabular-nums shrink-0">
                {items.length} {items.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>
            <p className="hidden sm:block text-on-surface-variant font-inter text-sm max-w-xl mt-1">
              Legendary smashed burgers, crisp sliced saj shawarma, freshly baked pockets, and
              cheese pulls. Premium taste with street pricing (1 to 5 JOD).
            </p>
          </div>

          {/* Search input for fast menu filtering */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <label className="input input-sm h-10 bg-surface-container border border-white/10 focus-within:border-street-red rounded-xl flex items-center gap-2 px-3 w-full sm:w-64">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                search
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search shawarma, burger..."
                aria-label="Search menu items"
                className="grow bg-transparent text-xs text-white placeholder:text-zinc-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear menu search"
                  className="text-zinc-400 hover:text-white"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </label>
          </div>
        </div>

        {/* Category Filter Tabs (DaisyUI buttons, scrollable on mobile) */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 lg:mb-8 no-scrollbar"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory(cat.id)}
                className={`btn btn-sm h-10 px-4 rounded-xl lg:rounded-full font-montserrat text-xs uppercase tracking-wide whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-street-red hover:bg-red-700 text-white border-none font-black shadow-md shadow-street-red/30'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white border border-outline-variant/40 font-bold'
                }`}
              >
                <span className="hidden lg:inline">{cat.label}</span>
                <span className="lg:hidden">{cat.mobileLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((slot) => (
              <div
                key={slot}
                className="rounded-2xl bg-surface-container border border-white/5 overflow-hidden animate-pulse"
              >
                <div className="h-56 bg-surface-container-high" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 bg-surface-container-high rounded" />
                  <div className="h-12 w-full bg-surface-container-high rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div role="alert" className="alert bg-street-red/15 border border-street-red/40 text-white rounded-2xl">
            <span className="material-symbols-outlined text-street-red">error</span>
            <div>
              <h3 className="font-montserrat font-bold text-sm">Could not load menu</h3>
              <p className="text-xs text-on-surface-variant">{error}</p>
            </div>
            <button
              type="button"
              onClick={onRetry}
              className="btn btn-sm bg-street-red border-none text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && items.length === 0 && (
          <div className="card bg-surface-container border border-white/10 rounded-2xl p-10 text-center">
            <span className="material-symbols-outlined text-4xl text-street-yellow mx-auto mb-2">
              search_off
            </span>
            <h3 className="font-montserrat font-black text-lg text-white">
              No cravings matched &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Try clearing your filter to explore all Tabarbour street favorites.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  onSearchChange('');
                  onSelectCategory('all');
                }}
                className="btn btn-sm bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-bold"
              >
                Show All Menu Items
              </button>
            </div>
          </div>
        )}

        {/* Food Items Grid (DaisyUI Cards matching both Desktop 3-col and Mobile 1-col Stitch designs) */}
        {!loading && !error && items.length > 0 && (
          <div
            data-testid="menu-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          >
            {items.map((item) => (
              <article
                key={item.id}
                data-testid={`menu-card-${item.id}`}
                className="card rounded-2xl bg-surface-container border border-white/10 overflow-hidden hover:border-street-red/60 transition-all duration-200 hover:-translate-y-0.5 flex flex-col group shadow-lg"
              >
                {/* Card Media */}
                <figure className="relative h-52 lg:h-60 overflow-hidden bg-surface-container-lowest">
                  <FoodImage
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    fallbackTitle={item.name}
                    fallbackSubtitle={item.arabicName}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-black/15 to-transparent" />

                  {/* Mobile Top-Left Ribbon */}
                  <span
                    className={`lg:hidden absolute top-2.5 left-2.5 font-montserrat font-black text-[10px] px-2 py-0.5 rounded shadow uppercase ${mobileRibbonClass(
                      item.tagTone,
                    )}`}
                  >
                    {item.mobileTag}
                  </span>

                  {/* Desktop Top-Right Price Pill */}
                  <span className="hidden lg:inline-flex absolute top-3 right-3 px-3 py-1 rounded-full bg-street-red text-white font-montserrat font-black text-sm shadow-lg tabular-nums">
                    {formatJod(item.priceJod)}
                  </span>

                  {/* Desktop Bottom-Left Tag */}
                  <span
                    className={`hidden lg:inline-flex absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md font-montserrat font-bold text-[11px] uppercase tracking-wide ${tagColorClass(
                      item.tagTone,
                    )}`}
                  >
                    {item.tag}
                  </span>

                  {/* Mobile Bottom Arabic + Price Row */}
                  <div className="lg:hidden absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-2">
                    <span className="text-white font-arabic font-extrabold text-xs bg-black/75 px-2 py-1 rounded backdrop-blur-sm">
                      {item.arabicName}
                    </span>
                    <span className="font-montserrat font-black text-base text-white bg-street-red/95 px-2.5 py-0.5 rounded-lg shadow tabular-nums">
                      {formatJod(item.priceJod)}
                    </span>
                  </div>
                </figure>

                {/* Card Body */}
                <div className="card-body p-4 lg:p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="card-title font-montserrat font-black text-base lg:text-lg text-white leading-snug">
                        {item.name}
                      </h3>
                      <span className="hidden lg:inline font-arabic font-bold text-street-yellow text-sm shrink-0">
                        {item.arabicName}
                      </span>
                    </div>
                    <p className="text-on-surface-variant font-inter text-xs mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer Action Row */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                    <span className="text-street-yellow font-montserrat font-bold flex items-center gap-1 min-w-0">
                      <span className="material-symbols-outlined text-[15px] shrink-0">
                        {item.perkIcon}
                      </span>
                      <span className="hidden lg:inline truncate">{item.perkText}</span>
                      <span className="lg:hidden truncate">{item.mobilePerkText}</span>
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.customizable && (
                        <button
                          type="button"
                          onClick={() => onCustomize(item)}
                          aria-label={`Customize ${item.name}`}
                          title="Customize spice & kitchen notes"
                          className="btn btn-xs btn-square w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-container-highest border border-white/10 text-zinc-200"
                        >
                          <span className="material-symbols-outlined text-[15px]">tune</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onQuickAdd(item)}
                        aria-label={`Add ${item.name} to order`}
                        className="btn btn-xs h-8 px-3 rounded-lg bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-black uppercase text-[11px] tracking-wider whitespace-nowrap"
                      >
                        <span>Order Now</span>
                        <span className="material-symbols-outlined text-[14px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Extra Snacks & Soft Drinks Counter Sub-Bar */}
        <div className="mt-8 p-4 lg:p-5 rounded-2xl bg-surface-container-high border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-street-red/20 text-street-red flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">local_cafe</span>
            </span>
            <div>
              <p className="font-montserrat font-bold text-xs text-white">
                Also Available on the Counter (1-Click Add):
              </p>
              <p className="font-inter text-xs text-on-surface-variant mt-0.5">
                Sinalco Ice Cold Cans (0.50 JOD) · Spicy Dynamite Potatoes (1.50 JOD) · Extra Garlic
                Toum (0.35 JOD)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {counterAddons.map((addon) => (
              <button
                key={addon.id}
                type="button"
                onClick={() => onQuickAdd(addon)}
                aria-label={`Add ${addon.name} (${formatJod(addon.priceJod)})`}
                className="btn btn-xs h-9 px-3 rounded-lg bg-surface-container hover:bg-street-red text-white border border-white/10 font-montserrat font-bold text-[11px] tabular-nums transition-colors"
              >
                <span className="material-symbols-outlined text-[14px] text-street-yellow">
                  add_circle
                </span>
                <span>{addon.name.replace(' Ice Cold Can', '').replace(' Dip', '')}</span>
                <span className="text-street-yellow">{formatJod(addon.priceJod)}</span>
              </button>
            ))}
            <a
              href={STORE_INFO.phoneHref}
              className="btn btn-xs h-9 px-3.5 rounded-lg bg-surface-container-highest hover:bg-white hover:text-black text-white border-none font-montserrat font-bold text-[11px]"
            >
              <span className="material-symbols-outlined text-[15px] text-street-yellow">call</span>
              <span>Daily Specials</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
