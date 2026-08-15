import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { SiteLayout } from './layouts/SiteLayout';
import { Home } from './pages/Home';

import { TrackingPage } from './pages/TrackingPage';
import { RatesPage } from './pages/RatesPage';
import { ShipPage } from './pages/ShipPage';
import { PickupPage } from './pages/PickupPage';
import { SuppliesPage } from './pages/SuppliesPage';
import { FreightPage } from './pages/FreightPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { LocationsPage } from './pages/LocationsPage';
import { SupportPage } from './pages/SupportPage';
import { ClaimsPage } from './pages/ClaimsPage';
import { ServiceAlertsPage } from './pages/ServiceAlertsPage';
import { AccountPage } from './pages/AccountPage';
import { DeliveryManagerPage } from './pages/DeliveryManagerPage';
import { PrintPage } from './pages/PrintPage';

import {
  ShippingOverviewPage,
  InternationalPage,
  DropOffPage,
  SmallBusinessPage,
  AboutPage,
  CompanyPage,
  CareersPage,
  InvestorsPage,
  NewsroomPage,
  SustainabilityPage,
  DeveloperPage,
  MobilePage
} from './pages/ContentPages';

import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminShipmentFormPage } from './pages/admin/AdminShipmentFormPage';
import { AdminActivityPage } from './pages/admin/AdminActivityPage';
import { LiveMapPage, AdminLiveMapPage } from './pages/LiveMapPage';
import { seedSampleShipment } from './services/adminService';
import { BotGate } from './components/BotGate';

const NotFound: React.FC = () => (
  <div className="max-w-2xl mx-auto px-4 py-24 text-center">
    <div className="font-black text-6xl tracking-tighter mb-4">
      <span className="text-[#4D148C]">4</span><span className="text-[#FF6600]">0</span><span className="text-[#4D148C]">4</span>
    </div>
    <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
    <p className="text-sm text-gray-500 mt-2">The page you're looking for doesn't exist or has moved.</p>
    <Link to="/" className="inline-block mt-6 py-3 px-7 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors">
      Back to Home
    </Link>
  </div>
);

export function App() {
  React.useEffect(() => {
    seedSampleShipment();
  }, []);

  return (
    <BotGate>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />

          {/* Tracking & delivery */}
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/delivery-manager" element={<DeliveryManagerPage />} />

          {/* Shipping */}
          <Route path="/shipping" element={<ShippingOverviewPage />} />
          <Route path="/shipping/ship" element={<ShipPage />} />
          <Route path="/shipping/rates" element={<RatesPage />} />
          <Route path="/shipping/pickups" element={<PickupPage />} />
          <Route path="/shipping/supplies" element={<SuppliesPage />} />
          <Route path="/shipping/international" element={<InternationalPage />} />
          <Route path="/shipping/freight" element={<FreightPage />} />
          <Route path="/shipping/returns" element={<ReturnsPage />} />
          <Route path="/shipping/drop-off" element={<DropOffPage />} />

          {/* Locations */}
          <Route path="/locations" element={<LocationsPage />} />

          {/* Design & Print */}
          <Route path="/print" element={<PrintPage />} />

          {/* Support */}
          <Route path="/support" element={<SupportPage />} />
          <Route path="/support/claims" element={<ClaimsPage />} />
          <Route path="/service-alerts" element={<ServiceAlertsPage />} />

          {/* Account */}
          <Route path="/account" element={<AccountPage />} />

          {/* Content pages */}
          <Route path="/small-business" element={<SmallBusinessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/company" element={<CompanyPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/newsroom" element={<NewsroomPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/developer" element={<DeveloperPage />} />
          <Route path="/mobile" element={<MobilePage />} />

          {/* Live map */}
          <Route path="/live-map" element={<LiveMapPage />} />

          {/* Admin console (own layout, no site header) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="new" element={<AdminShipmentFormPage />} />
            <Route path="edit/:trackingNumber" element={<AdminShipmentFormPage />} />
            <Route path="live-map" element={<AdminLiveMapPage />} />
            <Route path="activity" element={<AdminActivityPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BotGate>
  );
}

export default App;
