import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { shipService } from '../services/shipService';
import { trackingService } from '../services/trackingService';
import { activityService } from '../services/activityService';
import { authService } from '../services/authService';
import { PageHero } from '../components/Page/PageHero';
import { User, Package, MapPin, CreditCard, Bell, LogOut, Send, Plus } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { currentUser, login, logout, openAuth } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const shipments = shipService.getShipments();
  const history = trackingService.getHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || password.length < 6) {
      setError('Please enter a valid email and a password of at least 6 characters.');
      return;
    }
    setBusy(true);
    try {
      const user = mode === 'signup'
        ? await authService.signUp(email.trim(), password, name.trim() || email.split('@')[0])
        : await authService.signIn(email.trim(), password);
      login(user.displayName, user.email);
      activityService.log(
        'account',
        mode,
        mode === 'signup' ? `New account: ${user.displayName}` : `Login: ${user.displayName}`,
        user.email
      );
    } catch (err: any) {
      setError(err?.message || 'Authentication failed.');
    } finally {
      setBusy(false);
    }
  };

  const inputCls = "w-full h-12 px-3.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium";

  if (!currentUser) {
    return (
      <div>
        <PageHero title="Sign Up or Log In" subtitle="Access your shipping history, saved addresses, and discounted account rates." breadcrumb={[{ label: 'Account' }]} />
        <div className="max-w-md mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex border-b border-gray-200 mb-6">
              {(['login', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 pb-3 text-sm font-bold border-b-[3px] transition-colors ${
                    mode === m ? 'border-[#4D148C] text-[#4D148C]' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {m === 'login' ? 'LOG IN' : 'SIGN UP'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Jordan Smith" />
                </div>
              )}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="••••••••" required />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700 font-bold">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={busy}
                className="w-full py-3 bg-[#FF6200] hover:bg-[#E05500] disabled:opacity-60 text-white font-bold text-sm rounded transition-colors"
              >
                {busy ? 'Please wait...' : mode === 'login' ? 'LOG IN' : 'CREATE FREE ACCOUNT'}
              </button>
            </form>

            {mode === 'signup' && (
              <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
                By creating an account you unlock up to 40% off FedEx Express® and 20% off FedEx Ground® published rates.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero title={`Welcome, ${currentUser}`} subtitle="Manage your shipments, addresses, and account preferences." breadcrumb={[{ label: 'Account' }]} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#4D148C] text-white font-bold text-lg flex items-center justify-center">
                {currentUser.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">{currentUser}</div>
                <div className="text-xs text-emerald-600 font-bold">Account #5820-4471</div>
              </div>
            </div>

            <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden text-sm">
              {[
                { label: 'My Shipments', icon: Package },
                { label: 'Recent Tracking', icon: MapPin },
                { label: 'Addresses', icon: MapPin },
                { label: 'Payment Methods', icon: CreditCard },
                { label: 'Notifications', icon: Bell },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 last:border-b-0 text-gray-700 font-semibold hover:bg-purple-50 hover:text-[#4D148C] transition-colors cursor-pointer">
                  <item.icon className="w-4 h-4 text-[#4D148C]" /> {item.label}
                </div>
              ))}
              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-red-600 font-semibold hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </nav>
          </div>

          {/* Main panel */}
          <div className="lg:col-span-9 space-y-6">
            {/* Quick actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/shipping/ship" className="bg-[#4D148C] hover:bg-[#330066] text-white rounded-xl p-5 transition-colors">
                <Send className="w-6 h-6 mb-2 text-[#FF6600]" />
                <div className="text-sm font-bold">Create a Shipment</div>
                <div className="text-xs text-purple-200 mt-0.5">Ship with account discounts</div>
              </Link>
              <Link to="/shipping/pickups" className="bg-white hover:border-[#4D148C] text-gray-800 rounded-xl border border-gray-200 p-5 transition-colors">
                <Plus className="w-6 h-6 mb-2 text-[#4D148C]" />
                <div className="text-sm font-bold">Schedule a Pickup</div>
                <div className="text-xs text-gray-500 mt-0.5">We come to you</div>
              </Link>
              <Link to="/shipping/rates" className="bg-white hover:border-[#4D148C] text-gray-800 rounded-xl border border-gray-200 p-5 transition-colors">
                <CreditCard className="w-6 h-6 mb-2 text-[#4D148C]" />
                <div className="text-sm font-bold">Estimate Rates</div>
                <div className="text-xs text-gray-500 mt-0.5">Compare services</div>
              </Link>
            </div>

            {/* Shipments */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">My Shipments</h2>
                <Link to="/shipping/ship" className="text-xs font-bold text-[#0068A8] hover:underline">+ New shipment</Link>
              </div>
              {shipments.length === 0 ? (
                <div className="p-10 text-center">
                  <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No shipments yet. <Link to="/shipping/ship" className="text-[#0068A8] font-bold hover:underline">Create your first shipment</Link>.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {shipments.map((s) => (
                    <div key={s.trackingNumber} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50 transition-colors">
                      <div>
                        <div className="font-mono font-bold text-sm text-gray-900">{s.trackingNumber}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {s.fromCity} → {s.toCity} • {s.service} • {new Date(s.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-[#4D148C]">${s.price.toFixed(2)}</span>
                        <Link
                          to={`/tracking?number=${s.trackingNumber}`}
                          className="text-xs font-bold text-[#0068A8] hover:underline whitespace-nowrap"
                        >
                          Track →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tracking history */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Recent Tracking</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {history.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/tracking?number=${item.number}`}
                    className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-mono font-bold text-sm text-gray-800">{item.number}</span>
                    <span className="text-xs text-gray-500">{item.status} • {item.date}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Profile card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-[#4D148C]" />
                <div>
                  <div className="text-sm font-bold text-gray-900">{currentUser}</div>
                  <div className="text-xs text-gray-500">Account holder • United States</div>
                </div>
              </div>
              <button
                onClick={() => openAuth('login')}
                className="text-xs font-bold text-[#0068A8] hover:underline"
              >
                Edit profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
