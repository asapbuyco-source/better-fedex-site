import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, Building, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { authService } from '../../services/authService';
import { activityService } from '../../services/activityService';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (userName: string, email?: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountType, setAccountType] = useState<'business' | 'personal'>('business');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitted(true);
    const displayName = firstName || lastName ? `${firstName} ${lastName}`.trim() : email.split('@')[0];
    try {
      const user = mode === 'signup'
        ? await authService.signUp(email.trim(), password, displayName)
        : await authService.signIn(email.trim(), password);
      activityService.log('account', mode, mode === 'signup' ? `New account: ${user.displayName}` : `Login: ${user.displayName}`, user.email);
      onSuccess(user.displayName, user.email);
      setSubmitted(false);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please try again.');
      setSubmitted(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden z-10 border border-gray-100">
        
        {/* Header Bar */}
        <div className="bg-[#4D148C] text-white p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-black text-2xl tracking-tighter">
              <span className="text-white">Fed</span>
              <span className="text-[#FF6600]">Ex</span>
            </div>
            <p className="text-xs text-purple-200 mt-1">
              {mode === 'login' ? 'Sign in to access your shipping portal' : 'Create an account & start saving'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-purple-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-sm font-bold transition-all border-b-2 ${
              mode === 'login'
                ? 'border-[#4D148C] text-[#4D148C] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            LOG IN
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 text-sm font-bold transition-all border-b-2 ${
              mode === 'signup'
                ? 'border-[#4D148C] text-[#4D148C] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            SIGN UP & SAVE
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'signup' && (
            <>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-xs text-orange-800 font-medium">
                🎁 <strong>Special Offer:</strong> Save up to 40% on FedEx Express and 20% on Ground shipments with your new account.
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:border-[#4D148C] focus:ring-1 focus:ring-[#4D148C] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:border-[#4D148C] focus:ring-1 focus:ring-[#4D148C] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Account Purpose</label>
                <div className="flex gap-3">
                  <label className={`flex-1 p-2.5 rounded border text-xs font-bold flex items-center gap-2 cursor-pointer ${
                    accountType === 'business' ? 'border-[#4D148C] bg-purple-50 text-[#4D148C]' : 'border-gray-200 text-gray-600'
                  }`}>
                    <input
                      type="radio"
                      name="accType"
                      checked={accountType === 'business'}
                      onChange={() => setAccountType('business')}
                      className="hidden"
                    />
                    <Building className="w-4 h-4" />
                    Business
                  </label>
                  <label className={`flex-1 p-2.5 rounded border text-xs font-bold flex items-center gap-2 cursor-pointer ${
                    accountType === 'personal' ? 'border-[#4D148C] bg-purple-50 text-[#4D148C]' : 'border-gray-200 text-gray-600'
                  }`}>
                    <input
                      type="radio"
                      name="accType"
                      checked={accountType === 'personal'}
                      onChange={() => setAccountType('personal')}
                      className="hidden"
                    />
                    <User className="w-4 h-4" />
                    Personal
                  </label>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">User ID / Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@company.com"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:border-[#4D148C] focus:ring-1 focus:ring-[#4D148C] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded focus:border-[#4D148C] focus:ring-1 focus:ring-[#4D148C] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-[#4D148C] focus:ring-[#4D148C]" />
                Remember User ID
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[#0068A8] font-bold hover:underline">
                Forgot ID or Password?
              </a>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700 font-bold">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitted}
            className="w-full py-3 bg-[#FF6600] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors shadow-md flex items-center justify-center gap-2"
          >
            {submitted ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 animate-bounce" /> Authenticating...
              </span>
            ) : mode === 'login' ? (
              'LOG IN'
            ) : (
              'CREATE ACCOUNT & START SAVING'
            )}
          </button>

          <p className="text-[11px] text-gray-500 text-center leading-tight">
            By logging in or creating an account, you agree to the FedEx{' '}
            <a href="#terms" className="underline text-[#0068A8]">Terms of Use</a> and{' '}
            <a href="#privacy" className="underline text-[#0068A8]">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};
