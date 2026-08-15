import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { trackingService, TrackingDetail } from '../services/trackingService';
import { PageHero } from '../components/Page/PageHero';
import { Package, CheckCircle2, Clock, MapPin, Truck, AlertTriangle, Printer, ShieldCheck, Search, History, X } from 'lucide-react';

const TrackingDetailView: React.FC<{ detail: TrackingDetail }> = ({ detail }) => {
  const getStatusBadge = () => {
    switch (detail.statusColor) {
      case 'green':
        return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle2 };
      case 'orange':
        return { bg: 'bg-orange-100 text-orange-800 border-orange-300', icon: Clock };
      case 'red':
        return { bg: 'bg-red-100 text-red-800 border-red-300', icon: AlertTriangle };
      default:
        return { bg: 'bg-purple-100 text-[#4D148C] border-purple-300', icon: Truck };
    }
  };

  const badgeInfo = getStatusBadge();
  const IconComponent = badgeInfo.icon;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="bg-[#4D148C] text-white p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Package className="w-6 h-6 text-[#FF6600]" />
          </div>
          <div>
            <div className="text-xs text-purple-200 font-mono">TRACKING NUMBER</div>
            <div className="text-lg sm:text-xl font-mono font-bold tracking-wide">{detail.trackingNumber}</div>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="p-2 text-purple-200 hover:text-white rounded-lg hover:bg-white/10"
          title="Print status"
        >
          <Printer className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        <div className="bg-[#FAFAFA] border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeInfo.bg}`}>
              <IconComponent className="w-4 h-4" />
              {detail.status.toUpperCase()}
            </div>
            <span className="text-xs text-gray-500 font-medium">Service: {detail.service}</span>
          </div>

          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Estimated Delivery</div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">{detail.estimatedDelivery}</div>
            <p className="text-xs text-gray-600 mt-1">{detail.statusDescription}</p>
          </div>

          <div className="space-y-1 pt-2">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4D148C] to-[#FF6600] transition-all duration-700"
                style={{ width: `${detail.progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 font-medium pt-1">
              <span>Shipment Created</span>
              <span>In Transit</span>
              <span>Out for Delivery</span>
              <span>Delivered</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#4D148C] shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-[#4D148C]">Want to change delivery instructions?</h4>
              <p className="text-xs text-purple-900 mt-0.5">
                Sign up for FedEx Delivery Manager® to request hold at Walgreens or leave porch instructions.
              </p>
            </div>
          </div>
          <Link
            to="/delivery-manager"
            className="py-2 px-4 bg-[#4D148C] hover:bg-[#330066] text-white font-bold text-xs rounded transition-colors whitespace-nowrap shrink-0"
          >
            Manage Delivery
          </Link>
        </div>

        <div>
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Shipment Details</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-lg text-xs">
            <div>
              <span className="text-gray-500 font-bold block">From</span>
              <span className="font-semibold text-gray-800">{detail.origin}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block">To</span>
              <span className="font-semibold text-gray-800">{detail.destination}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block">Weight</span>
              <span className="font-semibold text-gray-800">{detail.weight}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block">Dimensions</span>
              <span className="font-semibold text-gray-800">{detail.dimensions}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Travel History</h4>
          <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {detail.events.map((evt, idx) => (
              <div key={idx} className="relative pl-8 text-xs">
                <div className={`absolute left-1.5 top-1 w-3 h-3 rounded-full border-2 bg-white ${
                  evt.completed ? 'border-[#4D148C] bg-[#FF6600]' : 'border-gray-300'
                }`} />
                <div className="flex flex-wrap items-center justify-between font-bold text-gray-800">
                  <span>{evt.status}</span>
                  <span className="text-gray-500 text-[11px] font-normal">{evt.date} • {evt.time}</span>
                </div>
                <div className="text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-gray-400" /> {evt.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TrackingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get('number') || '');
  const [multiMode, setMultiMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TrackingDetail[]>([]);
  const [notFoundMsg, setNotFoundMsg] = useState('');
  const history = trackingService.getHistory();

  const track = async (num: string) => {
    if (!num.trim()) return;
    setLoading(true);
    setNotFoundMsg('');
    setResults([]);
    const detail = await trackingService.trackNumber(num);
    if (detail) {
      setResults([detail]);
      setSearchParams({ number: num }, { replace: true });
    } else {
      setNotFoundMsg(`No shipment found for "${num}". Check the number and try again.`);
    }
    setLoading(false);
    scrollToResults();
  };

  const trackMulti = async () => {
    const raw = input.split(/[\n,;]+/).map(n => n.trim()).filter(Boolean);
    if (raw.length === 0) return;
    setLoading(true);
    setNotFoundMsg('');
    const details = (await trackingService.trackMultiple(input)).filter((d): d is TrackingDetail => d !== null);
    if (details.length === 0) {
      setNotFoundMsg('No shipments found for any of these tracking numbers.');
    }
    setResults(details);
    setLoading(false);
    scrollToResults();
  };

  const resultsRef = React.useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    setTimeout(() => {
      const el = resultsRef.current;
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 60);
  };

  useEffect(() => {
    const num = searchParams.get('number');
    if (num) {
      setInput(num);
      track(num);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PageHero
        title="Tracking"
        subtitle="Enter a FedEx tracking, door tag, or FedEx Office order number to review shipping details."
        breadcrumb={[{ label: 'Tracking' }]}
      >
        <div
          className="rounded-xl h-40 md:h-52 bg-cover bg-center border border-gray-200 shadow-lg"
          style={{ backgroundImage: "url('/images/fedex-delivery.jpg')" }}
          role="img"
          aria-label="FedEx courier delivering a package"
        />
      </PageHero>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Search panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#4D148C]" /> Track Your Shipment
                </h2>
                <button
                  onClick={() => { setMultiMode(!multiMode); setResults([]); }}
                  className="text-xs font-bold text-[#0068A8] hover:underline"
                >
                  {multiMode ? 'Single' : 'Multiple'}
                </button>
              </div>

              {multiMode ? (
                <textarea
                  rows={4}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={'Enter up to 30 tracking numbers,\none per line or comma separated'}
                  className="w-full px-3.5 py-2.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-mono"
                />
              ) : (
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') track(input); }}
                  placeholder="Tracking number"
                  className="w-full h-12 px-3.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium"
                />
              )}

              <button
                onClick={multiMode ? trackMulti : () => track(input)}
                className="w-full py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors"
              >
                TRACK
              </button>

              <div className="pt-3 border-t border-gray-100">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <History className="w-3.5 h-3.5" /> Recent Tracking
                </h3>
                {history.length === 0 ? (
                  <p className="text-xs text-gray-400 py-2">Numbers you track will appear here.</p>
                ) : (
                <div className="space-y-1.5">
                  {history.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setMultiMode(false); setInput(item.number); track(item.number); }}
                      className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-purple-50 border border-gray-200 rounded text-xs"
                    >
                      <span className="font-mono font-bold text-gray-800">{item.number}</span>
                      <span className="text-gray-500">{item.status}</span>
                    </button>
                  ))}
                </div>
                )}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl border border-purple-200 p-5">
              <h3 className="text-sm font-bold text-[#4D148C]">Advanced Tracking Tools</h3>
              <ul className="mt-3 space-y-2 text-xs text-purple-900">
                <li><Link to="/delivery-manager" className="hover:underline font-semibold">FedEx Delivery Manager®</Link> — customize deliveries</li>
                <li><Link to="/support" className="hover:underline font-semibold">Proof of Delivery</Link> — request signature proof</li>
                <li><Link to="/support" className="hover:underline font-semibold">Where is my package?</Link> — troubleshooting guide</li>
                <li><Link to="/live-map" className="hover:underline font-semibold">Live Shipment Map</Link> — watch packages move in real time</li>
              </ul>
            </div>
          </div>

          {/* Right: Results */}
          <div ref={resultsRef} className="lg:col-span-8 space-y-6">
            {loading && (
              <div className="bg-white border border-gray-200 rounded-xl p-16 text-center text-gray-500 font-medium">
                Tracking your shipment...
              </div>
            )}

            {!loading && notFoundMsg && (
              <div className="bg-white border border-red-200 rounded-xl p-8 text-center">
                <X className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-red-700">{notFoundMsg}</p>
              </div>
            )}

            {!loading && results.length === 0 && !notFoundMsg && (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800">Track your shipment</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                  Enter a tracking number to see real-time status, travel history, and estimated delivery.
                  Tracking numbers are issued when you create a shipment or by the shipper.
                </p>
              </div>
            )}

            {!loading && results.map((detail) => (
              <TrackingDetailView key={detail.trackingNumber} detail={detail} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
