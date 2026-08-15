import React from 'react';

interface RatesInfoSectionProps {
  onSelectAction: (actionType: string) => void;
}

export const RatesInfoSection: React.FC<RatesInfoSectionProps> = ({ onSelectAction }) => {
  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-4">

        <p className="text-xs text-gray-600 leading-relaxed max-w-4xl">
          <strong className="font-bold text-gray-800">FedEx rate and surcharge changes</strong>{' '}
          Learn more about{' '}
          <button
            onClick={() => onSelectAction('rates')}
            className="text-[#0068A8] font-bold hover:underline"
          >
            rate and surcharge changes
          </button>
          —last updated 12/12/2025.
        </p>

        <p className="text-xs text-gray-600 leading-relaxed max-w-4xl">
          <strong className="font-bold text-gray-800">FedEx money-back guarantee</strong>{' '}
          We offer a money-back guarantee for select services. This guarantee may be suspended, modified, or revoked. Please check{' '}
          <button
            onClick={() => onSelectAction('rates')}
            className="text-[#0068A8] font-bold hover:underline"
          >
            money-back guarantee
          </button>
          for the latest status of our money-back guarantee.
        </p>

      </div>
    </section>
  );
};
