import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { activityService } from '../../services/activityService';
import { authService } from '../../services/authService';
import { LayoutDashboard, Plus, LogOut, Map, ExternalLink, Inbox } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [authed, setAuthed] = useState(adminService.isAuthenticated());

  useEffect(() => {
    const update = () => setUnread(activityService.unreadCount());
    update();
    const id = setInterval(update, 3000);
    return () => clearInterval(id);
  }, []);

  if (!authed) {
    return <AdminLoginInline onSuccess={() => setAuthed(true)} />;
  }

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded transition-colors ${
      isActive ? 'bg-[#FF6600] text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin top bar */}
      <div className="bg-[#1a1a2e] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="font-black text-2xl tracking-tighter">
              <span className="text-white">Fed</span><span className="text-[#FF6600]">Ex</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#FF6600] text-white px-2 py-1 rounded">
              Admin Console
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1.5 px-3 py-2">
              <ExternalLink className="w-3.5 h-3.5" /> View Site
            </Link>
            <button
              onClick={() => { adminService.logout(); setAuthed(false); navigate('/admin'); }}
              className="text-xs font-bold text-red-300 hover:text-white hover:bg-red-500/20 px-3 py-2 rounded flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <nav className="bg-[#1a1a2e] rounded-xl p-3 space-y-1 lg:sticky lg:top-24">
            <NavLink to="/admin" end className={linkCls}>
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </NavLink>
            <NavLink to="/admin/new" className={linkCls}>
              <Plus className="w-4 h-4" /> Create Shipment
            </NavLink>
            <NavLink to="/admin/live-map" className={linkCls}>
              <Map className="w-4 h-4" /> Live Map
            </NavLink>
            <NavLink to="/admin/activity" className={linkCls}>
              <Inbox className="w-4 h-4" />
              <span className="flex-1 text-left">Inbox</span>
              {unread > 0 && (
                <span className="bg-[#FF6200] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{unread}</span>
              )}
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AdminLoginInline: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    // Firebase-backed admin accounts
    if (authService.backend === 'firebase' && email.trim()) {
      try {
        const user = await authService.signIn(email.trim(), password);
        if (!(await authService.isAdminEmail(user.email))) {
          await authService.signOut();
          setError('This account does not have admin access.');
          setBusy(false);
          return;
        }
        adminService.startSession();
        onSuccess();
        return;
      } catch (err: any) {
        setError(err?.message || 'Login failed.');
        setBusy(false);
        return;
      }
    }

    // Local fallback password
    if (adminService.login(password)) {
      onSuccess();
    } else {
      setError('Incorrect credentials.');
    }
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm">
        <div className="font-black text-3xl tracking-tighter mb-1">
          <span className="text-[#4D148C]">Fed</span><span className="text-[#FF6600]">Ex</span>
        </div>
        <h1 className="text-lg font-bold text-gray-900">Admin Console</h1>
        <p className="text-xs text-gray-500 mt-1 mb-6">Manage shipments, tracking numbers, and live network status.</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-3.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium"
              placeholder="admin@fedex.com"
              autoFocus
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-3.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 bg-[#FF6200] hover:bg-[#E05500] disabled:opacity-60 text-white font-bold text-sm rounded transition-colors"
          >
            {busy ? 'Authenticating...' : 'LOG IN'}
          </button>
        </form>

        <p className="text-[11px] text-gray-400 mt-4 text-center leading-relaxed">
          {authService.backend === 'firebase'
            ? <>Admin account: <code className="font-mono font-bold text-[#4D148C]">admin@fedex.com</code><br />Add more admins via the Firestore <code className="font-mono">admins</code> collection (doc ID = email).</>
            : <>Demo password: <code className="font-mono font-bold text-[#4D148C]">admin123</code></>}
        </p>
      </div>
    </div>
  );
};
