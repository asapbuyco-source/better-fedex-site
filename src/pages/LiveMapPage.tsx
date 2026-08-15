import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { adminService } from '../services/adminService';
import { trackingService, TrackingDetail } from '../services/trackingService';
import { shipService } from '../services/shipService';
import { findFacilityByLocation, getFacilityByCode, hashStringToCoords } from '../data/facilities';
import { Radio } from 'lucide-react';

interface MapShipment {
  code: string;
  status: string;
  statusColor: string;
  service: string;
  origin: { lat: number; lng: number; label: string };
  dest: { lat: number; lng: number; label: string };
  route: { lat: number; lng: number }[];
  progress: number;
  speed: number;
  source: 'admin' | 'tracked' | 'customer';
  eta: string;
}

const STATUS_STYLE: Record<string, { bg: string; border: string; label: string }> = {
  purple: { bg: '#4D148C', border: '#FFFFFF', label: 'In Transit' },
  orange: { bg: '#FF6200', border: '#FFFFFF', label: 'Out for Delivery' },
  green: { bg: '#059669', border: '#FFFFFF', label: 'Delivered' },
  red: { bg: '#DC2626', border: '#FFFFFF', label: 'Exception' },
  gray: { bg: '#6B7280', border: '#FFFFFF', label: 'Pending' },
};

