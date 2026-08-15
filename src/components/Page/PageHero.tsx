import React from 'react';
import { Link } from 'react-router-dom';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; to?: string }[];
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, breadcrumb, children }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6 md:py-8">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="text-xs text-gray-500 mb-3 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#4D148C] hover:underline">Home</Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <span className="opacity-60">/</span>
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-[#4D148C] hover:underline">{crumb.label}</Link>
                ) : (
                  <span className="text-gray-800 font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#333333]">{title}</h1>
        {subtitle && <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-3xl">{subtitle}</p>}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </div>
  );
};
