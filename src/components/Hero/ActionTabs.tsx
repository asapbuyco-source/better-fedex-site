import React, { useState } from 'react';
import { TrackWidget } from './TrackWidget';
import { RateWidget } from './RateWidget';
import { LocationsWidget } from './LocationsWidget';
import { Package, Calculator, MapPin } from 'lucide-react';
import { CalculateRateInput } from '../../services/rateService';

interface ActionTabsProps {
  onTrackSubmit: (trackingNumber: string) => void;
  onRateCalculate: (input: CalculateRateInput) => void;
  onLocationSearch: (query: string) => void;
  onShip: () => void;
}

export const ActionTabs: React.FC<ActionTabsProps> = ({
  onTrackSubmit,
  onRateCalculate,
  onLocationSearch,
  onShip
}) => {
  const [activeTab, setActiveTab] = useState<'rate' | 'track' | 'locations'>('track');

  const tabButton = (tab: 'rate' | 'track' | 'locations', label: string, Icon: React.ComponentType<{ className?: string }>) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 py-4 sm:py-6 px-2 sm:px-4 text-[10px] sm:text-[13px] font-bold tracking-wider transition-all flex flex-col items-center justify-center gap-2 border-b-[4px] ${
        activeTab === tab
          ? 'border-[#4D148C] text-[#4D148C]'
          : 'border-transparent text-[#333333] hover:text-[#4D148C]'
      }`}
    >
      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${activeTab === tab ? 'text-[#4D148C]' : 'text-gray-600'}`} />
      <span className="text-center">{label}</span>
    </button>
  );

  return (
    <div className="bg-white rounded shadow-2xl overflow-hidden w-full max-w-[1000px] mx-auto text-[#333333]">
      {/* Header Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        {tabButton('rate', 'RATE & SHIP', Calculator)}
        {tabButton('track', 'TRACK', Package)}
        {tabButton('locations', 'LOCATIONS', MapPin)}
      </div>

      {/* Tab Content Container */}
      <div className="p-6 md:p-10 bg-white min-h-[220px] flex flex-col justify-center">
        {activeTab === 'track' && <TrackWidget onTrackSubmit={onTrackSubmit} />}
        {activeTab === 'locations' && <LocationsWidget onSearch={onLocationSearch} />}
        {activeTab === 'rate' && (
          <div>
            <RateWidget onCalculate={onRateCalculate} />
            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-gray-600">Already know your rates? Create a shipment in minutes.</p>
              <button
                onClick={onShip}
                className="bg-[#FF6200] hover:bg-[#E05500] text-white font-bold py-3 px-8 rounded-full transition-colors text-sm whitespace-nowrap"
              >
                START SHIPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
