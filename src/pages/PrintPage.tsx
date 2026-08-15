import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/Page/PageHero';
import { Printer, CheckCircle2, ShoppingBag } from 'lucide-react';
import { activityService } from '../services/activityService';

interface PrintProduct {
  id: string;
  category: string;
  name: string;
  desc: string;
  priceFrom: number;
  turnaround: string;
}

const PRODUCTS: PrintProduct[] = [
  { id: 'cards', category: 'documents', name: 'Business Cards', desc: 'Premium cardstock with matte, gloss, or linen finishes', priceFrom: 19.99, turnaround: 'Same day' },
  { id: 'resume', category: 'documents', name: 'Resumes & Presentations', desc: 'Professional prints, binding, and covers', priceFrom: 0.35, turnaround: 'Same day' },
  { id: 'posters', category: 'signs', name: 'Posters & Prints', desc: 'Photo-quality posters up to 36" x 48"', priceFrom: 14.99, turnaround: '24 hours' },
  { id: 'banner', category: 'signs', name: 'Vinyl Banners', desc: 'Indoor/outdoor banners with grommets', priceFrom: 49.99, turnaround: '2-3 days' },
  { id: 'yardsign', category: 'signs', name: 'Yard Signs', desc: 'Coroplast signs with metal stakes', priceFrom: 12.99, turnaround: '24 hours' },
  { id: 'flyers', category: 'marketing', name: 'Flyers & Brochures', desc: 'Full-color tri-folds, bi-folds, and handouts', priceFrom: 29.99, turnaround: '24 hours' },
  { id: 'postcards', category: 'marketing', name: 'Postcards & Mailers', desc: 'EDDM-ready postcards with mailing services', priceFrom: 24.99, turnaround: '2-3 days' },
  { id: 'passport', category: 'passport', name: 'Passport Photos', desc: 'Compliant photos printed in minutes, in store', priceFrom: 14.99, turnaround: 'Minutes' },
  { id: 'photo', category: 'passport', name: 'Photo Prints & Gifts', desc: 'Canvas, mugs, phone cases, and photo gifts', priceFrom: 9.99, turnaround: '24 hours' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'documents', label: 'Documents & Cards' },
  { id: 'signs', label: 'Signs & Banners' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'passport', label: 'Photos' },
];

export const PrintPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get('category') || 'all';
  const [cart, setCart] = useState<{ product: PrintProduct; qty: number }[]>([]);
  const [ordered, setOrdered] = useState(false);

  const filtered = activeCat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);
  const total = cart.reduce((s, i) => s + i.product.priceFrom * i.qty, 0);

  const addToCart = (product: PrintProduct) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  return (
    <div>
      <PageHero
        title="Design & Print Online"
        subtitle="Business cards, banners, brochures, and more — designed online, printed by experts, ready for pickup or delivery."
        breadcrumb={[{ label: 'Design & Print' }]}
      >
        <div
          className="rounded-xl h-40 md:h-52 bg-cover bg-center border border-gray-200 shadow-lg"
          style={{ backgroundImage: "url('/images/fedex-print.jpg')" }}
          role="img"
          aria-label="FedEx Office printing services"
        />
      </PageHero>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        {ordered ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center space-y-3 max-w-lg mx-auto">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <h2 className="text-xl font-bold text-gray-900">Print order received</h2>
            <p className="text-sm text-gray-600">
              Order <span className="font-mono font-bold text-[#4D148C]">PRT-{Math.floor(100000 + Math.random() * 900000)}</span> confirmed.
              We'll email you when it's ready for pickup at your selected FedEx Office.
            </p>
            <button onClick={() => { setOrdered(false); setCart([]); }} className="text-xs font-bold text-[#0068A8] hover:underline">Start a new order</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Category filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-5 text-xs">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSearchParams(cat.id === 'all' ? {} : { category: cat.id })}
                    className={`px-3.5 py-2 rounded-full font-bold transition-colors whitespace-nowrap ${
                      activeCat === cat.id
                        ? 'bg-[#4D148C] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map(product => (
                  <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col hover:border-[#4D148C] hover:shadow-md transition-all">
                    <div className="w-11 h-11 rounded-lg bg-purple-50 text-[#4D148C] flex items-center justify-center mb-3">
                      <Printer className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed flex-1">{product.desc}</p>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-black text-[#4D148C]">from ${product.priceFrom.toFixed(2)}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide">Ready in {product.turnaround}</div>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="py-2 px-4 bg-[#4D148C] hover:bg-[#330066] text-white font-bold text-xs rounded transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 lg:sticky lg:top-32">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#4D148C]" /> Your Print Order
                </h2>
                {cart.length === 0 ? (
                  <p className="text-xs text-gray-400 py-8 text-center">Cart is empty. Add products to start an order.</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex justify-between text-xs">
                        <div>
                          <div className="font-bold text-gray-800">{item.product.name}</div>
                          <div className="text-gray-500">{item.qty} × ${item.product.priceFrom.toFixed(2)}</div>
                        </div>
                        <button
                          onClick={() => setCart(cart.filter(i => i.product.id !== item.product.id))}
                          className="text-gray-400 hover:text-red-500 font-bold"
                          aria-label="Remove"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-gray-100 flex justify-between text-sm font-black">
                      <span>Estimated total</span>
                      <span className="text-[#4D148C]">${total.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        activityService.log(
                          'order',
                          'print',
                          `Print order: ${cart.map(i => i.product.name).join(', ')}`,
                          `${cart.reduce((s, i) => s + i.qty, 0)} item(s), estimated $${total.toFixed(2)}`,
                          { items: cart.length, total: `$${total.toFixed(2)}` }
                        );
                        setOrdered(true);
                      }}
                      className="w-full py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors"
                    >
                      CHECKOUT & DESIGN
                    </button>
                    <p className="text-[10px] text-gray-400 text-center">Next step: customize your design in the editor</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
