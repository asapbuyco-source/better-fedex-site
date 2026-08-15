import React, { useState } from 'react';
import { PageHero } from '../components/Page/PageHero';
import { FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { activityService } from '../services/activityService';

export const ClaimsPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [claimType, setClaimType] = useState<'damage' | 'loss' | ''>('');
  const [tracking, setTracking] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [claimId, setClaimId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const inputCls = "w-full h-11 px-3.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium";
  const labelCls = "text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CLM-${Math.floor(1000000 + Math.random() * 9000000)}`;
    setClaimId(id);
    setSubmitted(true);
    activityService.log(
      'claim',
      'claim',
      `Claim ${id}: ${claimType === 'damage' ? 'Damaged' : 'Lost'} shipment ${tracking}`,
      `${description.slice(0, 160)}${description.length > 160 ? '…' : ''} — Filed by ${name} (${email})`,
      { tracking, value: `$${value}`, claimType: claimType || '' }
    );
  };

  return (
    <div>
      <PageHero
        title="File a Claim"
        subtitle="Submit claims for lost or damaged shipments. Claims must be filed within 60 calendar days of the shipment date."
        breadcrumb={[{ label: 'Support', to: '/support' }, { label: 'File a Claim' }]}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {submitted ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <h2 className="text-xl font-bold text-gray-900">Claim submitted</h2>
            <p className="text-sm text-gray-600">
              Your claim reference number is <span className="font-mono font-bold text-[#4D148C]">{claimId}</span>.
              You'll receive a confirmation email, and a claims specialist will review your case within 5-7 business days.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left text-xs text-gray-600 space-y-1">
              <div><strong>Type:</strong> {claimType === 'damage' ? 'Damaged shipment' : 'Lost shipment'}</div>
              <div><strong>Tracking #:</strong> {tracking}</div>
              <div><strong>Declared value:</strong> ${value}</div>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className={step === 1 ? 'text-[#4D148C]' : 'text-emerald-600'}>1. Shipment</span>
              <span className="text-gray-300">→</span>
              <span className={step === 2 ? 'text-[#4D148C]' : 'text-gray-400'}>2. Details</span>
              <span className="text-gray-300">→</span>
              <span className={step === 3 ? 'text-[#4D148C]' : 'text-gray-400'}>3. Contact</span>
            </div>

            {step === 1 && (
              <>
                <div>
                  <label className={labelCls}>Claim Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'damage', label: 'Damaged Shipment', desc: 'Package arrived damaged' },
                      { id: 'loss', label: 'Lost Shipment', desc: 'Package never arrived' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setClaimType(opt.id as 'damage' | 'loss')}
                        className={`p-4 rounded-lg border-2 text-left transition-colors ${
                          claimType === opt.id ? 'border-[#4D148C] bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-bold text-gray-900">{opt.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Tracking Number</label>
                  <input type="text" value={tracking} onChange={(e) => setTracking(e.target.value)} className={inputCls} placeholder="e.g. 7946 9852 1011" required />
                </div>
                <button
                  type="button"
                  onClick={() => claimType && tracking.trim() ? setStep(2) : alert('Select a claim type and enter the tracking number.')}
                  className="w-full py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors inline-flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className={labelCls}>Describe What Happened</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none"
                    placeholder={claimType === 'damage' ? 'Describe the damage to the package and contents, including packaging condition...' : 'Describe when the package was expected, last tracking update, and delivery attempts...'}
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>Declared Value of Contents ($)</label>
                  <input type="number" min="1" step="0.01" value={value} onChange={(e) => setValue(e.target.value)} className={inputCls} placeholder="199.99" required />
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed flex items-start gap-1.5">
                  <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  For damage claims, you may be asked to provide photos of the packaging and contents, plus proof of value (receipt or invoice).
                </p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold text-sm rounded transition-colors">Back</button>
                  <button
                    type="button"
                    onClick={() => description.trim() && value ? setStep(3) : alert('Please complete the description and declared value.')}
                    className="flex-1 py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className={labelCls}>Your Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Full name" required />
                </div>
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" required />
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-1">
                  <div className="font-bold text-gray-800 uppercase tracking-wider text-[11px] mb-1">Claim Summary</div>
                  <div><strong>Type:</strong> {claimType === 'damage' ? 'Damaged shipment' : 'Lost shipment'}</div>
                  <div><strong>Tracking #:</strong> {tracking}</div>
                  <div><strong>Declared value:</strong> ${value}</div>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold text-sm rounded transition-colors">Back</button>
                  <button type="submit" className="flex-1 py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors">
                    Submit Claim
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
