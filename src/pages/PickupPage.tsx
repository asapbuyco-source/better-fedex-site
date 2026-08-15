import React, { useState } from 'react';
import { PageHero } from '../components/Page/PageHero';
import { Truck, CheckCircle2 } from 'lucide-react';
import { activityService } from '../services/activityService';

export const PickupPage: React.FC = () => {
  const [scheduled, setScheduled] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [form, setForm] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
    phone: '',
    date: '',
    window: '9:00 AM - 1:00 PM',
    service: 'FedEx Express®',
    packages: 1,
    location: 'Front door'
  });

  const inputCls = "w-full h-11 px-3.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium";
  const labelCls = "text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.street || !form.city || !/^\d{5}/.test(form.zip) || !form.date) {
      alert('Please complete pickup address, phone, and date.');
      return;
    }
    setConfirmation(`PKP-${Math.floor(100000 + Math.random() * 900000)}`);
    setScheduled(true);
    activityService.log(
      'order',
      'pickup',
      `Pickup scheduled: ${form.name}`,
      `${form.street}, ${form.city} ${form.zip} — ${form.date} (${form.window}), ${form.packages} pkg, ${form.service}`,
      { packages: form.packages, service: form.service }
    );
  };

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return (
    <div>
      <PageHero
        title="Schedule & Manage Pickups"
        subtitle="A FedEx courier can pick up your shipments at your home or office — no drop-off needed."
        breadcrumb={[{ label: 'Shipping', to: '/shipping' }, { label: 'Schedule a Pickup' }]}
      >
        <div
          className="rounded-xl h-40 md:h-52 bg-cover bg-center border border-gray-200 shadow-lg"
          style={{ backgroundImage: "url('/images/fedex-truck.jpg')" }}
          role="img"
          aria-label="FedEx truck on route"
        />
      </PageHero>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {scheduled ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <h2 className="text-xl font-bold text-gray-900">Pickup scheduled</h2>
            <p className="text-sm text-gray-600">
              Confirmation <span className="font-mono font-bold text-[#4D148C]">{confirmation}</span> — a courier will arrive
              on <strong>{new Date(form.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong> between <strong>{form.window}</strong>.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left text-xs text-gray-600 space-y-1">
              <div><strong>Pickup address:</strong> {form.street}, {form.city} {form.zip}</div>
              <div><strong>Service:</strong> {form.service} • {form.packages} package(s)</div>
              <div><strong>Package location:</strong> {form.location}</div>
            </div>
            <button onClick={() => setScheduled(false)} className="text-xs font-bold text-[#0068A8] hover:underline">Schedule another pickup</button>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#4D148C]" /> Pickup Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelCls}>Contact Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Full name" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Pickup Street Address</label>
                <input type="text" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className={inputCls} placeholder="Street address" />
              </div>
              <div>
                <label className={labelCls}>City</label>
                <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} placeholder="City" />
              </div>
              <div>
                <label className={labelCls}>ZIP Code</label>
                <input type="text" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className={inputCls} placeholder="12345" maxLength={10} />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="(555) 123-4567" />
              </div>
              <div>
                <label className={labelCls}>Pickup Date</label>
                <input type="date" min={tomorrow} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Time Window</label>
                <select value={form.window} onChange={(e) => setForm({ ...form, window: e.target.value })} className={inputCls}>
                  <option>9:00 AM - 1:00 PM</option>
                  <option>1:00 PM - 5:00 PM</option>
                  <option>5:00 PM - 8:00 PM</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Service</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputCls}>
                  <option>FedEx Express®</option>
                  <option>FedEx Ground®</option>
                  <option>FedEx Freight®</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Number of Packages</label>
                <input type="number" min="1" max="30" value={form.packages} onChange={(e) => setForm({ ...form, packages: Number(e.target.value) })} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Package Location</label>
                <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls}>
                  <option>Front door</option>
                  <option>Reception / front desk</option>
                  <option>Side door</option>
                  <option>Mailroom / loading dock</option>
                </select>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed">
              Express pickups are free for account holders. Ground pickups incur a fee per package. Courier arrival windows are estimates.
            </p>

            <button type="submit" className="w-full py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors">
              SCHEDULE PICKUP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
