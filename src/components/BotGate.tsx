import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';

interface BotGateProps {
  children: React.ReactNode;
}

const STEPS = [
  'Checking your browser',
  'Verifying you are human',
  'Confirming your connection',
  'Loading site'
];

export const BotGate: React.FC<BotGateProps> = ({ children }) => {
  const [unlocked, setUnlocked] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const rayId = useMemo(
    () => Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(''),
    []
  );

  useEffect(() => {
    const alreadyUnlocked = sessionStorage.getItem('site_unlocked') === 'true';
    if (alreadyUnlocked) {
      setUnlocked(true);
      return;
    }

    setUnlocked(false);

    const timers = [
      setTimeout(() => setStepIndex(1), 1200),
      setTimeout(() => setStepIndex(2), 2400),
      setTimeout(() => setStepIndex(3), 3400),
      setTimeout(() => {
        setLeaving(true);
        sessionStorage.setItem('site_unlocked', 'true');
        setTimeout(() => setUnlocked(true), 500);
      }, 4600)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (unlocked && !leaving) {
    return <>{children}</>;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-[#1d1f2f] transition-opacity duration-500 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center px-6 text-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="cf-ring absolute inset-0 rounded-full" />
          <div className="absolute inset-[10px] rounded-full bg-[#1d1f2f] flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-[#f48120]" />
          </div>
        </div>

        <h1 className="text-white text-xl font-semibold mb-2">
          Verifying you are human
        </h1>
        <p className="text-gray-400 text-sm mb-10 max-w-sm">
          This may take a few seconds.
        </p>

        <div className="w-full max-w-sm space-y-2 mb-10">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className={`flex items-center justify-between text-sm transition-colors duration-300 ${
                i < stepIndex
                  ? 'text-green-400'
                  : i === stepIndex
                    ? 'text-white'
                    : 'text-gray-600'
              }`}
            >
              <span>{step}</span>
              <span>
                {i < stepIndex ? '✓' : i === stepIndex ? (
                  <span className="inline-block w-4 h-4 border-2 border-[#f48120] border-t-transparent rounded-full animate-spin" />
                ) : (
                  '•'
                )}
              </span>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-xs">
          betterfedex.com needs to review the security of your connection before proceeding.
        </p>
        <div className="flex items-center gap-2 mt-6 text-[11px] text-gray-600">
          <span>Performance &amp; security by FedEx Gate</span>
          <span className="text-gray-700">·</span>
          <span>Ray ID: {rayId}</span>
        </div>
      </div>
    </div>
  );
};
