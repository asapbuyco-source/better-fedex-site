import React from 'react';
import { BENEFIT_CARDS } from '../../data/cards';

interface BenefitSectionProps {
  onSelectAction: (actionType: string) => void;
}

export const BenefitSection: React.FC<BenefitSectionProps> = ({ onSelectAction }) => {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-gray-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">

        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-gray-900 mb-8 md:mb-10">
          Why ship with FedEx?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFIT_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-3"
            >
              <h3 className="text-base font-bold text-gray-900 leading-snug">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-gray-500 mt-6 leading-relaxed">
          *FedEx doesn't ship anywhere sanctioned by the U.S.
          <br />
          **Exclusions apply.
        </p>

        <div className="mt-8">
          <button
            onClick={() => onSelectAction('ship')}
            className="bg-[#FF6200] hover:bg-[#E05500] text-white font-bold py-3 px-8 rounded transition-colors text-sm"
          >
            Start shipping now
          </button>
        </div>

      </div>
    </section>
  );
};
