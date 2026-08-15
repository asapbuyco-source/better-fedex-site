import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService, AdminShipment } from '../../services/adminService';
import { shipService } from '../../services/shipService';
import { Package, Truck, CheckCircle2, AlertTriangle, Clock, Plus, Map, Trash2, Pencil, Eye, FileText } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [shipments, setShipments] = useState<AdminShipment[]>(adminService.getAll());
  const [filter, setFilter] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const userShipments = shipService.getShipments().length;

  useEffect(() => {
    (async () => {
      await adminService.syncFromFirebase();
      setShipments(adminService.getAll());
    })();
  }, []);

  const refresh = () => setShipments(adminService.getAll());
  const stats = adminService.stats();

  const filtered = filter === 'All' ? shipments : shipments.filter(s => s.status === filter);

  const statCards = [
    { label: 'Total Shipments', value: stats.total, icon: Package, color: 'text-[#4D148C] bg-purple-50' },
    { label: 'In Transit', value: stats.inTransit, icon: Truck, color: 'text-blue-600 bg-blue-50' },
    { label: 'Out for Delivery', value: stats.outForDelivery, icon: Clock, color: 'text-orange-600 bg-orange-50' },
    { label: 'Delivered', value: stats.delivered, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Exceptions', value: stats.exception, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
    { label: 'Pending Pickup', value: stats.pending, icon: FileText, color: 'text-gray-600 bg-gray-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {statCards.map(card => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${card.color}`}>
              <card.icon className="w-4.5 h-4.5" />
            </div>
            <div className="text-2xl font-black text-gray-900">{card.value}</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-900">Shipment Management</h2>
        <div className="flex gap-2">
          <Link
            to="/admin/live-map"
            className="py-2.5 px-4 border-2 border-[#4D148C] text-[#4D148C] hover:bg-purple-50 font-bold text-xs rounded transition-colors inline-flex items-center gap-1.5"
          >
            <Map className="w-4 h-4" /> Live Map
          </Link>
          <Link
            to="/admin/new"
            className="py-2.5 px-4 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-xs rounded transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create Tracking Number
          </Link>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-1.5 flex-wrap text-xs">
        {['All', 'Pending', 'In Transit', 'Out for Delivery', 'Delivered', 'Exception'].map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-full font-bold transition-colors ${
              filter === t ? 'bg-[#4D148C] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              No admin shipments yet.{' '}
              <Link to="/admin/new" className="text-[#0068A8] font-bold hover:underline">Create your first tracking number</Link>.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Preset demo numbers have been removed. Create shipments above — they sync to Firestore and are trackable from any device. Customer-created shipments ({userShipments}) are also live on the network.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3 font-black">Tracking #</th>
                  <th className="px-4 py-3 font-black">Route</th>
                  <th className="px-4 py-3 font-black">Service</th>
                  <th className="px-4 py-3 font-black">Status</th>
                  <th className="px-4 py-3 font-black">ETA</th>
                  <th className="px-4 py-3 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(s => (
                  <tr key={s.trackingNumber} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono font-bold text-gray-900 whitespace-nowrap">{s.trackingNumber}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {s.origin.split(',')[0]} → {s.destination.split(',')[0]}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap hidden md:table-cell">{s.service}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap hidden lg:table-cell">{s.estimatedDelivery}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/tracking?number=${s.trackingNumber}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-gray-400 hover:text-[#0068A8] hover:bg-blue-50 rounded"
                          title="View on tracking page"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <Link
                          to={`/admin/edit/${s.trackingNumber}`}
                          className="p-2 text-gray-400 hover:text-[#4D148C] hover:bg-purple-50 rounded"
                          title="Edit / add events"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        {deleteConfirm === s.trackingNumber ? (
                          <span className="flex items-center gap-1">
                            <button
                              onClick={() => { adminService.deleteShipment(s.trackingNumber); setDeleteConfirm(null); refresh(); }}
                              className="px-2 py-1 bg-red-600 text-white font-bold rounded text-[10px]"
                            >
                              DELETE
                            </button>
                            <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-gray-200 text-gray-700 font-bold rounded text-[10px]">
                              NO
                            </button>
                          </span>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(s.trackingNumber)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export const StatusBadge: React.FC<{ status: AdminShipment['status'] }> = ({ status }) => {
  const map: Record<string, string> = {
    'Delivered': 'bg-emerald-100 text-emerald-800',
    'In Transit': 'bg-blue-100 text-blue-800',
    'Out for Delivery': 'bg-orange-100 text-orange-800',
    'Exception': 'bg-red-100 text-red-800',
    'Pending': 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
};
