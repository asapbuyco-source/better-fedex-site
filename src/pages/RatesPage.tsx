import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { rateService, RateQuote, CalculateRateInput } from '../services/rateService';
import { PageHero } from '../components/Page/PageHero';
import { Calculator, Truck, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RatesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openAuth, currentUser } = useApp();

  const [form, setForm] = useState<CalculateRateInput>({
    fromZip: searchParams.get('from') || '10036',
    toZip: searchParams.get('to') || '90210',
    weightLbs: Number(searchParams.get('weight')) || 3,
    packaging: 'FedEx Box',
    isCommercial: false
  });
  const [quotes, setQuotes] = useState<RateQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const calculate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setSearched(true);
    const results = await rateService.calculateRates(form);
    setQuotes(results);
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams.get('auto') === '1') {
      calculate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputCls = "w-full h-11 px-3.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium";
  const labelCls = "text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5";

  return (
    <div>
      <PageHero
        title="Shipping Rates & Delivery Times"
        subtitle="Get an instant estimate for your shipment. Open a free account to save up to 40% on FedEx Express®."
        breadcrumb={[{ label: 'Shipping', to: '/shipping' }, { label: 'Rates & Transit Times' }]}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-4">
            <form onSubmit={calculate} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#4D148C]" /> Rate Details
              </h2>

              <div>
                <label className={labelCls}>From (ZIP Code)</label>
                <input
                  type="text"
                  value={form.fromZip}
                  onChange={(e) => setForm({ ...form, fromZip: e.target.value })}
                  className={inputCls}
                  placeholder="Origin ZIP"
                  required
                />
              </div>

              <div>
                <label className={labelCls}>To (ZIP Code)</label>
                <input
                  type="text"
                  value={form.toZip}
                  onChange={(e) => setForm({ ...form, toZip: e.target.value })}
                  className={inputCls}
                  placeholder="Destination ZIP"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Weight (lbs)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={form.weightLbs}
                    onChange={(e) => setForm({ ...form, weightLbs: Number(e.target.value) })}
                    className={inputCls}
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>Packaging</label>
                  <select
                    value={form.packaging}
                    onChange={(e) => setForm({ ...form, packaging: e.target.value as CalculateRateInput['packaging'] })}
                    className={inputCls}
                  >
                    <option>FedEx Envelope</option>
                    <option>FedEx Pak</option>
                    <option>FedEx Box</option>
                    <option>Your Packaging</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>Delivery Location</label>
                <div className="flex gap-2">
                  {[
                    { label: 'Residential', value: false },
                    { label: 'Commercial', value: true }
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setForm({ ...form, isCommercial: opt.value })}
                      className={`flex-1 py-2.5 text-xs font-bold rounded border-2 transition-colors ${
                        form.isCommercial === opt.value
                          ? 'border-[#4D148C] bg-purple-50 text-[#4D148C]'
                          : 'border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors"
              >
                CALCULATE RATES
              </button>

              <p className="text-[11px] text-gray-400 leading-relaxed">
                Estimates are based on published rates. Final pricing may vary based on actual weight, dimensions, and surcharges.
              </p>
            </form>
          </div>

          {/* Results */}
          <div className="lg:col-span-8 space-y-4">
            {!currentUser && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-orange-950 font-medium">
                  <ShieldCheck className="w-5 h-5 text-[#FF6600] shrink-0" />
                  <span>Open a free account to unlock up to <strong>40% off FedEx Express®</strong> and <strong>20% off FedEx Ground®</strong>.</span>
                </div>
                <button
                  onClick={() => openAuth('signup')}
                  className="text-[#FF6600] font-bold hover:underline whitespace-nowrap ml-2 shrink-0 text-xs"
                >
                  Sign Up Now →
                </button>
              </div>
            )}

            {loading && (
              <div className="bg-white border border-gray-200 rounded-xl p-16 text-center text-gray-500 font-medium">
                Calculating optimal shipping rates & transit schedules...
              </div>
            )}

            {!loading && !searched && (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800">Get your rate estimate</h3>
                <p className="text-sm text-gray-500 mt-1">Fill in the shipment details and calculate to compare FedEx services.</p>
              </div>
            )}

            {!loading && searched && quotes.map((quote, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 hover:border-[#4D148C] hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-base text-gray-900">{quote.serviceName}</h4>
                    {quote.badge && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-purple-100 text-[#4D148C] rounded">
                        {quote.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 font-medium flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#FF6600]" />
                    Delivery: <strong className="text-gray-900">{quote.deliveryDate}</strong> ({quote.deliveryTime})
                  </div>
                  {quote.guaranteed && (
                    <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> FedEx Money-Back Guarantee Applicable
                    </div>
                  )}
                </div>

                <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-start">
                  <div>
                    <div className="text-xs text-gray-400 line-through">${quote.price.toFixed(2)} Standard</div>
                    <div className="text-xl sm:text-2xl font-black text-[#4D148C]">
                      ${quote.discountedPrice.toFixed(2)}{' '}
                      <span className="text-xs text-emerald-600 font-bold">({quote.savingsPercentage}% off)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/shipping/ship?service=${encodeURIComponent(quote.serviceName)}&price=${quote.discountedPrice}&from=${form.fromZip}&to=${form.toZip}&weight=${form.weightLbs}`)}
                    className="mt-2 py-2 px-4 bg-[#FF6600] hover:bg-[#E05500] text-white font-bold text-xs rounded transition-colors inline-flex items-center gap-1 shadow-xs"
                  >
                    Ship Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
