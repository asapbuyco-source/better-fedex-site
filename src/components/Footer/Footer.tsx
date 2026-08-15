import React from 'react';
import { Globe, ArrowUp, Smartphone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.931-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z"/></svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);
const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
);

const SOCIAL_LINKS: { label: string; href: string; Icon: React.ComponentType }[] = [
  { label: 'Email', href: '#email', Icon: () => <Mail className="w-4 h-4" /> },
  { label: 'Facebook', href: 'https://www.facebook.com/FedEx/', Icon: FacebookIcon },
  { label: 'Twitter', href: 'https://twitter.com/fedex', Icon: TwitterIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/fedex/', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/fedex', Icon: LinkedinIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/user/fedex/', Icon: YoutubeIcon },
  { label: 'Pinterest', href: 'https://www.pinterest.com/FedEx/', Icon: PinterestIcon },
];

const COMPANY_LINKS: { label: string; to: string }[] = [
  { label: 'About FedEx', to: '/about' },
  { label: 'Our Portfolio', to: '/about/company' },
  { label: 'Investor Relations', to: '/investors' },
  { label: 'Careers', to: '/careers' },
  { label: 'FedEx Blog', to: '/newsroom' },
  { label: 'Corporate Responsibility', to: '/sustainability' },
  { label: 'Newsroom', to: '/newsroom' },
];

const MORE_LINKS: { label: string; to: string }[] = [
  { label: 'FedEx Compatible', to: '/developer' },
  { label: 'FedEx Developer Portal', to: '/developer' },
  { label: 'FedEx Logistics', to: '/shipping/freight' },
  { label: 'Small Business Center', to: '/small-business' },
  { label: 'Live Shipment Map', to: '/live-map' },
  { label: 'Admin Console', to: '/admin' },
];

export const Footer: React.FC = () => {
  const { openLanguage } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] text-gray-300 pt-12 pb-8 border-t-4 border-[#FF6600]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-800">
          
          {/* Column 1: Brand & Language */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-black text-3xl tracking-tighter flex items-center">
              <span className="text-white">Fed</span>
              <span className="text-[#FF6600]">Ex</span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Global express shipping, freight logistics, e-commerce tools, and retail printing services. Connecting people and possibilities across 220+ countries and territories.
            </p>

            <button
              onClick={openLanguage}
              className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded border border-gray-700 text-xs font-bold transition-colors"
            >
              <Globe className="w-4 h-4 text-[#FF6600]" />
              <span>United States - English</span>
            </button>
          </div>

          {/* Column 2: Our Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-100">
              OUR COMPANY
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-white hover:underline">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: More From FedEx */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-100">
              MORE FROM FEDEX
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {MORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-white hover:underline">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow FedEx */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-100">
              FOLLOW FEDEX
            </h4>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <button
                  key={label}
                  onClick={() => window.open(href, '_blank')}
                  title={label}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-900 hover:bg-[#4D148C] text-gray-300 hover:text-white rounded-full border border-gray-700 transition-colors flex items-center justify-center"
                >
                  <Icon />
                </button>
              ))}
            </div>

            <h4 className="text-xs font-black uppercase tracking-wider text-gray-100 pt-2">
              FEDEX MOBILE APP
            </h4>
            <Link
              to="/mobile"
              className="inline-flex py-2 px-3 bg-gray-900 hover:bg-gray-800 text-white rounded border border-gray-700 text-xs font-bold items-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-[#FF6600]" /> Download Mobile App
            </Link>
          </div>

        </div>

        {/* Legal Links & Back to Top */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span>© FedEx 1995-2026</span>
            <span className="hidden md:inline">|</span>
            <Link to="/about" className="hover:text-white hover:underline">Site Map</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/about" className="hover:text-white hover:underline">Terms of Use</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/support" className="hover:text-white hover:underline">Security & Fraud</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/support" className="hover:text-white hover:underline">Privacy Policy</Link>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 bg-gray-900 hover:bg-[#4D148C] text-white rounded-full border border-gray-700 transition-colors flex items-center justify-center"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
