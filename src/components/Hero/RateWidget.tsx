import React, { useState } from 'react';
import { Calculator, ArrowRight, Package } from 'lucide-react';
import { CalculateRateInput } from '../../services/rateService';

interface RateWidgetProps {
  onCalculate: (input: CalculateRateInput) => void;
}

export const RateWidget: React.FC<RateWidgetProps> = ({ onCalculate }) => {
  const [fromZip, setFromZip] = useState('10036');
  const [toZip, setToZip] = useState('90210');
  const [packaging, setPackaging] = useState<'FedEx Envelope' | 'FedEx Pak' | 'FedEx Box' | 'Your Packaging'>('FedEx Box');
  const [weightLbs, setWeightLbs] = useState<number>(3);
  const [isCommercial, setIsCommercial] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      fromZip,
      toZip,
      packaging,
      weightLbs: Number(weightLbs) || 1,
      isCommercial
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">From (Origin ZIP / City)</label>
          <input
            type="text"
            required
            value={fromZip}
            onChange={(e) => setFromZip(e.target.value)}
            placeholder="e.g. 10036 (New York)"
            className="w-full h-10 px-3 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">To (Destination ZIP / City)</label>
          <input
            type="text"
            required
            value={toZip}
            onChange={(e) => setToZip(e.target.value)}
            placeholder="e.g. 90210 (Beverly Hills)"
            className="w-full h-10 px-3 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1 flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-[#4D148C]" /> Packaging Type
          </label>
          <select
            value={packaging}
            onChange={(e) => setPackaging(e.target.value as any)}
            className="w-full h-10 px-3 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium bg-white"
          >
            <option value="FedEx Envelope">FedEx Envelope (up to 1 lb)</option>
            <option value="FedEx Pak">FedEx Pak (padded envelope)</option>
            <option value="FedEx Box">FedEx Small/Medium/Large Box</option>
            <option value="Your Packaging">Your Custom Box / Packaging</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Weight (lbs)</label>
          <input
            type="number"
            min={0.5}
            step={0.5}
            value={weightLbs}
            onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 1)}
            className="w-full h-10 px-3 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={isCommercial}
            onChange={(e) => setIsCommercial(e.target.checked)}
            className="rounded border-gray-300 text-[#4D148C] focus:ring-[#4D148C]"
          />
          Commercial Address
        </label>

        <button
          type="submit"
          className="h-10 px-6 bg-[#FF6600] hover:bg-[#E05500] text-white font-bold text-xs sm:text-sm rounded transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Calculator className="w-4 h-4" /> GET RATES & TIMES <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
