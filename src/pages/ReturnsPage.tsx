import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/Page/PageHero';
import { Undo2, PackageCheck, ClipboardList } from 'lucide-react';

export const ReturnsPage: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Manage a Return"
        subtitle="Create a return label, schedule a pickup, or drop off at any FedEx location. Returns are easy for you and your customers."
        breadcrumb={[{ label: 'Shipping', to: '/shipping' }, { label: 'Manage a Return' }]}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-[#4D148C] flex items-center justify-center mb-4">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-gray-900">1. Create a Return Label</h2>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed flex-1">
              Enter the sender and recipient details, select a service, and pay. Email the label to your customer or print it directly.
            </p>
            <Link
              to="/shipping/ship?return=1"
              className="mt-5 py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-xs rounded transition-colors text-center"
            >
              START A RETURN
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-[#4D148C] flex items-center justify-center mb-4">
              <PackageCheck className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-gray-900">2. Pack & Attach</h2>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed flex-1">
              Pack items securely in the original packaging if possible. Attach the return label so it fully covers the original label.
            </p>
            <Link
              to="/shipping/supplies"
              className="mt-5 py-3 border-2 border-[#4D148C] hover:bg-purple-50 text-[#4D148C] font-bold text-xs rounded transition-colors text-center"
            >
              ORDER SUPPLIES
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-[#4D148C] flex items-center justify-center mb-4">
              <Undo2 className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-gray-900">3. Drop Off or Schedule Pickup</h2>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed flex-1">
              Drop off at any of 60,000+ FedEx locations — no receipt needed. Or have a courier pick it up from your door.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Link to="/locations" className="py-3 bg-[#4D148C] hover:bg-[#330066] text-white font-bold text-xs rounded transition-colors text-center">
                FIND DROP-OFF
              </Link>
              <Link to="/shipping/pickups" className="py-3 border-2 border-[#4D148C] hover:bg-purple-50 text-[#4D148C] font-bold text-xs rounded transition-colors text-center">
                SCHEDULE PICKUP
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-purple-50 rounded-xl border border-purple-200 p-6">
          <h3 className="text-sm font-bold text-[#4D148C]">Merchant? Offer printable & QR-code returns</h3>
          <p className="text-xs text-purple-900 mt-1.5 leading-relaxed max-w-3xl">
            Add FedEx return options to your checkout with pre-paid labels or QR codes — customers just show the code at a FedEx Office
            and we print the label for them. Integrate via the <Link to="/developer" className="font-bold underline">FedEx Developer Portal</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};
