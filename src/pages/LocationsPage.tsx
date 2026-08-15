import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FedExLocation } from '../data/locations';
import { locationService } from '../services/locationService';
import { PageHero } from '../components/Page/PageHero';
import { MapPin, Search, Clock, Phone, Navigation, CheckCircle2 } from 'lucide-react';

export const LocationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = useState<FedExLocation[]>([]);
  const [query, setQuery] = useState(searchParams.get('q') || 'New York, NY');
  const [selectedLoc, setSelectedLoc] = useState<FedExLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState<string>(searchParams.get('type') || 'All');

  const fetchLocations = async (q: string) => {
    setLoading(true);
    const results = await locationService.searchLocations({ query: q });
    setLocations(results);
    setSelectedLoc(results[0] || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations(searchParams.get('q') || 'New York, NY');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
    fetchLocations(query);
  };

  const filteredLocations = filterType === 'All'
    ? locations
    : locations.filter(l => l.type.includes(filterType));

  return (
    <div>
      <PageHero
        title="Find a FedEx Location"
        subtitle="Search by ZIP, city, or state to find FedEx Office, Walgreens drop-off, and 24/7 drop box locations near you."
        breadcrumb={[{ label: 'Locations' }]}
      >
        <div
          className="rounded-xl h-40 md:h-52 bg-cover bg-center border-4 border-white/20 shadow-lg mb-4"
          style={{ backgroundImage: "url('/images/fedex-courier.jpg')" }}
          role="img"
          aria-label="FedEx courier at a delivery location"
        />
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2 max-w-2xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zip or City, State"
            className="flex-1 h-12 px-4 text-sm border-2 border-transparent rounded focus:border-white outline-none font-medium text-gray-800 bg-white"
          />
          <button
            type="submit"
            className="h-12 px-6 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <Search className="w-4 h-4" /> Find Location
          </button>
        </form>
      </PageHero>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        {/* Filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 text-xs">
          {['All', 'FedEx Office', 'Walgreens', 'Drop Box', 'Dollar General'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-2 rounded-full font-bold transition-colors whitespace-nowrap ${
                filterType === type
                  ? 'bg-[#4D148C] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List */}
          <div className="lg:col-span-7 space-y-3">
            {loading ? (
              <div className="text-center py-16 text-gray-500 font-medium bg-white rounded-xl border border-gray-200">Searching nearby locations...</div>
            ) : filteredLocations.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-200">No locations found for "{query}". Try another city or ZIP.</div>
            ) : (
              filteredLocations.map((loc) => {
                const isSelected = selectedLoc?.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLoc(loc)}
                    className={`bg-white p-4 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#4D148C] bg-purple-50/50 shadow-md ring-1 ring-[#4D148C]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded text-white" style={{ backgroundColor: loc.typeBadgeColor }}>
                          {loc.type}
                        </span>
                        <h4 className="font-bold text-gray-900 text-sm mt-1">{loc.name}</h4>
                        <p className="text-xs text-gray-600 mt-0.5">{loc.address}, {loc.city}, {loc.state} {loc.zip}</p>
                      </div>
                      <span className="text-xs font-bold text-[#FF6600] shrink-0">{loc.distance}</span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-200/60 grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                      <div className="flex items-center gap-1 font-medium text-emerald-700">
                        <Clock className="w-3.5 h-3.5" /> {loc.status} ({loc.hoursToday})
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-gray-400" /> {loc.phone}
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {loc.services.slice(0, 4).map((srv, idx) => (
                        <span key={idx} className="text-[10px] bg-white border border-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                          {srv}
                        </span>
                      ))}
                      {loc.services.length > 4 && (
                        <span className="text-[10px] text-gray-500 font-bold self-center">+{loc.services.length - 4} more</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-5 bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-4 h-fit lg:sticky lg:top-32">
            {selectedLoc ? (
              <>
                <div className="bg-slate-800 rounded-xl h-44 relative overflow-hidden flex items-center justify-center text-white border border-gray-300 shadow-inner">
                  <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80')` }}
                  />
                  <div className="relative z-10 text-center p-3 bg-black/60 backdrop-blur-xs rounded-lg border border-white/20">
                    <MapPin className="w-8 h-8 text-[#FF6600] mx-auto animate-bounce" />
                    <div className="font-bold text-sm text-white mt-1">{selectedLoc.name}</div>
                    <div className="text-xs text-gray-300">{selectedLoc.address}</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Today's Pickup Cutoff Times</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-purple-50 rounded-lg border border-purple-100">
                      <span className="font-bold text-[#4D148C] block">FedEx Express® Cutoff</span>
                      <span className="text-base font-black text-gray-900">{selectedLoc.latestDropoffExpress}</span>
                    </div>
                    <div className="p-2.5 bg-orange-50 rounded-lg border border-orange-100">
                      <span className="font-bold text-orange-900 block">FedEx Ground® Cutoff</span>
                      <span className="text-base font-black text-gray-900">{selectedLoc.latestDropoffGround}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Services Provided</h4>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {selectedLoc.services.map((srv, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedLoc.name} ${selectedLoc.address} ${selectedLoc.city} ${selectedLoc.state}`)}`, '_blank')}
                    className="flex-1 py-2.5 bg-[#4D148C] hover:bg-[#330066] text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-4 h-4" /> Get Directions
                  </button>
                  <button
                    onClick={() => alert(`Saved ${selectedLoc.name} as preferred location.`)}
                    className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded transition-colors"
                  >
                    Set as Preferred
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-gray-400">Select a location to view details.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
