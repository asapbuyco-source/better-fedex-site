import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/Page/PageHero';
import { Search, HelpCircle, MessageSquare, FileText, Truck, CreditCard, Package, ChevronDown, Phone, Send, CheckCircle2 } from 'lucide-react';
import { activityService } from '../services/activityService';

const FAQS: { q: string; a: string; category: string }[] = [
  { q: 'Where is my package?', a: 'Enter your tracking number on the Tracking page for real-time status. If tracking shows "Delivered" but you can\'t find it, check around your property, with neighbors, and household members. If still missing, file a claim within 60 days.', category: 'Tracking' },
  { q: 'How do I change my delivery?', a: 'Sign up for FedEx Delivery Manager® to leave delivery instructions, request holds at retail locations, or schedule delivery windows — free for residential addresses.', category: 'Delivery' },
  { q: 'What time will my package arrive?', a: 'Delivery times depend on service: FedEx First Overnight® by 8:00 AM, Priority Overnight® by 10:30 AM, 2Day® by 4:30 PM (8:00 PM residential), and Ground/Home Delivery by end of day.', category: 'Delivery' },
  { q: 'How much does shipping cost?', a: 'Costs vary by service, weight, dimensions, and distance. Use our Rate Calculator for an instant estimate. Account holders save up to 40% off Express® and 20% off Ground® rates.', category: 'Shipping' },
  { q: 'How do I schedule a pickup?', a: 'Schedule online via the Pickup page — one-time or recurring. Pickup fees may apply for Ground; Express pickups are free with an account.', category: 'Shipping' },
  { q: 'How do I file a claim?', a: 'File claims for lost or damaged shipments within 60 calendar days of delivery (21 days for freight). Use the File a Claim page with your tracking number, photos of damage, and value documentation.', category: 'Claims' },
  { q: 'What is the money-back guarantee?', a: 'Select FedEx Express® services include a money-back guarantee. If we miss our published delivery time, you may request a refund or credit. The guarantee may be suspended or modified for some services.', category: 'Billing' },
  { q: 'How do I drop off a package?', a: 'Create a label online, attach it, and drop off at any of 60,000+ locations including FedEx Office, Walgreens, Dollar General, and 24/7 drop boxes. Find the nearest one on the Locations page.', category: 'Shipping' },
  { q: 'Can I ship internationally?', a: 'Yes — we ship to 220+ countries and territories. Check the International Shipping Guide for customs documentation, duties & taxes, and service availability by destination.', category: 'Shipping' },
  { q: 'How do I return a package?', a: 'Use the Manage a Return page to create a return label, then drop off at any FedEx location. Many online retailers also offer printable return labels via their own portals.', category: 'Shipping' },
];

