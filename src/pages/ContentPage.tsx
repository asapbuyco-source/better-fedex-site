import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/Page/PageHero';
import { ContentPageData } from '../data/contentPages';
import { CheckCircle2 } from 'lucide-react';

export const ContentPage: React.FC<{ data: ContentPageData }> = ({ data }) => {
  return (
    <div>
      <PageHero
        title={data.title}
        subtitle={data.subtitle}
        breadcrumb={data.breadcrumb}
      >
        {data.cta && (
          <Link
            to={data.cta.to}
            className="inline-block py-3 px-7 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors"
          >
            {data.cta.label}
          </Link>
        )}
      </PageHero>

      {data.heroImage && (
        <div
          className="w-full h-56 md:h-72 bg-cover bg-center bg-gray-100"
          style={{ backgroundImage: `url('${data.heroImage}')` }}
          role="img"
          aria-label={data.title}
        />
      )}

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-10">
        {data.cards && data.cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {data.cards.map(card => (
              <div key={card.title} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#4D148C] hover:shadow-md transition-all">
                <h3 className="text-sm font-bold text-[#4D148C]">{card.title}</h3>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        )}

        <div className="max-w-3xl space-y-8">
          {data.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{section.heading}</h2>
              {section.body && (
                <p className="text-sm text-gray-600 leading-relaxed">{section.body}</p>
              )}
              {section.bullets && (
                <ul className="mt-2 space-y-2">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
