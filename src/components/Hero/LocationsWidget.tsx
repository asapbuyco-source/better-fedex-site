import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface LocationsWidgetProps {
  onSearch: (query: string) => void;
}

export const LocationsWidget: React.FC<LocationsWidgetProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim() || 'New York, NY');
  };

  const handleUseLocation = () => {
    setQuery('10036');
    onSearch('10036');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zip or City, State"
              className="w-full h-14 pl-4 pr-11 text-sm md:text-base border-2 border-gray-300 rounded focus:border-[#4D148C] focus:ring-1 focus:ring-[#4D148C] outline-none font-medium"
            />
            <button
              type="button"
              onClick={handleUseLocation}
              title="Use my location"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4D148C] hover:text-[#FF6200] transition-colors"
            >
              <Navigation className="w-5 h-5" />
            </button>
          </div>

          <button
            type="submit"
            className="h-14 px-6 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-xs md:text-sm rounded transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0"
          >
            <MapPin className="w-4 h-4" /> Find Location
          </button>
        </div>
      </div>
    </form>
  );
};
