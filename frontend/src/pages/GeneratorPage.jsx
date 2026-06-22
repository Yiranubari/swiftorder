import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import completFormSvg from '../assets/svg/complete-form.svg';

export default function GeneratorPage() {
  const [phone, setPhone] = useState('');
  const [storeName, setStoreName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const sanitizePhone = (value) => value.replace(/[^0-9]/g, '');

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
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 md:pt-36 md:pb-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-poppins font-semibold rounded-full mb-4 tracking-wide uppercase">
              Get started
            </span>
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-brand leading-tight">
              Generate your <br className="hidden sm:block" />
              order link
            </h1>
            <p className="mt-3 text-text-secondary font-rubik max-w-md">
              Fill in your details below and we'll create a custom checkout link
              you can share anywhere.
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
                  <p className="mt-1.5 text-accent text-xs font-rubik">
                    {phoneError}
                  </p>
                )}
                <p className="mt-1.5 text-text-muted text-xs font-rubik">
                  Include country code, no spaces or + sign
                </p>
              </div>

              <div>
                <label className="block font-poppins font-medium text-sm text-brand mb-1.5">
                  Store Name{' '}
                  <span className="text-text-muted font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. Boss Bakery"
                  className="w-full px-4 py-3 rounded-xl border border-border font-rubik text-sm bg-surface-alt placeholder:text-text-muted transition-all"
                />
              </div>

              <div>
                <label className="block font-poppins font-medium text-sm text-brand mb-1.5">
                  Custom Greeting{' '}
                  <span className="text-text-muted font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder="e.g. Thanks for shopping with us!"
                  className="w-full px-4 py-3 rounded-xl border border-border font-rubik text-sm bg-surface-alt placeholder:text-text-muted transition-all"
                />
              </div>

              <button
                onClick={generateLink}
                className="w-full bg-accent hover:bg-accent-hover text-white font-poppins font-semibold text-sm py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 cursor-pointer"
              >
                Generate Link
              </button>

              {generatedLink && (
                <div className="animate-scale-in mt-2 p-4 bg-success-light rounded-xl border border-success/20">
                  <p className="text-success font-poppins font-semibold text-xs mb-2 flex items-center gap-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
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
      </main>

      <Footer />
    </div>
  );
}
