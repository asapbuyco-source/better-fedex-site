import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHero } from '../components/Page/PageHero';
import { Bell, MapPin, Camera, Home, Clock, CheckCircle2 } from 'lucide-react';

export const DeliveryManagerPage: React.FC = () => {
  const { currentUser, openAuth } = useApp();
  const [enrolled, setEnrolled] = useState(!!currentUser);
  const [name, setName] = useState(currentUser || '');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const [prefs, setPrefs] = useState({
    notifications: { preDelivery: true, dayOf: true, delivered: true },
    instructions: 'Leave at front door',
    holdAtLocation: 'Walgreens (0.4 mi)',
    vacationHold: false,
    pictureProof: true,
    deliveryWindow: 'Any time'
  });

  const inputCls = "w-full h-11 px-3.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium";
  const labelCls = "text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5";

  const enroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim() || !email.trim()) {
      alert('Please complete name, delivery address, and email.');
      return;
    }
    setEnrolled(true);
  };

  return (
    <div>
      <PageHero
        title="FedEx Delivery Manager®"
        subtitle="Take control of your home deliveries — get alerts, leave instructions, hold packages, and request picture proof of delivery. Free."
        breadcrumb={[{ label: 'Delivery Manager' }]}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        {!enrolled ? (
          <div className="max-w-lg mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Enroll for Free</h2>
            <p className="text-xs text-gray-500 mb-5">Customize deliveries to your home address in the U.S.</p>
            <form onSubmit={enroll} className="space-y-4">
              <div>
                <label className={labelCls}>Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Jordan Smith" />
              </div>
              <div>
                <label className={labelCls}>Home Delivery Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} placeholder="Street, City, ZIP" />
              </div>
              <div>
                <label className={labelCls}>Email for Alerts</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors">
                ENROLL FREE
              </button>
              {currentUser && <p className="text-[11px] text-center text-gray-400">Signed in as {currentUser}</p>}
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Preferences */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-4">
                  <Bell className="w-4 h-4 text-[#4D148C]" /> Delivery Notifications
                </h2>
                <div className="space-y-3">
                  {[
                    { key: 'preDelivery' as const, label: 'Pre-delivery alert', desc: 'Know when a package is on the way' },
                    { key: 'dayOf' as const, label: 'Day-of-delivery alert', desc: 'Estimated window on delivery day' },
                    { key: 'delivered' as const, label: 'Delivered confirmation', desc: 'Confirmation when packages arrive' }
                  ].map(n => (
                    <label key={n.key} className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                      <div>
                        <div className="text-sm font-bold text-gray-900">{n.label}</div>
                        <div className="text-xs text-gray-500">{n.desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={prefs.notifications[n.key]}
                        onChange={(e) => setPrefs({ ...prefs, notifications: { ...prefs.notifications, [n.key]: e.target.checked } })}
                        className="accent-[#4D148C] w-5 h-5 shrink-0"
                      />
                    </label>
                  ))}
                  <label className="flex items-center justify-between gap-3 p-3 bg-purple-50 rounded-lg cursor-pointer border border-purple-100">
                    <div>
                      <div className="text-sm font-bold text-[#4D148C] flex items-center gap-1.5">
                        <Camera className="w-4 h-4" /> Picture proof of delivery
                      </div>
                      <div className="text-xs text-purple-900/70">See a photo when we leave your package</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={prefs.pictureProof}
                      onChange={(e) => setPrefs({ ...prefs, pictureProof: e.target.checked })}
                      className="accent-[#4D148C] w-5 h-5 shrink-0"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#4D148C]" /> Delivery Preferences
                </h2>
                <div>
                  <label className={labelCls}>Leave Delivery Instructions</label>
                  <select
                    value={prefs.instructions}
                    onChange={(e) => setPrefs({ ...prefs, instructions: e.target.value })}
                    className={inputCls}
                  >
                    <option>Leave at front door</option>
                    <option>Leave at side door</option>
                    <option>Leave at back door</option>
                    <option>Deliver to recipient only</option>
                    <option>Leave with concierge / front desk</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Preferred Delivery Window</label>
                  <select
                    value={prefs.deliveryWindow}
                    onChange={(e) => setPrefs({ ...prefs, deliveryWindow: e.target.value })}
                    className={inputCls}
                  >
                    <option>Any time</option>
                    <option>Morning (8 AM - 12 PM)</option>
                    <option>Afternoon (12 PM - 4 PM)</option>
                    <option>Evening (4 PM - 8 PM)</option>
                  </select>
                </div>
                <label className="flex items-center justify-between gap-3 p-3 bg-orange-50 rounded-lg cursor-pointer border border-orange-100">
                  <div>
                    <div className="text-sm font-bold text-orange-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> Vacation hold
                    </div>
                    <div className="text-xs text-orange-800/70">Pause deliveries while you're away</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={prefs.vacationHold}
                    onChange={(e) => setPrefs({ ...prefs, vacationHold: e.target.checked })}
                    className="accent-[#FF6600] w-5 h-5 shrink-0"
                  />
                </label>
              </div>
            </div>

            {/* Side */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-[#4D148C] to-[#330066] text-white rounded-xl p-6">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4" /> Enrolled
                </div>
                <h3 className="text-base font-bold">Welcome, {name || currentUser}</h3>
                <p className="text-xs text-purple-200 mt-1">{address || 'Your delivery address'}</p>

                <div className="mt-4 pt-4 border-t border-white/15 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Hold-at-location preference</span>
                    <span className="font-bold flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {prefs.holdAtLocation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Picture proof</span>
                    <span className="font-bold">{prefs.pictureProof ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Vacation hold</span>
                    <span className="font-bold">{prefs.vacationHold ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-sm font-bold text-gray-900">Track packages automatically</h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Delivery Manager watches for packages addressed to you — no tracking numbers needed.
                </p>
                <button
                  onClick={() => openAuth('login')}
                  className="mt-3 w-full py-2.5 border-2 border-[#4D148C] hover:bg-purple-50 text-[#4D148C] font-bold text-xs rounded transition-colors"
                >
                  View Incoming Packages
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
