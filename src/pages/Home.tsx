import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero/Hero';
import { QuickLinks } from '../components/QuickLinks/QuickLinks';
import { BenefitSection } from '../components/BenefitSection/BenefitSection';
import { ShippingSection } from '../components/ShippingSection/ShippingSection';
import { PrintSection } from '../components/PrintSection/PrintSection';
import { BusinessSection } from '../components/BusinessSection/BusinessSection';
import { RatesInfoSection } from '../components/RatesInfoSection/RatesInfoSection';

import { CalculateRateInput } from '../services/rateService';
import { useApp } from '../context/AppContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { openAuth } = useApp();

  const handleTrackSubmit = (trackingNumber: string) => {
    navigate(`/tracking?number=${encodeURIComponent(trackingNumber)}`);
  };

  const handleRateCalculate = (input: CalculateRateInput) => {
    navigate(`/shipping/rates?from=${encodeURIComponent(input.fromZip)}&to=${encodeURIComponent(input.toZip)}&weight=${input.weightLbs}&auto=1`);
  };

  const handleLocationSearch = (query: string) => {
    navigate(`/locations?q=${encodeURIComponent(query)}`);
  };

  const handleSelectAction = (actionType: string) => {
    const routes: Record<string, string> = {
      'track': '/tracking',
      'rate': '/shipping/rates',
      'rates': '/shipping/rates',
      'ship': '/shipping/ship',
      'locations': '/locations',
      'location': '/locations',
      'find-loc': '/locations',
      'account': '/account?mode=signup',
      'fdm': '/delivery-manager',
      'print': '/print',
      'print-promo': '/print',
      'freight': '/shipping/freight',
      'alerts': '/service-alerts',
      'returns': '/shipping/returns',
      'company': '/about',
      'developer': '/developer',
      'international': '/shipping/international',
      'support': '/support',
      'smallbiz': '/small-business'
    };
    const route = routes[actionType] || '/';
    if (route.startsWith('/account?mode=signup')) {
      navigate('/account?mode=signup');
    } else {
      navigate(route);
    }
  };

  return (
    <div className="min-h-screen">
      <Hero
        onTrackSubmit={handleTrackSubmit}
        onRateCalculate={handleRateCalculate}
        onLocationSearch={handleLocationSearch}
        onOpenAuth={openAuth}
      />

      <QuickLinks onSelectAction={handleSelectAction} />

      {/* Account promo banner */}
      <section className="relative py-12 md:py-16 bg-[#4D148C] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/fedex-small-business.jpg')" }}
        />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              Ready to save on every shipment?
            </h2>
            <p className="text-sm sm:text-base text-purple-100 mt-2">
              Open a FedEx account and ship coast to coast for as little as $10.54.
            </p>
          </div>
          <button
            onClick={() => navigate('/account?mode=signup')}
            className="py-3 px-8 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors whitespace-nowrap shrink-0"
          >
            Start saving today
          </button>
        </div>
      </section>

      <BenefitSection onSelectAction={handleSelectAction} />

      <ShippingSection onSelectAction={handleSelectAction} />

      <PrintSection onSelectAction={handleSelectAction} />

      <BusinessSection
        onSelectAction={handleSelectAction}
        onOpenAuth={openAuth}
      />

      <RatesInfoSection onSelectAction={handleSelectAction} />
    </div>
  );
};
