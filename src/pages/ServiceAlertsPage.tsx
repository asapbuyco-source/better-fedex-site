import React, { useState } from 'react';
import { PageHero } from '../components/Page/PageHero';
import { AlertTriangle, CheckCircle2, Search } from 'lucide-react';

const ALERTS = [
  { region: 'Southeast U.S.', type: 'Weather', severity: 'warning', title: 'Hurricane season advisory', desc: 'Potential service delays in FL, GA, and the Carolinas. Check tracking for updated delivery estimates.' },
  { region: 'Northern Plains', type: 'Weather', severity: 'warning', title: 'Winter storm impacts', desc: 'Snow and ice may delay Ground and Freight pickups in ND, SD, MN, and WI through Friday.' },
  { region: 'Southern California', type: 'Operational', severity: 'info', title: 'Facility maintenance', desc: 'The Los Angeles hub is operating at reduced capacity Sunday 2-6 AM. No customer action needed.' },
  { region: 'International — EU', type: 'Customs', severity: 'info', title: 'Updated customs forms', desc: 'New EORI validation is now enforced for commercial imports to EU member states.' },
];

export const ServiceAlertsPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? ALERTS : ALERTS.filter(a => a.type === filter);

  return (
    <div>
      <PageHero
        title="Service Alerts"
        subtitle="Current weather, operational, and customs notices that may affect pickup and delivery times."
        breadcrumb={[{ label: 'Support', to: '/support' }, { label: 'Service Alerts' }]}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-1.5 mb-6 text-xs">
          {['All', 'Weather', 'Operational', 'Customs'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3.5 py-2 rounded-full font-bold transition-colors ${
                filter === t
                  ? 'bg-[#4D148C] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(alert => (
            <div
              key={alert.title}
              className={`rounded-xl border p-5 ${
                alert.severity === 'warning' ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {alert.severity === 'warning'
                  ? <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
                  : <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                  {alert.region} • {alert.type}
                </span>
              </div>
              <h3 className="text-sm font-bold text-gray-900">{alert.title}</h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{alert.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-purple-50 rounded-xl border border-purple-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-sm text-purple-900">
            <Search className="w-5 h-5 shrink-0" />
            <span>Is your package affected? Check its tracking status for an updated delivery estimate.</span>
          </div>
          <a href="/tracking" className="py-2.5 px-5 bg-[#4D148C] hover:bg-[#330066] text-white font-bold text-xs rounded transition-colors whitespace-nowrap">
            Track a Package
          </a>
        </div>
      </div>
    </div>
  );
};
