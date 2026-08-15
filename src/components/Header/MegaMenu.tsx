import React from 'react';
import { NavItem } from '../../data/navigation';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  item: NavItem;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ item, isOpen, onNavigate }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 border-b-2 border-b-[#4D148C] z-40 animate-fadeIn"
      role="region"
      aria-label={`${item.label} Menu`}
    >
      <div className="max-w-[1320px] mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {item.columns.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider pb-1 border-b border-gray-100">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <button
                        onClick={() => onNavigate(link.href)}
                        className="group block w-full text-left p-1 -mx-1 rounded hover:bg-purple-50/60 transition-colors"
                      >
                        <div className="flex items-center justify-between text-sm font-bold text-gray-800 group-hover:text-[#4D148C]">
                          <span className="flex items-center gap-1.5">
                            {link.label}
                            {link.badge && (
                              <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 bg-purple-100 text-[#4D148C] rounded">
                                {link.badge}
                              </span>
                            )}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#FF6600] transition-opacity" />
                        </div>
                        {link.desc && (
                          <p className="text-xs text-gray-500 font-normal mt-0.5 leading-snug">
                            {link.desc}
                          </p>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {item.cta && (
            <div className="md:col-span-1 bg-gradient-to-br from-[#4D148C] to-[#330066] text-white p-5 rounded-lg flex flex-col justify-between shadow-md">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-black text-[#FF6600] bg-white/10 px-2 py-0.5 rounded">
                  FedEx Highlight
                </span>
                <h4 className="text-lg font-bold mt-2 leading-tight">
                  {item.cta.text}
                </h4>
                <p className="text-xs text-purple-100 mt-2 leading-relaxed opacity-90">
                  {item.cta.subtext}
                </p>
              </div>

              <button
                onClick={() => onNavigate(item.cta?.target || '/account')}
                className="mt-4 w-full py-2.5 px-4 bg-[#FF6600] hover:bg-[#E05500] text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1.5 shadow"
              >
                {item.cta.actionLabel} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
