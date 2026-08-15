import React from 'react';
import { ActionTabs } from './ActionTabs';
import { CalculateRateInput } from '../../services/rateService';

interface HeroProps {
  onTrackSubmit: (trackingNumber: string) => void;
  onRateCalculate: (input: CalculateRateInput) => void;
  onLocationSearch: (query: string) => void;
  onOpenAuth: (mode: 'signup' | 'login') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onTrackSubmit,
  onRateCalculate,
  onLocationSearch,
  onOpenAuth
}) => {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/fedex-hero.jpg')`,
          backgroundColor: '#4D148C' // fallback
        }}
      />

      {/* Overlay to ensure tabs are readable if image is complex */}
      <div className="absolute inset-0 z-0 bg-black/30"></div>

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 flex justify-center">
        {/* Action Tabs Centered Card */}
        <div className="w-full max-w-[900px] mt-8 md:mt-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-6 md:mb-8 px-2 sm:px-6 text-center md:text-left drop-shadow">
            Ship, manage, track, deliver
          </h1>
          <ActionTabs
            onTrackSubmit={onTrackSubmit}
            onRateCalculate={onRateCalculate}
            onLocationSearch={onLocationSearch}
            onShip={() => onOpenAuth('login')}
          />
        </div>
      </div>
    </section>
  );
};
