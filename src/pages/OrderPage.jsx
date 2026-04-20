import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import completFormSvg from '../assets/svg/complete-form.svg';

const MAX_CHARS = 1000;

export default function OrderPage() {
  const [searchParams] = useSearchParams();
  const vendorPhone = searchParams.get('phone');
  const storeName = searchParams.get('name') || '';
  const greeting = searchParams.get('greeting') || '';

  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    address: '',
    orderDetails: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    if ((field === 'orderDetails' || field === 'notes' || field === 'address') && value.length > MAX_CHARS) {
      return;
    }
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.customerName.trim()) newErrors.customerName = 'Your name is required';
    if (!form.customerPhone.trim()) newErrors.customerPhone = 'Your phone number is required';
    if (!form.address.trim()) newErrors.address = 'Delivery address is required';
    if (!form.orderDetails.trim()) newErrors.orderDetails = 'Please describe what you want to order';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const notesText = form.notes.trim() || 'None provided';

    const message = `*🚨 NEW ORDER SUBMITTED 🚨*
-------------------------
*👤 Customer Details*
*Name:* ${form.customerName.trim()}
*Phone:* ${form.customerPhone.trim()}
*Address:* ${form.address.trim()}

*🛍️ Order Specifics*
${form.orderDetails.trim()}

*📝 Notes:* ${notesText}
-------------------------
_Generated via SwiftOrder_`;

    const encoded = encodeURIComponent(message);
    window.location.href = `https://wa.me/${vendorPhone}?text=${encoded}`;
  };

  if (!vendorPhone) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-sm animate-fade-in-up">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e94560" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="font-poppins font-bold text-2xl text-brand mb-2">
              Invalid order link
            </h1>
            <p className="text-text-secondary font-rubik text-sm mb-6">
              This link is missing a vendor phone number. Please ask the vendor for a valid SwiftOrder link.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-poppins font-semibold text-sm px-6 py-3 rounded-xl transition-all"
            >
              Go to homepage
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-alt flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-lg mx-auto">

          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
            </div>
            {storeName ? (
              <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-brand">
                Order from{' '}
                <span className="text-accent">{decodeURIComponent(storeName)}</span>
              </h1>
            ) : (
              <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-brand">
                Place your order
              </h1>
            )}
            {greeting && (
              <p className="mt-2 text-text-secondary font-rubik text-sm italic">
                "{decodeURIComponent(greeting)}"
              </p>
            )}
            <p className="mt-2 text-text-muted font-rubik text-xs">
              Fill out the form below and it'll be sent directly via WhatsApp
            </p>
          </div>


          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-8 shadow-sm animate-fade-in-up delay-100">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              <div>
                <label className="block font-poppins font-medium text-sm text-brand mb-1.5">
                  Your Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => handleChange('customerName', e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl border font-rubik text-sm bg-surface-alt placeholder:text-text-muted transition-all ${
                    errors.customerName ? 'border-accent' : 'border-border'
                  }`}
                />
                {errors.customerName && (
                  <p className="mt-1 text-accent text-xs font-rubik">{errors.customerName}</p>
                )}
              </div>


              <div>
                <label className="block font-poppins font-medium text-sm text-brand mb-1.5">
                  Phone Number <span className="text-accent">*</span>
                </label>
                <input
                  type="tel"
                  value={form.customerPhone}
                  onChange={(e) => handleChange('customerPhone', e.target.value)}
                  placeholder="e.g. 08012345678"
                  className={`w-full px-4 py-3 rounded-xl border font-rubik text-sm bg-surface-alt placeholder:text-text-muted transition-all ${
                    errors.customerPhone ? 'border-accent' : 'border-border'
                  }`}
                />
                {errors.customerPhone && (
                  <p className="mt-1 text-accent text-xs font-rubik">{errors.customerPhone}</p>
                )}
              </div>


              <div>
                <label className="block font-poppins font-medium text-sm text-brand mb-1.5">
                  Delivery Address <span className="text-accent">*</span>
                </label>
                <textarea
                  rows={2}
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Full delivery address"
                  className={`w-full px-4 py-3 rounded-xl border font-rubik text-sm bg-surface-alt placeholder:text-text-muted transition-all resize-none ${
                    errors.address ? 'border-accent' : 'border-border'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.address ? (
                    <p className="text-accent text-xs font-rubik">{errors.address}</p>
                  ) : <span />}
                  <p className="text-text-muted text-xs font-rubik">{form.address.length}/{MAX_CHARS}</p>
                </div>
              </div>


              <div>
                <label className="block font-poppins font-medium text-sm text-brand mb-1.5">
                  Order Details <span className="text-accent">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.orderDetails}
                  onChange={(e) => handleChange('orderDetails', e.target.value)}
                  placeholder="What would you like to order? Include sizes, colors, quantities..."
                  className={`w-full px-4 py-3 rounded-xl border font-rubik text-sm bg-surface-alt placeholder:text-text-muted transition-all resize-none ${
                    errors.orderDetails ? 'border-accent' : 'border-border'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.orderDetails ? (
                    <p className="text-accent text-xs font-rubik">{errors.orderDetails}</p>
                  ) : <span />}
                  <p className="text-text-muted text-xs font-rubik">{form.orderDetails.length}/{MAX_CHARS}</p>
                </div>
              </div>


              <div>
                <label className="block font-poppins font-medium text-sm text-brand mb-1.5">
                  Special Instructions <span className="text-text-muted font-normal">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Any special requests or notes for the vendor"
                  className="w-full px-4 py-3 rounded-xl border border-border font-rubik text-sm bg-surface-alt placeholder:text-text-muted transition-all resize-none"
                />
                <div className="flex justify-end mt-1">
                  <p className="text-text-muted text-xs font-rubik">{form.notes.length}/{MAX_CHARS}</p>
                </div>
              </div>


              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-poppins font-semibold text-sm py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-whatsapp/20 hover:-translate-y-0.5 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send Order via WhatsApp
              </button>
            </form>
          </div>


          <p className="text-center text-text-muted font-rubik text-xs mt-6 animate-fade-in delay-300">
            Powered by <span className="font-poppins font-semibold text-brand">Swift<span className="text-accent">Order</span></span> &mdash; your data goes directly to the vendor's WhatsApp.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
