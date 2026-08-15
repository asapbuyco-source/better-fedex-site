import React from 'react';
import { MapPin, PackageCheck, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface ShippingSectionProps {
  onSelectAction: (actionType: string) => void;
}

export const ShippingSection: React.FC<ShippingSectionProps> = ({ onSelectAction }) => {
  return (
    <section className="py-12 md:py-16 bg-[#FAFAFA] border-b border-gray-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        
        <div className="bg-gradient-to-r from-[#4D148C] to-[#330066] text-white rounded-2xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-[#FF6600] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                <PackageCheck className="w-3.5 h-3.5" /> Retail Network Drop-off
              </span>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Drop off your package.<br />Done. Get on with your day.
              </h2>

              <p className="text-xs sm:text-sm text-purple-100 max-w-xl leading-relaxed">
                No need to wait in line. Bring your pre-labeled FedEx Express or FedEx Ground packages to over 60,000 retail drop-off locations nationwide.
              </p>

              {/* Retail Partner Logos / Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-purple-200 mr-1">Convenient Partners:</span>
                <span className="bg-white/10 text-white font-bold text-xs px-2.5 py-1 rounded border border-white/20">Walgreens</span>
                <span className="bg-white/10 text-white font-bold text-xs px-2.5 py-1 rounded border border-white/20">Dollar General</span>
                <span className="bg-white/10 text-white font-bold text-xs px-2.5 py-1 rounded border border-white/20">FedEx Office</span>
                <span className="bg-white/10 text-white font-bold text-xs px-2.5 py-1 rounded border border-white/20">24/7 Drop Boxes</span>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => onSelectAction('locations')}
                  className="py-3 px-5 bg-[#FF6600] hover:bg-[#E05500] text-white font-bold text-xs sm:text-sm rounded transition-colors shadow-md flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" /> Find Drop-off Location
                </button>

                <button
                  onClick={() => onSelectAction('ship')}
                  className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded border border-white/30 transition-colors flex items-center gap-2"
                >
                  <Truck className="w-4 h-4" /> Create Shipping Label
                </button>
              </div>
            </div>

            {/* Right Card Step Checklist */}
            <div className="lg:col-span-5 bg-white text-gray-900 p-6 rounded-xl shadow-lg border border-purple-200 space-y-4">
              <h3 className="text-base font-extrabold text-[#4D148C] pb-2 border-b border-gray-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#FF6600]" /> 4 Easy Drop-Off Steps
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-[#4D148C] font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <strong className="text-gray-900 block font-bold">Create shipping label online</strong>
                    <span className="text-gray-500">Pay and print label from your desktop or mobile device.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-[#4D148C] font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <strong className="text-gray-900 block font-bold">Attach label securely</strong>
                    <span className="text-gray-500">Affix to top of your box or FedEx envelope.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-[#4D148C] font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <strong className="text-gray-900 block font-bold">Drop off at local partner</strong>
                    <span className="text-gray-500">Hand package to clerk or place in 24/7 Drop Box.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-[#4D148C] font-bold flex items-center justify-center shrink-0">4</div>
                  <div>
                    <strong className="text-gray-900 block font-bold">Track in real time</strong>
                    <span className="text-gray-500">Receive scan notifications as package travels.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectAction('track')}
                className="w-full py-2.5 text-xs font-bold text-[#4D148C] hover:text-[#FF6600] flex items-center justify-center gap-1 mt-2 border-t border-gray-100 pt-3"
              >
                Track an Existing Shipment <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
