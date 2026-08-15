import React, { useState } from 'react';
import { PageHero } from '../components/Page/PageHero';
import { Truck, CheckCircle2 } from 'lucide-react';

export const FreightPage: React.FC = () => {
  const [quoted, setQuoted] = useState(false);
  const [quote, setQuote] = useState<{ price: number; transit: string } | null>(null);
  const [form, setForm] = useState({
    fromZip: '',
    toZip: '',
    freightClass: 'Class 70 (dense)',
    weightLbs: 1500,
    pallets: 1,
    accessorials: [] as string[]
  });

  const inputCls = "w-full h-11 px-3.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium";
  const labelCls = "text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5";

  const ACCESSORIALS = ['Liftgate at pickup', 'Liftgate at delivery', 'Inside delivery', 'Residential delivery', 'Appointment required'];

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}/.test(form.fromZip) || !/^\d{5}/.test(form.toZip)) {
      alert('Please enter valid 5-digit origin and destination ZIP codes.');
      return;
    }
    const classMultiplier: Record<string, number> = {
      'Class 50': 0.8, 'Class 70 (dense)': 0.9, 'Class 92.5': 1.0, 'Class 125': 1.15, 'Class 175': 1.35, 'Class 300': 1.6
    };
    const base = 180 + form.weightLbs * 0.14 * (classMultiplier[form.freightClass] || 1) + form.pallets * 45 + form.accessorials.length * 55;
    const price = Math.round(base * 100) / 100;
    const transit = form.weightLbs > 5000 ? '3-5 business days' : '1-3 business days';
    setQuote({ price, transit });
    setQuoted(true);
  };

  return (
    <div>
      <PageHero
        title="FedEx Freight® — LTL & Heavy Cargo"
        subtitle="Ship palletized freight over 150 lbs with reliable LTL service, day-definite options, and complete visibility."
        breadcrumb={[{ label: 'Shipping', to: '/shipping' }, { label: 'Freight' }]}
      >
        <div
          className="rounded-xl h-40 md:h-52 bg-cover bg-center border border-gray-200 shadow-lg"
          style={{ backgroundImage: "url('/images/fedex-warehouse.jpg')" }}
          role="img"
          aria-label="FedEx freight warehouse with pallets"
        />
      </PageHero>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form onSubmit={calculate} className="lg:col-span-5 bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5 h-fit">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#4D148C]" /> Get a Freight Quote
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Origin ZIP</label>
                <input type="text" value={form.fromZip} onChange={(e) => setForm({ ...form, fromZip: e.target.value })} className={inputCls} placeholder="Origin" />
              </div>
              <div>
                <label className={labelCls}>Destination ZIP</label>
                <input type="text" value={form.toZip} onChange={(e) => setForm({ ...form, toZip: e.target.value })} className={inputCls} placeholder="Destination" />
              </div>
              <div>
                <label className={labelCls}>Total Weight (lbs)</label>
                <input type="number" min="150" step="50" value={form.weightLbs} onChange={(e) => setForm({ ...form, weightLbs: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Pallets</label>
                <input type="number" min="1" max="26" value={form.pallets} onChange={(e) => setForm({ ...form, pallets: Number(e.target.value) })} className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Freight Class</label>
              <select value={form.freightClass} onChange={(e) => setForm({ ...form, freightClass: e.target.value })} className={inputCls}>
                {['Class 50', 'Class 70 (dense)', 'Class 92.5', 'Class 125', 'Class 175', 'Class 300'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className={labelCls}>Additional Services</label>
              <div className="space-y-2">
                {ACCESSORIALS.map(a => (
                  <label key={a} className="flex items-center gap-2 text-xs text-gray-700 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.accessorials.includes(a)}
                      onChange={(e) => setForm({
                        ...form,
                        accessorials: e.target.checked ? [...form.accessorials, a] : form.accessorials.filter(x => x !== a)
                      })}
                      className="accent-[#4D148C] w-4 h-4"
                    />
                    {a}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors">
              GET QUOTE
            </button>
          </form>

          <div className="lg:col-span-7 space-y-6">
            {quoted && quote && (
              <div className="bg-white rounded-xl border-2 border-[#4D148C] p-6">
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4" /> Quote Generated
                </div>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">FedEx Freight® Priority</div>
                    <div className="text-3xl font-black text-[#4D148C]">${quote.price.toFixed(2)}</div>
                    <div className="text-xs text-gray-500 mt-1">Transit: {quote.transit}</div>
                  </div>
                  <button
                    onClick={() => alert(`Freight booking initiated for $${quote.price.toFixed(2)}. A freight specialist will confirm pickup.`)}
                    className="py-3 px-6 bg-[#4D148C] hover:bg-[#330066] text-white font-bold text-sm rounded transition-colors"
                  >
                    Book This Shipment
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'FedEx Freight® Priority', desc: 'Day-definite delivery when you need to hit a deadline. Fastest LTL option.' },
                { title: 'FedEx Freight® Economy', desc: 'Cost-effective LTL for less time-sensitive palletized shipments.' },
                { title: 'FedEx Freight® Direct', desc: 'Delivery into your residence or business — including room of choice and packaging removal.' },
                { title: 'Volume & Truckload', desc: 'For shipments over ~20,000 lbs or volume LTL, get dedicated truckload pricing.' }
              ].map(card => (
                <div key={card.title} className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-sm font-bold text-[#4D148C]">{card.title}</h3>
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-purple-50 rounded-xl border border-purple-200 p-5">
              <h3 className="text-sm font-bold text-[#4D148C]">Freight Shipping Tips</h3>
              <ul className="mt-2 space-y-1.5 text-xs text-purple-900 list-disc pl-4">
                <li>Accurately classify freight — misclassification causes rebills.</li>
                <li>Palletize and shrink-wrap shipments; label each piece with the BOL.</li>
                <li>Provide accurate dimensions including pallet overhang.</li>
                <li>Book pickups at least 2 hours before the local cutoff.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
