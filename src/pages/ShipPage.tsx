import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { shipService, ShipmentRecord } from '../services/shipService';
import { activityService } from '../services/activityService';
import { emailService } from '../services/emailService';
import { PageHero } from '../components/Page/PageHero';
import { Send, Printer, CheckCircle2, Package, ArrowRight, Download } from 'lucide-react';

interface AddressForm {
  name: string;
  street: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
}

const EMPTY_ADDRESS: AddressForm = { name: '', street: '', city: '', zip: '', phone: '', email: '' };

const SERVICES = [
  { name: 'FedEx First Overnight®', eta: 'Tomorrow by 8:00 AM', base: 78 },
  { name: 'FedEx Priority Overnight®', eta: 'Tomorrow by 10:30 AM', base: 58 },
  { name: 'FedEx 2Day®', eta: '2 business days', base: 32 },
  { name: 'FedEx Ground®', eta: '2-3 business days', base: 14 },
];

const PACKAGING = ['FedEx Envelope', 'FedEx Pak', 'FedEx Box', 'Your Packaging'];

const Barcode: React.FC<{ value: string }> = ({ value }) => {
  const bars = React.useMemo(() => {
    let seed = 0;
    for (let i = 0; i < value.length; i++) seed = (seed * 31 + value.charCodeAt(i)) >>> 0;
    const out: { x: number; w: number; h: number }[] = [];
    let x = 0;
    for (let i = 0; i < 96; i++) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      const w = 1 + (seed % 3);
      const h = 60;
      out.push({ x, w, h });
      x += w + 1 + (seed % 3);
    }
    return { bars: out, width: x };
  }, [value]);

  return (
    <svg viewBox={`0 0 ${bars.width} 70`} className="w-full h-16" role="img" aria-label="Label barcode">
      <rect width="100%" height="70" fill="#fff" />
      {bars.bars.map((b, i) => (
        <rect key={i} x={b.x} y={5} width={b.w} height={b.h} fill="#000" />
      ))}
    </svg>
  );
};

