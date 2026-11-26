import { STORE_INFO } from '../shared/menuData.ts';

interface OrderingHubProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function OrderingHub({ cartCount, onOpenCart }: OrderingHubProps) {
  return (
    <section
      id="ordering-hub"
      className="hidden lg:block py-8 bg-surface-container-low border-b border-surface-container-highest"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="card bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container border border-white/10 shadow-xl rounded-2xl">
          <div className="card-body p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-street-red/20 text-street-red font-montserrat text-xs font-black mb-3">
                  <span className="material-symbols-outlined text-[16px]">electric_bolt</span>
                  DELIVERED HOT TO YOUR DOORSTEP
                </div>
                <h2 className="font-montserrat font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  Hungry Right Now? Order in 2 Clicks
                </h2>
                <p className="text-on-surface-variant font-inter text-sm mt-1 max-w-xl">
                  Order directly from our Tabarbour kitchen for instant curbside pickup or Amman
                  delivery, or tap through Jordan&apos;s top delivery apps.
                </p>
              </div>
              <div className="lg:col-span-6 flex flex-wrap gap-3 justify-start lg:justify-end">
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="btn h-11 px-4 rounded-xl bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-black text-xs uppercase tracking-wider shadow-lg"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  <span>Direct Kitchen Order</span>
                  {cartCount > 0 && (
                    <span className="badge badge-sm bg-street-yellow text-black border-none font-black tabular-nums">
                      {cartCount}
                    </span>
                  )}
                </button>
                <a
                  href={STORE_INFO.talabatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn h-11 px-4 rounded-xl bg-street-orange hover:bg-orange-600 border-none text-white font-montserrat font-black text-xs uppercase tracking-wider shadow-lg"
                >
                  <span className="material-symbols-outlined text-[18px]">sports_motorsports</span>
                  <span>Talabat Delivery</span>
                </a>
                <a
                  href={STORE_INFO.careemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn h-11 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 border-none text-white font-montserrat font-black text-xs uppercase tracking-wider shadow-lg"
                >
                  <span className="material-symbols-outlined text-[18px]">moped</span>
                  <span>Careem NOW</span>
                </a>
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn h-11 px-4 rounded-xl bg-surface-container-highest hover:bg-white hover:text-black text-white font-montserrat font-extrabold text-xs uppercase tracking-wider border border-white/10"
                >
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">
                    chat
                  </span>
                  <span>WhatsApp Pickup</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
