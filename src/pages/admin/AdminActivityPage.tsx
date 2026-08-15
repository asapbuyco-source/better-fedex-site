import React, { useState, useEffect } from 'react';
import { activityService, ActivityEntry, ActivityType } from '../../services/activityService';
import { isFirebaseConfigured } from '../../utils/firebase';
import { Package, MessageSquare, User, FileText, Trash2, CheckCheck, Inbox, Cloud, CloudOff } from 'lucide-react';

const TYPE_META: Record<ActivityType, { label: string; icon: React.ComponentType<{ className?: string }>; cls: string }> = {
  order: { label: 'Order', icon: Package, cls: 'bg-purple-50 text-[#4D148C]' },
  message: { label: 'Message', icon: MessageSquare, cls: 'bg-blue-50 text-[#0068A8]' },
  account: { label: 'Account', icon: User, cls: 'bg-emerald-50 text-emerald-700' },
  claim: { label: 'Claim', icon: FileText, cls: 'bg-red-50 text-red-600' }
};

const SUBTYPE_LABELS: Record<string, string> = {
  shipment: 'Shipment Created',
  return: 'Return Shipment',
  print: 'Print Order',
  pickup: 'Pickup Scheduled',
  supplies: 'Supplies Order',
  chat: 'Virtual Assistant',
  contact: 'Contact Form',
  signup: 'Sign Up',
  login: 'Log In',
  claim: 'Claim Filed'
};

export const AdminActivityPage: React.FC = () => {
  const [entries, setEntries] = useState<ActivityEntry[]>([]);
  const [filter, setFilter] = useState<'all' | ActivityType>('all');
  const [syncing, setSyncing] = useState(false);
  const [firebaseOn] = useState(() => isFirebaseConfigured());

  const refresh = () => setEntries(activityService.getAll());

  useEffect(() => {
    refresh();
    (async () => {
      setSyncing(true);
      await activityService.syncFromFirebase();
      setSyncing(false);
      refresh();
    })();
  }, []);

  const filtered = filter === 'all' ? entries : entries.filter(e => e.type === filter);
  const unread = entries.filter(e => !e.read).length;

  const counts = {
    all: entries.length,
    order: entries.filter(e => e.type === 'order').length,
    message: entries.filter(e => e.type === 'message').length,
    account: entries.filter(e => e.type === 'account').length,
    claim: entries.filter(e => e.type === 'claim').length
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[#4D148C]" /> Site Activity Inbox
            {unread > 0 && (
              <span className="bg-[#FF6200] text-white text-[10px] font-black px-2 py-0.5 rounded-full">{unread} new</span>
            )}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Every order, message, and account action from the site lands here.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ${firebaseOn ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`} title={firebaseOn ? 'Firebase connected' : 'Running on local data only'}>
            {firebaseOn ? <Cloud className="w-3.5 h-3.5" /> : <CloudOff className="w-3.5 h-3.5" />}
            {syncing ? 'Syncing…' : firebaseOn ? 'Firebase connected' : 'Local only'}
          </span>
          {unread > 0 && (
            <button
              onClick={() => { activityService.markAllRead(); refresh(); }}
              className="py-2 px-3 border-2 border-gray-300 hover:border-[#4D148C] text-gray-700 hover:text-[#4D148C] font-bold text-[11px] rounded transition-colors inline-flex items-center gap-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Mark all read
            </button>
          )}
          <button
            onClick={() => { if (confirm('Clear ALL activity entries?')) { activityService.clearAll(); refresh(); } }}
            className="py-2 px-3 border-2 border-red-200 hover:border-red-400 text-red-600 font-bold text-[11px] rounded transition-colors inline-flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear all
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1.5 flex-wrap text-xs">
        {(['all', 'order', 'message', 'account', 'claim'] as const).map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-full font-bold capitalize transition-colors ${
              filter === t ? 'bg-[#4D148C] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {t === 'all' ? 'All' : TYPE_META[t].label}s <span className="opacity-60">({counts[t]})</span>
          </button>
        ))}
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No activity yet. Orders, chat messages, contact forms, and signups from the site will appear here in real time.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(entry => {
            const meta = TYPE_META[entry.type];
            const Icon = meta.icon;
            return (
              <div
                key={entry.id}
                className={`bg-white rounded-xl border p-4 flex items-start gap-4 transition-colors ${entry.read ? 'border-gray-200' : 'border-[#FF6600]/50 ring-1 ring-[#FF6600]/20'}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${meta.cls}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{entry.title}</span>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {SUBTYPE_LABELS[entry.subtype] || entry.subtype}
                    </span>
                    {!entry.read && <span className="w-2 h-2 rounded-full bg-[#FF6200]" />}
                    {entry.source === 'firebase' && (
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wide">remote</span>
                    )}
                  </div>

                  {entry.detail && <p className="text-xs text-gray-600 mt-1 leading-relaxed">{entry.detail}</p>}

                  {entry.meta && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {Object.entries(entry.meta).map(([k, v]) => (
                        <span key={k} className="text-[10px] bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded font-mono">
                          {k}: {String(v)}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="text-[10px] text-gray-400 mt-1.5 font-medium">
                    {new Date(entry.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </div>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  {!entry.read && (
                    <button
                      onClick={() => { activityService.markRead(entry.id); refresh(); }}
                      className="p-2 text-gray-400 hover:text-[#4D148C] hover:bg-purple-50 rounded"
                      title="Mark read"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => { activityService.delete(entry.id); refresh(); }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
