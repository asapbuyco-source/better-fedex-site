import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminService, AdminShipment, generateTrackingNumber } from '../../services/adminService';
import { TrackingEvent } from '../../services/trackingService';
import { emailService } from '../../services/emailService';
import { FACILITIES, getFacilityByCode, facilitiesByState } from '../../data/facilities';
import { Save, ArrowLeft, Plus, Trash2, RefreshCw, Zap } from 'lucide-react';

const SERVICES = [
  'FedEx First Overnight®',
  'FedEx Priority Overnight®',
  'FedEx Express Saver®',
  'FedEx 2Day®',
  'FedEx Ground®',
  'FedEx Home Delivery®',
  'FedEx Freight®'
];

const STATUS_OPTIONS: { status: AdminShipment['status']; color: AdminShipment['statusColor']; progress: number }[] = [
  { status: 'Pending', color: 'gray', progress: 5 },
  { status: 'In Transit', color: 'purple', progress: 50 },
  { status: 'Out for Delivery', color: 'orange', progress: 88 },
  { status: 'Delivered', color: 'green', progress: 100 },
  { status: 'Exception', color: 'red', progress: 45 },
];

const emptyForm: Omit<AdminShipment, 'createdAt'> = {
  trackingNumber: generateTrackingNumber(),
  status: 'In Transit',
  statusColor: 'purple',
  statusDescription: 'On FedEx vehicle for transport to regional hub',
  estimatedDelivery: 'Tomorrow by 10:30 AM',
  shipDate: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
  origin: 'MEMPHIS, TN US',
  destination: 'NEW YORK, NY US',
  service: 'FedEx Priority Overnight®',
  weight: '4.0 lbs / 1.81 kg',
  dimensions: '12 x 9 x 4 in',
  pieceCount: 1,
  progressPercent: 50,
  events: [],
  originCode: 'MEM',
  destCode: 'NYC',
  currentCode: 'MEM',
  recipientName: '',
  senderName: '',
  recipientEmail: '',
  senderEmail: '',
};

