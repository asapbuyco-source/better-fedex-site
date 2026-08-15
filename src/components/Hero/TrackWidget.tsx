import React, { useState } from 'react';

interface TrackWidgetProps {
  onTrackSubmit: (trackingNumber: string) => void;
}

export const TrackWidget: React.FC<TrackWidgetProps> = ({ onTrackSubmit }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError('Please enter at least one tracking number.');
      return;
    }
    setError('');
    onTrackSubmit(trackingNumber.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="relative">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => { setTrackingNumber(e.target.value); setError(''); }}
            placeholder="Enter a FedEx tracking number to review shipping details."
            className="w-full h-14 pl-4 pr-32 sm:pr-40 text-sm md:text-base border-2 border-gray-300 rounded focus:border-[#4D148C] focus:ring-1 focus:ring-[#4D148C] outline-none font-medium"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-xs md:text-sm rounded transition-colors shadow-sm"
          >
            Track
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-600 font-bold mt-1.5 flex items-center gap-1">
            ⚠️ {error}
          </p>
        )}
      </div>
    </form>
  );
};
