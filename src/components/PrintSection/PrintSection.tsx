import React from 'react';
import { Printer, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface PrintSectionProps {
  onSelectAction: (actionType: string) => void;
}

export const PrintSection: React.FC<PrintSectionProps> = ({ onSelectAction }) => {
  return (
    <section className="py-12 md:py-20 bg-white border-b border-gray-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Media Image */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 aspect-4/3 bg-gray-100 group">
              <img
                src="/images/fedex-print.jpg"
                alt="FedEx Office Design and Print Services"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="bg-[#FF6600] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    FedEx Office®
                  </span>
                  <h3 className="text-xl font-black mt-1">Same-Day In-Store Pickup Available</h3>
                  <p className="text-xs text-gray-200 mt-1">Order online by 12 PM for local same-day printing.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> DESIGN & PRINT SOLUTIONS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-900 mt-1">
                Stand out with custom high-quality print.
              </h2>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                From business cards and promotional banners to marketing flyers and custom photo prints, FedEx Office brings your ideas to life with expert consulting.
              </p>
            </div>

            {/* Print Product Options Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4D148C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Business Cards</h4>
                  <p className="text-[11px] text-gray-500">Premium cardstock & finishes</p>
                </div>
              </div>

              <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4D148C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Banners & Signs</h4>
                  <p className="text-[11px] text-gray-500">Vinyl, yard signs, trade show</p>
                </div>
              </div>

              <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4D148C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Flyers & Posters</h4>
                  <p className="text-[11px] text-gray-500">Full color marketing materials</p>
                </div>
              </div>

              <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4D148C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Passport Photos</h4>
                  <p className="text-[11px] text-gray-500">Fast in-store photo service</p>
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={() => onSelectAction('print')}
                className="py-3 px-6 bg-[#4D148C] hover:bg-[#330066] text-white font-bold text-xs sm:text-sm rounded transition-colors shadow-md flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#FF6600]" /> Explore Print Marketplace <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