export const SupportPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ from: 'bot' | 'user'; text: string }[]>([
    { from: 'bot', text: 'Hi, I\'m the FedEx Virtual Assistant. Ask me about tracking, rates, pickups, or claims — or type "agent" for contact options.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const filtered = FAQS.filter(faq =>
    !query.trim() ||
    faq.q.toLowerCase().includes(query.toLowerCase()) ||
    faq.a.toLowerCase().includes(query.toLowerCase()) ||
    faq.category.toLowerCase().includes(query.toLowerCase())
  );

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages(m => [...m, { from: 'user', text }]);
    setChatInput('');

    let reply: string;
    const t = text.toLowerCase();
    activityService.log(
      'message',
      'chat',
      `Chat message: "${text.slice(0, 80)}${text.length > 80 ? '…' : ''}"`,
      'Sent to the FedEx Virtual Assistant'
    );
    if (t.includes('agent') || t.includes('human') || t.includes('call')) {
      reply = 'You can reach us 24/7 at 1.800.GoFedEx (1.800.463.3339), or say "email" for the contact form.';
    } else if (t.includes('track') || t.includes('where')) {
      reply = 'To track a package, head to the Tracking page and enter your tracking number. It starts with the number on your shipping label.';
    } else if (t.includes('rate') || t.includes('cost') || t.includes('price')) {
      reply = 'For instant estimates, use our Rate & Transit Times calculator. Account holders save up to 40%.';
    } else if (t.includes('pickup')) {
      reply = 'You can schedule a one-time or recurring pickup on the Schedule a Pickup page.';
    } else if (t.includes('claim') || t.includes('damage') || t.includes('lost')) {
      reply = 'Sorry to hear that. File a claim on the File a Claim page within 60 days of the shipment date.';
    } else if (t.includes('hour') || t.includes('open')) {
      reply = 'FedEx Office locations typically open 7-9 AM and close 6-11 PM; drop boxes are available 24/7. Check exact hours on the Locations page.';
    } else {
      reply = 'I can help with tracking, rates, pickups, returns, and claims. Try asking "where is my package" or type "agent" for human support.';
    }
    setTimeout(() => setChatMessages(m => [...m, { from: 'bot', text: reply }]), 600);
  };

  return (
    <div>
      <PageHero
        title="Customer Support"
        subtitle="Get instant answers, step-by-step help, and 24/7 support for tracking, shipping, billing, and claims."
        breadcrumb={[{ label: 'Support' }]}
      >
        <div
          className="rounded-xl h-36 md:h-44 bg-cover bg-center border border-gray-200 shadow-lg mb-4"
          style={{ backgroundImage: "url('/images/fedex-courier.jpg')" }}
          role="img"
          aria-label="FedEx customer support"
        />
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search help articles — try 'where is my package'"
            className="w-full h-14 pl-12 pr-4 text-sm border-2 border-gray-300 rounded-lg focus:border-[#4D148C] outline-none font-medium text-gray-800 bg-white"
          />
        </div>
      </PageHero>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
        {/* Quick help tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Package, title: 'Track a Package', desc: 'Status & delivery updates', to: '/tracking' },
            { icon: Truck, title: 'Shipping Help', desc: 'Pickups, drop-offs & supplies', to: '/shipping' },
            { icon: FileText, title: 'File a Claim', desc: 'Lost or damaged shipments', to: '/support/claims' },
            { icon: CreditCard, title: 'Billing & Invoicing', desc: 'Payments and refunds', to: '/account' },
          ].map((tile) => (
            <Link key={tile.title} to={tile.to} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#4D148C] hover:shadow-md transition-all group">
              <div className="w-11 h-11 rounded-full bg-purple-50 text-[#4D148C] flex items-center justify-center mb-3 group-hover:bg-[#4D148C] group-hover:text-white transition-colors">
                <tile.icon className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-gray-900">{tile.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{tile.desc}</div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FAQ */}
          <div className="lg:col-span-7">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#4D148C]" /> Frequently Asked Questions
              {query && <span className="text-xs font-normal text-gray-500">({filtered.length} results)</span>}
            </h2>
            <div className="space-y-2.5">
              {filtered.length === 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-sm text-gray-500">
                  No articles matched "{query}". Try different keywords or ask the virtual assistant.
                </div>
              )}
              {filtered.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setExpanded(expanded === idx ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-gray-900">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#4D148C] shrink-0 ml-3 transition-transform ${expanded === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {expanded === idx && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                      <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-[#4D148C] px-2 py-0.5 rounded">{faq.category}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Virtual assistant + contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
              <div className="bg-[#4D148C] text-white px-5 py-4 flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-[#FF6600]" />
                <div>
                  <div className="text-sm font-bold">FedEx Virtual Assistant</div>
                  <div className="text-[11px] text-purple-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" /> Online now
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-72 overflow-y-auto min-h-[180px] bg-gray-50">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-3.5 py-2 rounded-xl text-xs leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-[#4D148C] text-white rounded-br-sm'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={sendChat} className="p-3 border-t border-gray-200 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 h-10 px-3 text-sm border border-gray-300 rounded focus:border-[#4D148C] outline-none"
                />
                <button type="submit" className="w-10 h-10 bg-[#FF6200] hover:bg-[#E05500] text-white rounded flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="bg-purple-50 rounded-xl border border-purple-200 p-5 space-y-3">
              <h3 className="text-sm font-bold text-[#4D148C]">Still need help?</h3>
              <div className="flex items-center gap-3 text-sm text-purple-900">
                <Phone className="w-5 h-5 shrink-0" />
                <div>
                  <div className="font-bold">1.800.GoFedEx</div>
                  <div className="text-xs">1.800.463.3339 — available 24/7</div>
                </div>
              </div>
              <Link to="/support/claims" className="block py-2.5 px-4 bg-white border border-purple-200 hover:border-[#4D148C] rounded text-xs font-bold text-[#4D148C] text-center transition-colors">
                File a Claim Online
              </Link>
            </div>

            {/* Contact form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const inputCls = "w-full h-11 px-3.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none font-medium";
  const labelCls = "text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    activityService.log(
      'message',
      'contact',
      `Contact form: ${name || 'Anonymous'}`,
      message,
      { email }
    );
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-xl border border-emerald-200 p-6 text-center space-y-2">
        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
        <h3 className="text-sm font-bold text-gray-900">Message sent</h3>
        <p className="text-xs text-gray-500">Thanks {name || 'there'} — our support team will reply to {email} within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Email Customer Support</h3>
      <div>
        <label className={labelCls}>Your Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Jordan Smith" required />
      </div>
      <div>
        <label className={labelCls}>Email Address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" required />
      </div>
      <div>
        <label className={labelCls}>Message</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm border-2 border-gray-300 rounded focus:border-[#4D148C] outline-none"
          placeholder="How can we help?"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-[#FF6200] hover:bg-[#E05500] text-white font-bold text-sm rounded transition-colors"
      >
        SEND MESSAGE
      </button>
    </form>
  );
};