export const ShipPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const presetService = searchParams.get('service') || '';
  const presetPrice = searchParams.get('price');
  const isReturnFlow = searchParams.get('return') === '1';

  const [step, setStep] = useState(1);
  const [from, setFrom] = useState<AddressForm>(EMPTY_ADDRESS);
  const [to, setTo] = useState<AddressForm>(EMPTY_ADDRESS);
  const [weight, setWeight] = useState(Number(searchParams.get('weight')) || 3);
  const [packaging, setPackaging] = useState('FedEx Box');
  const [service, setService] = useState(presetService || SERVICES[1].name);
  const [reference, setReference] = useState('');
  const [created, setCreated] = useState<ShipmentRecord | null>(null);

  // Prefill from rates page
  React.useEffect(() => {
    const f = searchParams.get('from');
    const t = searchParams.get('to');
    if (f) setFrom((prev) => ({ ...prev, zip: f }));
    if (t) setTo((prev) => ({ ...prev, zip: t }));
  }, [searchParams]);

  const selectedService = SERVICES.find(s => s.name === service) || SERVICES[1];
  const price = presetPrice ? Number(presetPrice) : Math.round((selectedService.base + weight * 3.2) * 100) / 100;

  const addressValid = (a: AddressForm) => a.name.trim() && a.street.trim() && a.city.trim() && /^\d{5}/.test(a.zip) && /^\S+@\S+\.\S+$/.test(a.email);

  const inputCls = "w-full h-11 px-3.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium";
  const labelCls = "text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5";

  const AddressFields: React.FC<{ value: AddressForm; onChange: (v: AddressForm) => void; prefix: string }> = ({ value, onChange, prefix }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <label className={labelCls}>{prefix} Name</label>
        <input type="text" value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} className={inputCls} placeholder="Full name or company" />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>{prefix} Street Address</label>
        <input type="text" value={value.street} onChange={(e) => onChange({ ...value, street: e.target.value })} className={inputCls} placeholder="Street address" />
      </div>
      <div>
        <label className={labelCls}>City</label>
        <input type="text" value={value.city} onChange={(e) => onChange({ ...value, city: e.target.value })} className={inputCls} placeholder="City" />
      </div>
      <div>
        <label className={labelCls}>ZIP Code</label>
        <input type="text" value={value.zip} onChange={(e) => onChange({ ...value, zip: e.target.value })} className={inputCls} placeholder="12345" maxLength={10} />
      </div>
      <div>
        <label className={labelCls}>Email (for tracking notifications)</label>
        <input type="email" value={value.email} onChange={(e) => onChange({ ...value, email: e.target.value })} className={inputCls} placeholder="name@example.com" />
      </div>
      <div>
        <label className={labelCls}>Phone (for delivery notifications)</label>
        <input type="tel" value={value.phone} onChange={(e) => onChange({ ...value, phone: e.target.value })} className={inputCls} placeholder="(555) 123-4567" />
      </div>
    </div>
  );

  const submitShipment = () => {
    const record = shipService.createShipment({
      fromName: from.name,
      fromStreet: from.street,
      fromCity: from.city,
      fromZip: from.zip,
      fromEmail: from.email,
      toName: to.name,
      toStreet: to.street,
      toCity: to.city,
      toZip: to.zip,
      toEmail: to.email,
      service,
      packaging,
      weightLbs: weight,
      price,
      deliveryEstimate: selectedService.eta,
      isReturn: isReturnFlow
    });
    setCreated(record);
    setStep(4);
    activityService.log(
      'order',
      isReturnFlow ? 'return' : 'shipment',
      `${isReturnFlow ? 'Return shipment' : 'New shipment'} ${record.trackingNumber}`,
      `${from.name} (${from.city} ${from.zip}) → ${to.name} (${to.city} ${to.zip})`,
      { service, weightLbs: weight, price: `$${price.toFixed(2)}` }
    );
    void emailService.notifyShipment({
      trackingNumber: record.trackingNumber,
      status: 'Pending',
      statusDescription: record.isReturn ? 'Return label created - awaiting drop-off' : 'Label created - awaiting pickup or drop-off',
      senderName: record.fromName,
      senderEmail: record.fromEmail || '',
      recipientName: record.toName,
      recipientEmail: record.toEmail || '',
      origin: record.fromCity,
      destination: record.toCity,
      service: record.service,
      eta: record.deliveryEstimate,
      action: 'created'
    });
  };

  const steps = [
    { n: 1, label: isReturnFlow ? 'Return From' : 'From' },
    { n: 2, label: isReturnFlow ? 'Return To' : 'To' },
    { n: 3, label: 'Service & Pay' },
    { n: 4, label: 'Label' },
  ];

  return (
    <div>
      <PageHero
        title={isReturnFlow ? 'Create a Return Shipment' : 'Create a Shipment'}
        subtitle="Create a shipping label, pay online, and print — in minutes. Drop off at any FedEx location or schedule a pickup."
        breadcrumb={[{ label: 'Shipping', to: '/shipping' }, { label: isReturnFlow ? 'Manage a Return' : 'Create a Shipment' }]}
      />

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <React.Fragment key={s.n}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
                  step > s.n
                    ? 'bg-[#4D148C] border-[#4D148C] text-white'
                    : step === s.n
                      ? 'border-[#4D148C] text-[#4D148C] bg-purple-50'
                      : 'border-gray-300 text-gray-400'
                }`}>
                  {step > s.n ? <CheckCircle2 className="w-5 h-5" /> : s.n}
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-wide ${step >= s.n ? 'text-[#4D148C]' : 'text-gray-400'}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${step > s.n ? 'bg-[#4D148C]' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: From */}
        {step === 1 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
            <h2 className="text-lg font-bold text-gray-900">{isReturnFlow ? 'Where is the package coming from?' : 'Who is sending this shipment?'}</h2>
            <AddressFields value={from} onChange={setFrom} prefix={isReturnFlow ? 'Sender' : 'Shipper'} />
            <div className="flex justify-end">
              <button
                onClick={() => addressValid(from) ? setStep(2) : alert('Please complete name, street, city, and a valid 5-digit ZIP.')}
                className="py-3 px-8 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors inline-flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: To */}
        {step === 2 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
            <h2 className="text-lg font-bold text-gray-900">{isReturnFlow ? 'Where should the return go?' : 'Who is receiving this shipment?'}</h2>
            <AddressFields value={to} onChange={setTo} prefix="Recipient" />
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="py-3 px-6 text-sm font-bold text-gray-600 hover:text-[#4D148C]">Back</button>
              <button
                onClick={() => addressValid(to) ? setStep(3) : alert('Please complete name, street, city, and a valid 5-digit ZIP.')}
                className="py-3 px-8 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors inline-flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Service & Pay */}
        {step === 3 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Package & Service Selection</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Weight (lbs)</label>
                <input type="number" min="0.5" step="0.5" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Packaging</label>
                <select value={packaging} onChange={(e) => setPackaging(e.target.value)} className={inputCls}>
                  {PACKAGING.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls}>Shipment Reference (optional)</label>
              <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} className={inputCls} placeholder="e.g. Order #12345" />
            </div>

            <div>
              <label className={labelCls}>Select Service</label>
              <div className="space-y-2.5">
                {SERVICES.map(s => {
                  const sPrice = Math.round((s.base + weight * (s.name.includes('Ground') ? 1.8 : 3.2)) * 100) / 100;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setService(s.name)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 text-left transition-colors ${
                        service === s.name ? 'border-[#4D148C] bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-gray-900">{s.name}</div>
                        <div className="text-xs text-gray-500">Delivery: {s.eta}</div>
                      </div>
                      <div className="text-lg font-black text-[#4D148C]">${sPrice.toFixed(2)}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-700">Total (card on file)</span>
              <span className="text-2xl font-black text-[#4D148C]">${price.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="py-3 px-6 text-sm font-bold text-gray-600 hover:text-[#4D148C]">Back</button>
              <button
                onClick={submitShipment}
                className="py-3 px-8 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors inline-flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Pay & Create Label
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Label */}
        {step === 4 && created && (
          <div className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <h2 className="text-base font-bold text-emerald-900">Shipment created successfully!</h2>
                <p className="text-xs text-emerald-800 mt-0.5">
                  {isReturnFlow ? 'Your return label is ready. Email a copy to your customer or print it now.' : 'Your label is ready. Print it and attach to your package.'}
                  {emailService.isConfigured() && ' Tracking notifications were emailed to the sender and recipient.'}
                </p>
              </div>
            </div>

            {/* Printable label */}
            <div id="fedex-label" className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 space-y-4">
              <div className="flex items-start justify-between border-b-2 border-black pb-3">
                <div className="font-black text-3xl tracking-tighter">
                  <span className="text-[#4D148C]">Fed</span><span className="text-[#FF6600]">Ex</span>
                </div>
                <div className="text-right text-xs">
                  <div className="font-bold uppercase tracking-wider">{created.service}</div>
                  <div className="text-gray-500">{created.deliveryEstimate}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="font-black uppercase text-gray-400 tracking-wider border-b border-gray-200 pb-1 mb-1">From</div>
                  <div className="font-bold text-gray-900">{created.fromName}</div>
                  <div className="text-gray-600">{from.street}</div>
                  <div className="text-gray-600">{from.city}, {from.zip}</div>
                </div>
                <div>
                  <div className="font-black uppercase text-gray-400 tracking-wider border-b border-gray-200 pb-1 mb-1">To</div>
                  <div className="font-bold text-gray-900">{created.toName}</div>
                  <div className="text-gray-600">{to.street}</div>
                  <div className="text-gray-600">{to.city}, {to.zip}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs border-y-2 border-black py-3">
                <div><span className="font-black uppercase text-gray-400 block">Weight</span>{created.weightLbs.toFixed(1)} lbs</div>
                <div><span className="font-black uppercase text-gray-400 block">Packaging</span>{created.packaging}</div>
                <div><span className="font-black uppercase text-gray-400 block">Total Charged</span>${created.price.toFixed(2)}</div>
              </div>

              <div className="text-center space-y-2">
                <div className="font-mono font-bold text-lg tracking-[0.2em]">{created.trackingNumber}</div>
                <Barcode value={created.trackingNumber} />
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">*{created.trackingNumber}*</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-[#4D148C] hover:bg-[#330066] text-white font-bold text-sm rounded transition-colors inline-flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print Label
              </button>
              <Link
                to={`/tracking?number=${created.trackingNumber}`}
                className="flex-1 py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors inline-flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" /> Track This Shipment
              </Link>
              <Link
                to="/account"
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded transition-colors inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> My Shipments
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