function makeCodeIcon(code: string, colorKey: string, delivered: boolean): L.DivIcon {
  const style = STATUS_STYLE[colorKey] || STATUS_STYLE.gray;
  const display = code.length > 10 ? `${code.slice(0, 4)}…${code.slice(-3)}` : code;
  return L.divIcon({
    className: '',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);pointer-events:auto;">
        <div style="
          background:${style.bg};
          color:#fff;
          font-family:ui-monospace,monospace;
          font-weight:700;
          font-size:10px;
          padding:2px 7px;
          border-radius:6px;
          border:2px solid ${style.border};
          box-shadow:0 2px 8px rgba(0,0,0,.35);
          white-space:nowrap;
          ${delivered ? '' : 'animation:fdxPulse 1.6s infinite;'}
        ">${display}</div>
        <div style="
          width:11px;height:11px;border-radius:50% 50% 50% 0;
          background:${style.bg};
          border:2px solid ${style.border};
          transform:rotate(-45deg) translateY(-4px);
          box-shadow:0 2px 6px rgba(0,0,0,.3);
        "></div>
      </div>`,
    iconSize: [80, 30],
    iconAnchor: [0, 0],
  });
}

function pointAlongRoute(points: { lat: number; lng: number }[], t: number): { lat: number; lng: number } {
  if (points.length === 0) return { lat: 35, lng: -95 };
  if (points.length === 1) return points[0];
  const totalSegments = points.length - 1;
  const clamped = Math.max(0, Math.min(0.999, t));
  const segFloat = clamped * totalSegments;
  const seg = Math.floor(segFloat);
  const frac = segFloat - seg;
  const a = points[seg];
  const b = points[seg + 1];
  return { lat: a.lat + (b.lat - a.lat) * frac, lng: a.lng + (b.lng - a.lng) * frac };
}

function toCoords(location: string, seed: string) {
  const fac = findFacilityByLocation(location);
  if (fac) return { lat: fac.lat, lng: fac.lng, label: `${fac.city}, ${fac.state} (${fac.code})` };
  const c = hashStringToCoords(seed);
  return { lat: c.lat, lng: c.lng, label: location };
}

function buildShipments(): MapShipment[] {
  const out: MapShipment[] = [];
  const seen = new Set<string>();

  const push = (s: MapShipment) => {
    if (!seen.has(s.code)) {
      seen.add(s.code);
      out.push(s);
    }
  };

  for (const s of adminService.getAll()) {
    const o = getFacilityByCode(s.originCode);
    const d = getFacilityByCode(s.destCode);
    const isExpress = !s.service.includes('Ground') && !s.service.includes('Freight');
    const mem = getFacilityByCode('MEM');
    const route = isExpress && o.code !== 'MEM' && d.code !== 'MEM'
      ? [{ lat: o.lat, lng: o.lng }, { lat: mem.lat, lng: mem.lng }, { lat: d.lat, lng: d.lng }]
      : [{ lat: o.lat, lng: o.lng }, { lat: d.lat, lng: d.lng }];
    push({
      code: s.trackingNumber,
      status: s.status,
      statusColor: s.statusColor,
      service: s.service,
      origin: { lat: o.lat, lng: o.lng, label: `${o.city}, ${o.state} (${o.code})` },
      dest: { lat: d.lat, lng: d.lng, label: `${d.city}, ${d.state} (${d.code})` },
      route,
      progress: s.progressPercent / 100,
      speed: s.status === 'Delivered' ? 0 : 0.008,
      source: 'admin',
      eta: s.estimatedDelivery
    });
  }

  for (const r of shipService.getShipments()) {
    const detail = trackingService.getLocalShipment(r.trackingNumber);
    if (detail) push(buildFromDetail(detail, 'customer'));
  }

  // Anything the user has tracked (admin, Firestore, or local) also shows on the map
  for (const d of trackingService.getTracked()) {
    push(buildFromDetail(d, 'tracked'));
  }

  return out;
}

function buildFromDetail(d: TrackingDetail, source: 'customer' | 'tracked'): MapShipment {
  const o = toCoords(d.origin, d.origin + d.trackingNumber);
  const dest = toCoords(d.destination, d.destination + d.trackingNumber);
  const isExpress = !d.service.includes('Ground');
  const mem = getFacilityByCode('MEM');
  const route = isExpress
    ? [{ lat: o.lat, lng: o.lng }, { lat: mem.lat, lng: mem.lng }, { lat: dest.lat, lng: dest.lng }]
    : [{ lat: o.lat, lng: o.lng }, { lat: dest.lat, lng: dest.lng }];
  return {
    code: d.trackingNumber,
    status: d.status,
    statusColor: d.statusColor,
    service: d.service,
    origin: o,
    dest,
    route,
    progress: d.progressPercent / 100,
    speed: d.status === 'Delivered' ? 0 : 0.003,
    source,
    eta: d.estimatedDelivery
  };
}

function MapAutoFit({ shipments }: { shipments: MapShipment[] }) {
  const map = useMap();
  const fitRef = useRef(0);
  const prevCount = useRef(shipments.length);
  useEffect(() => {
    const grew = shipments.length > prevCount.current;
    prevCount.current = shipments.length;
    if (shipments.length > 0 && (fitRef.current < 2 || grew)) {
      fitRef.current++;
      const pts = shipments.flatMap(s => s.route);
      if (pts.length > 0) {
        map.fitBounds(L.latLngBounds(pts.map(p => [p.lat, p.lng] as [number, number])).pad(0.15), { animate: true });
      }
    }
  }, [shipments.length, map]);
  return null;
}

/** Rebuild the shipment list from localStorage, preserving live progress for known codes. */
function mergeShipments(prev: MapShipment[]): MapShipment[] {
  const fresh = buildShipments();
  const prevByCode = new Map(prev.map(s => [s.code, s]));
  return fresh.map(s => {
    const old = prevByCode.get(s.code);
    return old ? { ...s, progress: Math.max(s.progress, old.progress) } : s;
  });
}

/** Zoom straight to a specific shipment (used with ?focus=<trackingNumber>). */
function FocusFit({ shipments, code }: { shipments: MapShipment[]; code?: string }) {
  const map = useMap();
  const doneRef = useRef<string | null>(null);
  useEffect(() => {
    if (!code || doneRef.current === code) return;
    const s = shipments.find(x => x.code === code);
    if (s && s.route.length > 0) {
      doneRef.current = code;
      map.fitBounds(L.latLngBounds(s.route.map(p => [p.lat, p.lng] as [number, number])).pad(0.25), { animate: true });
    }
  }, [shipments, code, map]);
  return null;
}

const LiveMapContent: React.FC<{ focusCode?: string }> = ({ focusCode }) => {
  const [shipments, setShipments] = useState<MapShipment[]>(() => buildShipments());
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<string | null>(focusCode ?? null);

  useEffect(() => {
    if (paused) return;
    let count = 0;
    const id = setInterval(() => {
      count++;
      setShipments(prev => {
        const next = prev.map(s => ({
          ...s,
          progress: Math.min(1, s.progress + s.speed)
        }));
        return count % 5 === 0 ? mergeShipments(next) : next;
      });
      setTick(t => t + 1);
    }, 2200);
    return () => clearInterval(id);
  }, [paused]);

  // Pick up newly tracked/created shipments: localStorage changes in other tabs,
  // tab refocus, and page visibility changes
  useEffect(() => {
    const rebuild = () => setShipments(prev => mergeShipments(prev));
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key.includes('fedex')) rebuild();
    };
    const onFocus = () => rebuild();
    const onVisible = () => { if (!document.hidden) rebuild(); };
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const active = useMemo(() => shipments.filter(s => s.progress < 1).length, [shipments, tick]);

  return (
    <div>
      <style>{`@keyframes fdxPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}`}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Map */}
        <div className="lg:col-span-8">
          <div className="rounded-xl overflow-hidden border-2 border-gray-200 shadow-md" style={{ height: '70vh', minHeight: '480px' }}>
            <MapContainer
              center={[38, -95]}
              zoom={4}
              style={{ height: '100%', width: '100%', background: '#dde6f0' }}
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapAutoFit shipments={shipments} />
              <FocusFit shipments={shipments} code={focusCode} />

              {shipments.map(s => {
                const pos = pointAlongRoute(s.route, s.progress);
                const style = STATUS_STYLE[s.statusColor] || STATUS_STYLE.gray;
                const isSelected = selected === s.code;
                return (
                  <React.Fragment key={s.code}>
                    {/* Full route dashed */}
                    <Polyline
                      positions={s.route.map(p => [p.lat, p.lng] as [number, number])}
                      pathOptions={{ color: '#94a3b8', weight: 1.5, dashArray: '5,7' }}
                    />
                    {/* Traveled portion */}
                    {s.progress > 0.02 && (
                      <Polyline
                        positions={[s.route[0], pos].map(p => [p.lat, p.lng] as [number, number])}
                        pathOptions={{ color: s.statusColor === 'green' ? '#059669' : '#4D148C', weight: isSelected ? 4 : 2.5, opacity: 0.85 }}
                      />
                    )}
                    {/* Origin / destination dots */}
                    <Marker
                      position={[s.origin.lat, s.origin.lng]}
                      icon={L.divIcon({ className: '', html: `<div style="width:8px;height:8px;border-radius:50%;background:#4D148C;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>`, iconSize: [12, 12], iconAnchor: [6, 6] })}
                    />
                    <Marker
                      position={[s.dest.lat, s.dest.lng]}
                      icon={L.divIcon({ className: '', html: `<div style="width:8px;height:8px;border-radius:50%;background:#FF6200;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>`, iconSize: [12, 12], iconAnchor: [6, 6] })}
                    />
                    {/* Moving package marker with code */}
                    <Marker
                      position={[pos.lat, pos.lng]}
                      icon={makeCodeIcon(s.code, s.statusColor, s.progress >= 1)}
                      eventHandlers={{ click: () => setSelected(s.code) }}
                    >
                      <Popup>
                        <div style={{ fontFamily: 'sans-serif', minWidth: 190 }}>
                          <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13 }}>{s.code}</div>
                          <div style={{ fontSize: 11, color: style.bg, fontWeight: 700, margin: '2px 0' }}>{style.label}</div>
                          <div style={{ fontSize: 11, color: '#555' }}>{s.service}</div>
                          <div style={{ fontSize: 11, color: '#555' }}>{s.origin.label.split(' (')[0]} → {s.dest.label.split(' (')[0]}</div>
                          <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>ETA: {s.eta}</div>
                          <div style={{ fontSize: 10, marginTop: 4 }}>
                            <a href={`/tracking?number=${s.code}`} target="_blank" rel="noreferrer" style={{ color: '#0068A8', fontWeight: 700 }}>Track details →</a>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  </React.Fragment>
                );
              })}
            </MapContainer>
          </div>

          {/* Map controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-600 font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#4D148C' }} /> In Transit</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#FF6200' }} /> Out for Delivery</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#059669' }} /> Delivered</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#DC2626' }} /> Exception</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#6B7280' }} /> Pending</span>
            </div>
            <button
              onClick={() => setPaused(p => !p)}
              className="px-4 py-2 bg-white border-2 border-gray-300 hover:border-[#4D148C] text-gray-700 font-bold text-xs rounded transition-colors inline-flex items-center gap-2"
            >
              <Radio className={`w-3.5 h-3.5 ${paused ? 'text-gray-400' : 'text-emerald-600 animate-pulse'}`} />
              {paused ? 'Resume Live Feed' : 'Live Feed Active'}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-[#4D148C] text-white rounded-xl p-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF6600]">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Live Network Status
            </div>
            <div className="mt-1.5 text-2xl font-black">{active} active shipments</div>
            <div className="text-xs text-purple-200">{shipments.length} total tracked on the network</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 text-xs font-black text-gray-500 uppercase tracking-wider">
              Shipment Codes
            </div>
            <div className="max-h-[46vh] overflow-y-auto divide-y divide-gray-100">
              {shipments.map(s => {
                const style = STATUS_STYLE[s.statusColor] || STATUS_STYLE.gray;
                return (
                  <button
                    key={s.code}
                    onClick={() => setSelected(s.code)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${selected === s.code ? 'bg-purple-50' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-sm text-gray-900">{s.code}</span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-white" style={{ background: style.bg }}>
                        {style.label}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1">
                      {s.origin.label.split(' (')[0]} → {s.dest.label.split(' (')[0]}
                    </div>
                    <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${s.progress * 100}%`, background: style.bg }} />
                    </div>
                    <div className="flex justify-between mt-2 text-[10px]">
                      <span className="text-gray-400 uppercase font-bold tracking-wide">{s.source}</span>
                      <span className="text-gray-500">{Math.round(s.progress * 100)}% complete</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LiveMapPage: React.FC = () => {
  const [params] = useSearchParams();
  const focus = params.get('focus') || undefined;
  return (
  <div>
    <div className="bg-gradient-to-r from-[#4D148C] to-[#330066] text-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="flex items-center gap-2 text-xs text-purple-200 mb-2">
          <Radio className="w-4 h-4 text-[#FF6600] animate-pulse" /> LIVE NETWORK FEED
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Live Shipment Map</h1>
        <p className="text-sm sm:text-base text-purple-100 mt-2 max-w-2xl">
          Watch every shipment on the FedEx network move in real time — each marker carries its tracking code.
          Click a marker or a code in the list for route details.
        </p>
      </div>
    </div>
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6">
      <LiveMapContent focusCode={focus} />
    </div>
  </div>
  );
};

export const AdminLiveMapPage: React.FC = () => (
  <div>
    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
      <div>
        <h1 className="text-lg font-bold text-gray-900">Live Network Map</h1>
        <p className="text-xs text-gray-500">All shipments with tracking codes, moving in real time</p>
      </div>
      <Link to="/live-map" className="text-xs font-bold text-[#0068A8] hover:underline">Open public view →</Link>
    </div>
    <LiveMapContent />
  </div>
);