export const AdminShipmentFormPage: React.FC = () => {
  const { trackingNumber } = useParams();
  const navigate = useNavigate();
  const isEdit = !!trackingNumber;

  const existing = isEdit ? adminService.getByNumber(trackingNumber!) : null;
  const [form, setForm] = useState<Omit<AdminShipment, 'createdAt'>>(existing || { ...emptyForm });

  const [newEvent, setNewEvent] = useState<TrackingEvent>({
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    status: 'In transit at FedEx location',
    location: 'Memphis, TN',
    completed: true
  });

  const inputCls = "w-full h-10 px-3 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium";
  const labelCls = "text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-1";

  const set = <K extends keyof AdminShipment>(key: K, value: AdminShipment[K]) => setForm(f => ({ ...f, [key]: value }));

  const FacilityOptions: React.FC = () => (
    <>
      {Object.entries(facilitiesByState()).map(([state, facs]) => (
        <optgroup key={state} label={state}>
          {facs.map(f => <option key={f.code} value={f.code}>{f.code} — {f.city}</option>)}
        </optgroup>
      ))}
    </>
  );

  const handleStatusChange = (status: AdminShipment['status']) => {
    const opt = STATUS_OPTIONS.find(s => s.status === status)!;
    setForm(f => ({
      ...f,
      status,
      statusColor: opt.color,
      progressPercent: opt.progress
    }));
  };

  const handleFacility = (field: 'originCode' | 'destCode' | 'currentCode', code: string) => {
    const fac = getFacilityByCode(code);
    setForm(f => {
      const next = { ...f, [field]: code };
      if (field === 'originCode') next.origin = `${fac.city.toUpperCase()}, ${fac.state} US`;
      if (field === 'destCode') next.destination = `${fac.city.toUpperCase()}, ${fac.state} US`;
      return next;
    });
  };

  const addEvent = () => {
    if (!newEvent.status.trim()) return;
    setForm(f => ({
      ...f,
      events: [{ ...newEvent }, ...f.events],
      // Move current facility if event is at a known location
      currentCode: FACILITIES.find(fac => newEvent.location.toUpperCase().includes(fac.city.toUpperCase()))?.code || f.currentCode
    }));
  };

  const quickAdvance = (step: 'pickup' | 'transit' | 'out' | 'delivered' | 'exception') => {
    const now = new Date();
    const stamp = {
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    const dest = getFacilityByCode(form.destCode);
    const origin = getFacilityByCode(form.originCode);

    const presets: Record<string, { event: TrackingEvent; status: AdminShipment['status']; color: AdminShipment['statusColor']; progress: number; desc: string; code: string }> = {
      pickup: {
        event: { ...stamp, status: 'Picked up', location: `${origin.city}, ${origin.state}`, completed: true },
        status: 'In Transit', color: 'purple', progress: 25, desc: 'Package picked up by FedEx courier', code: origin.code
      },
      transit: {
        event: { ...stamp, status: 'In transit at FedEx hub location', location: `${origin.city}, ${origin.state}`, completed: true },
        status: 'In Transit', color: 'purple', progress: 55, desc: 'Sorted at regional hub, moving toward destination', code: origin.code
      },
      out: {
        event: { ...stamp, status: 'On FedEx vehicle for delivery', location: `${dest.city}, ${dest.state}`, completed: true },
        status: 'Out for Delivery', color: 'orange', progress: 88, desc: 'On courier truck scheduled for delivery today', code: dest.code
      },
      delivered: {
        event: { ...stamp, status: 'Delivered - Left at front door', location: `${dest.city}, ${dest.state}`, completed: true },
        status: 'Delivered', color: 'green', progress: 100, desc: 'Package delivered', code: dest.code
      },
      exception: {
        event: { ...stamp, status: 'Shipment exception - delivery attempted, recipient unavailable', location: `${dest.city}, ${dest.state}`, completed: false },
        status: 'Exception', color: 'red', progress: 60, desc: 'Delivery attempt failed - will retry next business day', code: dest.code
      }
    };

    const p = presets[step];
    setForm(f => ({
      ...f,
      events: [p.event, ...f.events],
      status: p.status,
      statusColor: p.color,
      progressPercent: p.progress,
      statusDescription: p.desc,
      currentCode: p.code
    }));
    notifyEmail(
      {
        ...form,
        status: p.status,
        statusColor: p.color,
        progressPercent: p.progress,
        statusDescription: p.desc,
        currentCode: p.code
      },
      'updated',
      `${p.event.status} — ${p.event.location}`
    );
  };

  const notifyEmail = (data: Omit<AdminShipment, 'createdAt'>, action: 'created' | 'updated', eventText?: string) => {
    void emailService.notifyShipment({
      trackingNumber: data.trackingNumber,
      status: data.status,
      statusDescription: data.statusDescription,
      senderName: data.senderName || 'Shipper',
      senderEmail: data.senderEmail || '',
      recipientName: data.recipientName || 'Recipient',
      recipientEmail: data.recipientEmail || '',
      origin: data.origin,
      destination: data.destination,
      service: data.service,
      eta: data.estimatedDelivery,
      eventText,
      action
    });
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{8,15}$/.test(form.trackingNumber)) {
      alert('Tracking number must be 8-15 digits.');
      return;
    }
    if (adminService.getByNumber(form.trackingNumber) && !isEdit) {
      alert('A shipment with this tracking number already exists.');
      return;
    }
    adminService.createShipment(form);
    notifyEmail(form, isEdit ? 'updated' : 'created');
    navigate('/admin');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin')} className="p-2 border border-gray-300 hover:bg-white rounded text-gray-600">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Shipment' : 'Create Tracking Number'}</h1>
            <p className="text-xs text-gray-500">{isEdit ? 'Update status or add tracking events' : 'Generate a live, trackable shipment'}</p>
          </div>
        </div>
        {isEdit && (
          <div className="flex flex-wrap gap-1.5">
            {[
              { key: 'pickup' as const, label: 'Picked Up' },
              { key: 'transit' as const, label: 'At Hub' },
              { key: 'out' as const, label: 'Out for Delivery' },
              { key: 'delivered' as const, label: 'Delivered' },
              { key: 'exception' as const, label: 'Exception' }
            ].map(b => (
              <button
                key={b.key}
                type="button"
                onClick={() => quickAdvance(b.key)}
                className="px-3 py-1.5 bg-white border border-[#4D148C] text-[#4D148C] hover:bg-purple-50 text-[10px] font-bold rounded inline-flex items-center gap-1 transition-colors"
              >
                <Zap className="w-3 h-3" /> {b.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={save} className="space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Tracking Number</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.trackingNumber}
                onChange={(e) => set('trackingNumber', e.target.value.replace(/\D/g, ''))}
                className={`${inputCls} font-mono`}
                maxLength={15}
                required
              />
              <button
                type="button"
                onClick={() => set('trackingNumber', generateTrackingNumber())}
                className="px-3 border-2 border-gray-300 hover:border-[#4D148C] text-[#4D148C] rounded transition-colors shrink-0"
                title="Generate new number"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className={labelCls}>Status</label>
            <select value={form.status} onChange={(e) => handleStatusChange(e.target.value as AdminShipment['status'])} className={inputCls}>
              {STATUS_OPTIONS.map(s => <option key={s.status}>{s.status}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Service</label>
            <select value={form.service} onChange={(e) => set('service', e.target.value)} className={inputCls}>
              {SERVICES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Origin Facility (Code)</label>
            <select value={form.originCode} onChange={(e) => handleFacility('originCode', e.target.value)} className={inputCls}>
              <FacilityOptions />
            </select>
          </div>

          <div>
            <label className={labelCls}>Destination Facility (Code)</label>
            <select value={form.destCode} onChange={(e) => handleFacility('destCode', e.target.value)} className={inputCls}>
              <FacilityOptions />
            </select>
          </div>

          <div>
            <label className={labelCls}>Current Location (Code)</label>
            <select value={form.currentCode} onChange={(e) => handleFacility('currentCode', e.target.value)} className={inputCls}>
              <FacilityOptions />
            </select>
          </div>

          <div>
            <label className={labelCls}>Estimated Delivery Text</label>
            <input type="text" value={form.estimatedDelivery} onChange={(e) => set('estimatedDelivery', e.target.value)} className={inputCls} placeholder="Tomorrow by 10:30 AM" />
          </div>

          <div>
            <label className={labelCls}>Sender Name</label>
            <input type="text" value={form.senderName || ''} onChange={(e) => set('senderName', e.target.value)} className={inputCls} placeholder="Acme Corp" />
          </div>

          <div>
            <label className={labelCls}>Sender Email</label>
            <input type="email" value={form.senderEmail || ''} onChange={(e) => set('senderEmail', e.target.value)} className={inputCls} placeholder="orders@acme.com" />
          </div>

          <div>
            <label className={labelCls}>Recipient Name</label>
            <input type="text" value={form.recipientName || ''} onChange={(e) => set('recipientName', e.target.value)} className={inputCls} placeholder="Jane Doe" />
          </div>

          <div>
            <label className={labelCls}>Recipient Email</label>
            <input type="email" value={form.recipientEmail || ''} onChange={(e) => set('recipientEmail', e.target.value)} className={inputCls} placeholder="jane@example.com" />
          </div>

          <div>
            <label className={labelCls}>Weight (display)</label>
            <input type="text" value={form.weight} onChange={(e) => set('weight', e.target.value)} className={inputCls} placeholder="4.0 lbs / 1.81 kg" />
          </div>

          <div>
            <label className={labelCls}>Dimensions (display)</label>
            <input type="text" value={form.dimensions} onChange={(e) => set('dimensions', e.target.value)} className={inputCls} placeholder="12 x 9 x 4 in" />
          </div>

          <div>
            <label className={labelCls}>Pieces</label>
            <input type="number" min="1" value={form.pieceCount} onChange={(e) => set('pieceCount', Number(e.target.value))} className={inputCls} />
          </div>

          <div className="md:col-span-3">
            <label className={labelCls}>Status Description</label>
            <input type="text" value={form.statusDescription} onChange={(e) => set('statusDescription', e.target.value)} className={inputCls} />
          </div>

          <div className="md:col-span-3">
            <label className={labelCls}>Progress: {form.progressPercent}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={form.progressPercent}
              onChange={(e) => set('progressPercent', Number(e.target.value))}
              className="w-full accent-[#4D148C]"
            />
          </div>
        </div>

        {/* Events */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Tracking Events</h2>

          {/* Add event */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end mb-4 p-3 bg-gray-50 rounded-lg">
            <div>
              <label className={labelCls}>Date</label>
              <input type="text" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className={`${inputCls} h-9`} />
            </div>
            <div>
              <label className={labelCls}>Time</label>
              <input type="text" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} className={`${inputCls} h-9`} />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Event Description</label>
              <input type="text" value={newEvent.status} onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })} className={`${inputCls} h-9`} />
            </div>
            <div>
              <label className={labelCls}>Location</label>
              <select
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className={`${inputCls} h-9`}
              >
                {FACILITIES.map(f => (
                  <option key={f.code} value={`${f.city}, ${f.state}`}>{f.city}, {f.state} ({f.code})</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={addEvent}
              className="md:col-span-5 py-2 bg-[#4D148C] hover:bg-[#330066] text-white font-bold text-xs rounded transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Event
            </button>
          </div>

          {form.events.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-6">No events yet — add scan events above or use the quick-advance buttons when editing.</p>
          ) : (
            <div className="space-y-2">
              {form.events.map((evt, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50 rounded-lg text-xs">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-gray-400">{evt.date} {evt.time}</span>
                    <span className="font-bold text-gray-900">{evt.status}</span>
                    <span className="text-gray-500">{evt.location}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => set('events', form.events.filter((_, i) => i !== idx))}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/admin')} className="py-3 px-6 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold text-sm rounded transition-colors">
            Cancel
          </button>
          <button type="submit" className="py-3 px-8 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors inline-flex items-center gap-2">
            <Save className="w-4 h-4" /> {isEdit ? 'Save Changes' : 'Create Shipment'}
          </button>
        </div>
      </form>
    </div>
  );
};
