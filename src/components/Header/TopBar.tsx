import React, { useState } from 'react';
import { Tag, ArrowRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const TopBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { openAuth } = useApp();

  if (dismissed) return null;

  return (
    <div className="bg-[#330066] text-white text-xs md:text-sm py-2 px-4 transition-all border-b border-[#4D148C]">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1 bg-[#FF6600] text-white font-bold text-[10px] md:text-xs px-2 py-0.5 rounded tracking-wide uppercase shrink-0">
            <Tag className="w-3 h-3" /> Offer
          </span>
          <span className="font-medium text-gray-100 truncate">
            Open a free account and save up to <strong className="text-white font-bold">40% on FedEx Express®</strong> and <strong className="text-white font-bold">20% on FedEx Ground®</strong>.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/account?mode=signup"
            onClick={(e) => { e.preventDefault(); openAuth('signup'); }}
            className="hidden sm:inline-flex items-center gap-1 text-[#FF6600] font-bold hover:underline hover:text-white transition-colors"
          >
            Open Account <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-300 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
