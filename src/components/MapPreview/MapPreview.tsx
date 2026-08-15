import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TrackingDetail } from '../../services/trackingService';
import { findFacilityByLocation, getFacilityByCode, hashStringToCoords } from '../../data/facilities';

function toCoords(location: string, seed: string) {
  const fac = findFacilityByLocation(location);
  if (fac) return { lat: fac.lat, lng: fac.lng };
  return hashStringToCoords(seed);
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

function FitRoute({ route }: { route: { lat: number; lng: number }[] }) {
  const map = useMap();
  useEffect(() => {
    if (route.length > 0) {
      map.fitBounds(
        L.latLngBounds(route.map(p => [p.lat, p.lng] as [number, number])).pad(0.2),
        { animate: false }
      );
    }
  }, [route, map]);
  return null;
}

const COLOR: Record<string, string> = {
  purple: '#4D148C',
  green: '#059669',
  orange: '#FF6200',
  red: '#DC2626',
  gray: '#6B7280'
};

function codeIcon(code: string, color: string) {
  const display = code.length > 10 ? `${code.slice(0, 4)}…${code.slice(-3)}` : code;
  return L.divIcon({
    className: '',
    html: `
      <div style="transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;">
        <div style="background:${color};color:#fff;font-family:ui-monospace,monospace;font-weight:700;font-size:10px;padding:2px 7px;border-radius:6px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);white-space:nowrap;">${display}</div>
        <div style="width:9px;height:9px;border-radius:50% 50% 50% 0;background:${color};border:2px solid #fff;transform:rotate(-45deg) translateY(-3px);box-shadow:0 2px 4px rgba(0,0,0,.3);"></div>
      </div>`,
    iconSize: [80, 30],
    iconAnchor: [0, 0]
  });
}

const dotIcon = (color: string) => L.divIcon({
  className: '',
  html: `<div style="width:8px;height:8px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

export const MapPreview: React.FC<{ detail: TrackingDetail }> = ({ detail }) => {
  const o = toCoords(detail.origin, detail.origin + detail.trackingNumber);
  const dest = toCoords(detail.destination, detail.destination + detail.trackingNumber);
  const isExpress = !detail.service.includes('Ground');
  const mem = getFacilityByCode('MEM');
  const route = isExpress
    ? [o, { lat: mem.lat, lng: mem.lng }, dest]
    : [o, dest];
  const pos = pointAlongRoute(route, detail.progressPercent / 100);
  const color = COLOR[detail.statusColor] || COLOR.purple;

  return (
    <div className="h-60 w-full rounded-xl overflow-hidden border border-gray-200 bg-[#dde6f0]">
      <MapContainer
        center={[38, -95]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        keyboard={false}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitRoute route={route} />
        <Polyline
          positions={route.map(p => [p.lat, p.lng] as [number, number])}
          pathOptions={{ color: '#94a3b8', weight: 1.5, dashArray: '5,7' }}
        />
        <Polyline
          positions={[route[0], pos].map(p => [p.lat, p.lng] as [number, number])}
          pathOptions={{ color, weight: 3, opacity: 0.85 }}
        />
        <Marker position={[o.lat, o.lng]} icon={dotIcon('#4D148C')} />
        <Marker position={[dest.lat, dest.lng]} icon={dotIcon('#FF6200')} />
        <Marker position={[pos.lat, pos.lng]} icon={codeIcon(detail.trackingNumber, color)} />
      </MapContainer>
    </div>
  );
};
