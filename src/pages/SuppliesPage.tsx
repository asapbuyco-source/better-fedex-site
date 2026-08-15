import React, { useState } from 'react';
import { PageHero } from '../components/Page/PageHero';
import { Package, CheckCircle2, Minus, Plus, Trash2 } from 'lucide-react';
import { activityService } from '../services/activityService';

interface SupplyItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  unit: string;
  sizes?: string[];
}

const SUPPLIES: SupplyItem[] = [
  { id: 'env', name: 'FedEx® Envelope', desc: 'Tyvek® tear-resistant envelope for documents up to 60 pages', price: 0, unit: 'pack of 25', sizes: ['9.5" x 12.5"'] },
  { id: 'pak', name: 'FedEx® Pak', desc: 'Water-resistant padded pak for flexible items', price: 0, unit: 'pack of 10', sizes: ['10.5" x 15"'] },
  { id: 'box-s', name: 'FedEx® Small Box', desc: 'Ideal for small electronics, books, and accessories', price: 0, unit: 'pack of 10', sizes: ['8" x 8" x 4"'] },
  { id: 'box-m', name: 'FedEx® Medium Box', desc: 'Multi-depth carton for mid-size shipments', price: 1.25, unit: 'each', sizes: ['11" x 8" x 6"'] },
  { id: 'box-l', name: 'FedEx® Large Box', desc: 'Heavy-duty box for bulky but light items', price: 2.10, unit: 'each', sizes: ['14" x 11" x 8"'] },
  { id: 'tube', name: 'FedEx® Tube', desc: 'Rigid triangular tube for rolled documents and posters', price: 1.75, unit: 'each', sizes: ['6" x 38"'] },
  { id: 'tape', name: 'FedEx® Packing Tape', desc: 'Pressure-sensitive tape with FedEx branding', price: 4.50, unit: 'roll of 3', sizes: ['2" x 110 yds'] },
  { id: 'labels', name: 'Thermal Label Stock', desc: 'Self-adhesive labels for thermal printers', price: 12.00, unit: 'roll of 250' },
];

export const SuppliesPage: React.FC = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [ordered, setOrdered] = useState(false);

  const cartItems = SUPPLIES.filter(s => cart[s.id]);
  const total = cartItems.reduce((sum, s) => sum + s.price * cart[s.id], 0);
  const totalQty = cartItems.reduce((sum, s) => sum + cart[s.id], 0);

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) {
      const { [id]: _, ...rest } = cart;
      setCart(rest);
    } else {
      setCart({ ...cart, [id]: Math.min(qty, 99) });
    }
  };

  return (
    <div>
      <PageHero
        title="Packing & Shipping Supplies"
        subtitle="Free FedEx Express® boxes, envelopes, and paks for account holders. Order in bulk and we deliver to your door."
        breadcrumb={[{ label: 'Shipping', to: '/shipping' }, { label: 'Supplies' }]}
      >
        <div
          className="rounded-xl h-40 md:h-52 bg-cover bg-center border-4 border-white/20 shadow-lg"
          style={{ backgroundImage: "url('/images/fedex-boxes.jpg')" }}
          role="img"
          aria-label="Stack of shipping boxes"
        />
      </PageHero>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        {ordered ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center space-y-3 max-w-lg mx-auto">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <h2 className="text-xl font-bold text-gray-900">Order placed</h2>
            <p className="text-sm text-gray-600">
              {totalQty} item(s) totaling ${total.toFixed(2)} will arrive within 3-5 business days at your default address.
            </p>
            <button onClick={() => { setOrdered(false); setCart({}); }} className="text-xs font-bold text-[#0068A8] hover:underline">Continue shopping</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SUPPLIES.map(item => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                      {item.sizes && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.sizes.map(s => (
                            <span key={s} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Package className="w-8 h-8 text-purple-200 shrink-0" />
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className={`text-sm font-black ${item.price === 0 ? 'text-emerald-600' : 'text-[#4D148C]'}`}>
                        {item.price === 0 ? 'FREE' : `$${item.price.toFixed(2)}`}
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wide">per {item.unit}</div>
                    </div>

                    {cart[item.id] ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => setQty(item.id, cart[item.id] - 1)} className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold w-8 text-center">{cart[item.id]}</span>
                        <button onClick={() => setQty(item.id, cart[item.id] + 1)} className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setQty(item.id, 1)}
                        className="py-2 px-4 bg-[#4D148C] hover:bg-[#330066] text-white font-bold text-xs rounded transition-colors"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Cart */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 lg:sticky lg:top-32">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Your Order</h2>
                {cartItems.length === 0 ? (
                  <p className="text-xs text-gray-400 py-8 text-center">Your cart is empty. Free supplies are available to account holders.</p>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-gray-800">{item.name}</div>
                          <div className="text-gray-500">{cart[item.id]} × {item.price === 0 ? 'Free' : `$${item.price.toFixed(2)}`}</div>
                        </div>
                        <button onClick={() => setQty(item.id, 0)} className="text-gray-400 hover:text-red-500" aria-label="Remove">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-gray-100 flex justify-between text-sm font-black">
                      <span>Total</span>
                      <span className="text-[#4D148C]">${total.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        activityService.log(
                          'order',
                          'supplies',
                          `Supplies order: ${cartItems.map(i => i.name).join(', ')}`,
                          `${totalQty} item(s) totaling $${total.toFixed(2)}`,
                          { items: totalQty, total: `$${total.toFixed(2)}` }
                        );
                        setOrdered(true);
                      }}
                      className="w-full py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors"
                    >
                      PLACE ORDER
                    </button>
                    <p className="text-[10px] text-gray-400 text-center">Free delivery on all supply orders</p>
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
