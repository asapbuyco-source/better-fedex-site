import React from 'react';
import { GUIDANCE_CARDS } from '../../data/cards';
import { ArrowRight, DollarSign } from 'lucide-react';

interface BusinessSectionProps {
  onSelectAction: (actionType: string) => void;
  onOpenAuth: (mode: 'signup' | 'login') => void;
}

export const BusinessSection: React.FC<BusinessSectionProps> = ({ onSelectAction, onOpenAuth }) => {
  return (
    <section className="py-12 md:py-20 bg-[#FAFAFA] border-b border-gray-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        
        {/* Banner CTA */}
        <div className="bg-[#330066] text-white rounded-2xl p-6 sm:p-8 mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-b-[#FF6600]">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6600] bg-white/10 px-3 py-1 rounded">
              <DollarSign className="w-3.5 h-3.5" /> SPECIAL BUSINESS ACCOUNT RATES
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Start saving on every shipment today
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
              Open a free FedEx shipping account and immediately receive up to 40% off FedEx Express and 20% off FedEx Ground rates.
            </p>
          </div>

          <button
            onClick={() => onOpenAuth('signup')}
            className="py-3 px-6 bg-[#FF6600] hover:bg-[#E05500] text-white font-bold text-xs sm:text-sm rounded transition-colors shadow-md whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            CREATE FREE ACCOUNT <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Guidance Cards Grid */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
            Shipping Guidance & Global Logistics
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Expert resources to streamline packaging, navigate customs, and scale your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDANCE_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#4D148C] fedex-card-shadow-hover flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 bg-purple-100 text-[#4D148C] rounded inline-block mb-3">
                  {card.badge}
                </span>
                <h3 className="text-base font-bold text-gray-900">{card.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{card.description}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-gray-100">
                <button
                  onClick={() => onSelectAction((card.ctaLink ?? '').replace('#', ''))}
                  className="text-xs font-bold text-[#FF6600] hover:text-[#E05500] flex items-center gap-1"
                >
                  {card.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
