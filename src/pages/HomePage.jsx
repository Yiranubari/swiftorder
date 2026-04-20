import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import messageSentSvg from '../assets/svg/message-sent.svg';
import completFormSvg from '../assets/svg/complete-form.svg';
import personalDataSvg from '../assets/svg/personal-data.svg';
import organizingProjectsSvg from '../assets/svg/organizing-projects.svg';
import happyCustomerSvg from '../assets/svg/happy-customer.svg';
import checkingBoxesSvg from '../assets/svg/checking-boxes.svg';
import actionSuccessfulSvg from '../assets/svg/action-successful.svg';

export default function HomePage() {
  const [phone, setPhone] = useState('');
  const [storeName, setStoreName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const sanitizePhone = (value) => {
    return value.replace(/[^0-9]/g, '');
  };

  const handlePhoneChange = (e) => {
    const cleaned = sanitizePhone(e.target.value);
    setPhone(cleaned);
    setPhoneError('');
  };

  const generateLink = () => {
    if (!phone || phone.length < 7) {
      setPhoneError('Please enter a valid phone number with country code (e.g. 2348012345678)');
      return;
    }

    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    params.set('phone', phone);
    if (storeName.trim()) params.set('name', storeName.trim());
    if (greeting.trim()) params.set('greeting', greeting.trim());

    const link = `${baseUrl}/order?${params.toString()}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = generatedLink;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="animate-fade-in-up">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-poppins font-semibold rounded-full mb-6 tracking-wide uppercase">
                For social commerce vendors
              </span>
            </div>
            <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-[3.4rem] leading-tight text-brand animate-fade-in-up delay-100">
              Turn messy DMs into{' '}
              <span className="text-accent">clean orders</span>
            </h1>
            <p className="mt-5 text-text-secondary font-rubik text-base sm:text-lg leading-relaxed max-w-lg animate-fade-in-up delay-200">
              Generate a custom link, share it with your customers, and receive perfectly formatted orders directly on WhatsApp. No backend needed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up delay-300">
              <a
                href="#generator"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-poppins font-semibold text-sm px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
              >
                Get your link
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 bg-surface-alt hover:bg-gray-100 text-text-primary font-poppins font-medium text-sm px-6 py-3.5 rounded-xl transition-all border border-border"
              >
                See how it works
              </a>
            </div>
          </div>
          <div className="relative flex justify-center animate-fade-in delay-400">
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
            <img
              src={messageSentSvg}
              alt="Order message sent illustration"
              className="w-full max-w-sm animate-float"
            />
          </div>
        </div>
      </section>

      {/* ── Trusted By / Social Proof Strip ── */}
      <section className="py-10 border-y border-border/50 bg-surface-alt">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-text-muted text-xs font-rubik uppercase tracking-widest mb-6">Built for vendors on</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-40">
            <span className="font-poppins font-bold text-lg text-brand">WhatsApp</span>
            <span className="font-poppins font-bold text-lg text-brand">Instagram</span>
            <span className="font-poppins font-bold text-lg text-brand">Facebook</span>
            <span className="font-poppins font-bold text-lg text-brand">Twitter / X</span>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-poppins font-semibold rounded-full mb-4 tracking-wide uppercase">
              Simple process
            </span>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-brand">
              How it works
            </h2>
            <p className="mt-3 text-text-secondary font-rubik max-w-lg mx-auto">
              Three steps to cleaner orders. No signup, no database, no friction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                title: 'Configure your link',
                desc: 'Enter your WhatsApp number, store name, and a custom greeting. We generate a unique order link.',
                img: personalDataSvg,
              },
              {
                step: '02',
                title: 'Share with customers',
                desc: 'Drop the link in your Instagram bio, WhatsApp status, or anywhere your customers are.',
                img: organizingProjectsSvg,
              },
              {
                step: '03',
                title: 'Receive clean orders',
                desc: 'Customers fill a simple form. Their details arrive in your WhatsApp, perfectly formatted.',
                img: happyCustomerSvg,
              },
            ].map((item, i) => (
              <div key={i} className="group text-center">
                <div className="w-full h-48 flex items-center justify-center mb-6">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-40 w-auto transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-poppins font-bold rounded-full mb-3">
                  Step {item.step}
                </div>
                <h3 className="font-poppins font-semibold text-lg text-brand mb-2">{item.title}</h3>
                <p className="text-text-secondary font-rubik text-sm leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Highlight ── */}
      <section className="py-20 md:py-28 px-6 bg-surface-alt">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <img
              src={checkingBoxesSvg}
              alt="Features illustration"
              className="w-full max-w-md"
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-poppins font-semibold rounded-full mb-4 tracking-wide uppercase">
              Why SwiftOrder
            </span>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-brand leading-tight">
              Simple, powerful,{' '}<br className="hidden sm:block" />
              easy&#8209;to&#8209;use
            </h2>
            <div className="mt-8 space-y-5">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  ),
                  title: 'Zero backend',
                  desc: 'Pure frontend. No servers, no databases, no costs.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                  ),
                  title: 'Mobile first',
                  desc: 'Designed for thumbs. Big inputs, fast flow, instant send.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  ),
                  title: 'WhatsApp native',
                  desc: 'Orders land right in your WhatsApp chat. No new apps to learn.',
                },
              ].map((feat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-brand text-sm">{feat.title}</h4>
                    <p className="text-text-secondary font-rubik text-sm mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Link Generator Section ── */}
      <section id="generator" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-poppins font-semibold rounded-full mb-4 tracking-wide uppercase">
              Get started
            </span>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-brand leading-tight">
              Generate your{' '}<br className="hidden sm:block" />
              order link
            </h2>
            <p className="mt-3 text-text-secondary font-rubik max-w-md">
              Fill in your details below and we'll create a custom checkout link you can share anywhere.
            </p>
            <div className="mt-8 hidden md:block">
              <img
                src={completFormSvg}
                alt="Form illustration"
                className="w-full max-w-xs"
              />
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <div className="space-y-5">
              {/* Phone */}
              <div>
                <label className="block font-poppins font-medium text-sm text-brand mb-1.5">
                  WhatsApp Number <span className="text-accent">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="e.g. 2348012345678"
                  className={`w-full px-4 py-3 rounded-xl border font-rubik text-sm transition-all bg-surface-alt placeholder:text-text-muted ${
                    phoneError ? 'border-accent' : 'border-border'
                  }`}
                />
                {phoneError && (
                  <p className="mt-1.5 text-accent text-xs font-rubik">{phoneError}</p>
                )}
                <p className="mt-1.5 text-text-muted text-xs font-rubik">
                  Include country code, no spaces or + sign
                </p>
              </div>

              {/* Store Name */}
              <div>
                <label className="block font-poppins font-medium text-sm text-brand mb-1.5">
                  Store Name <span className="text-text-muted font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. Boss Bakery"
                  className="w-full px-4 py-3 rounded-xl border border-border font-rubik text-sm bg-surface-alt placeholder:text-text-muted transition-all"
                />
              </div>

              {/* Greeting */}
              <div>
                <label className="block font-poppins font-medium text-sm text-brand mb-1.5">
                  Custom Greeting <span className="text-text-muted font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder="e.g. Thanks for shopping with us!"
                  className="w-full px-4 py-3 rounded-xl border border-border font-rubik text-sm bg-surface-alt placeholder:text-text-muted transition-all"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generateLink}
                className="w-full bg-accent hover:bg-accent-hover text-white font-poppins font-semibold text-sm py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 cursor-pointer"
              >
                Generate Link
              </button>

              {/* Generated Link Output */}
              {generatedLink && (
                <div className="animate-scale-in mt-2 p-4 bg-success-light rounded-xl border border-success/20">
                  <p className="text-success font-poppins font-semibold text-xs mb-2 flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    Link generated!
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedLink}
                      className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-surface text-xs font-rubik text-text-primary truncate"
                    />
                    <button
                      onClick={copyToClipboard}
                      className={`shrink-0 px-4 py-2.5 rounded-lg font-poppins font-semibold text-xs transition-all cursor-pointer ${
                        copied
                          ? 'bg-success text-white'
                          : 'bg-brand text-white hover:bg-brand-light'
                      }`}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / Bottom Banner ── */}
      <section className="py-20 md:py-28 px-6 bg-brand text-white text-center">
        <div className="max-w-2xl mx-auto">
          <img
            src={actionSuccessfulSvg}
            alt="Success illustration"
            className="h-40 mx-auto mb-8"
          />
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl">
            Ready to simplify your orders?
          </h2>
          <p className="mt-4 text-white/60 font-rubik max-w-md mx-auto">
            Join vendors who've ditched the chaos of messy DMs. It takes less than 30 seconds.
          </p>
          <a
            href="#generator"
            className="inline-flex items-center gap-2 mt-8 bg-accent hover:bg-accent-hover text-white font-poppins font-semibold text-sm px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
          >
            Generate your link now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
