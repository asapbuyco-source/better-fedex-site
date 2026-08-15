import React from 'react';
import { QUICK_ACTION_LINKS } from '../../data/cards';
import { PackageCheck, Clock, Printer, Truck, RefreshCw, AlertTriangle, Undo2 } from 'lucide-react';

interface QuickLinksProps {
  onSelectAction: (actionType: string) => void;
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ onSelectAction }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PackageCheck': return PackageCheck;
      case 'Clock': return Clock;
      case 'Printer': return Printer;
      case 'Truck': return Truck;
      case 'RefreshCw': return RefreshCw;
      case 'AlertTriangle': return AlertTriangle;
      case 'Undo2': return Undo2;
      default: return PackageCheck;
    }
  };

  return (
    <section className="py-8 md:py-10 bg-white border-b border-gray-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {QUICK_ACTION_LINKS.map((item) => {
            const IconComponent = getIcon(item.icon);
            return (
              <button
                key={item.id}
                onClick={() => onSelectAction(item.action)}
                className="group flex flex-col items-center gap-2 min-w-[110px]"
              >
                <span className="w-14 h-14 rounded-full bg-purple-50 text-[#4D148C] group-hover:bg-[#4D148C] group-hover:text-white transition-colors flex items-center justify-center">
                  <IconComponent className="w-7 h-7" />
                </span>
                <span className="text-sm font-bold text-[#0068A8] group-hover:underline capitalize">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
