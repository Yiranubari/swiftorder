import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import messageSentSvg from "../assets/svg/message-sent.svg";
import personalDataSvg from "../assets/svg/personal-data.svg";
import organizingProjectsSvg from "../assets/svg/organizing-projects.svg";
import happyCustomerSvg from "../assets/svg/happy-customer.svg";
import actionSuccessfulSvg from "../assets/svg/action-successful.svg";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1">
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
                Turn messy DMs into{" "}
                <span className="text-accent">clean orders</span>
              </h1>
              <p className="mt-5 text-text-secondary font-rubik text-base sm:text-lg leading-relaxed max-w-lg animate-fade-in-up delay-200">
                Generate a custom link, share it with your customers, and
                receive perfectly formatted orders directly on WhatsApp. Give
                your customers a seamless checkout experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up delay-300">
                <Link
                  to="/generate"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-poppins font-semibold text-sm px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
                >
                  Get your link
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
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
            <p className="text-text-muted text-xs font-rubik uppercase tracking-widest mb-6">
              Built for vendors on
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-40">
              <span className="font-poppins font-bold text-lg text-brand">
                WhatsApp
              </span>
              <span className="font-poppins font-bold text-lg text-brand">
                Instagram
              </span>
              <span className="font-poppins font-bold text-lg text-brand">
                Facebook
              </span>
              <span className="font-poppins font-bold text-lg text-brand">
                Twitter / X
              </span>
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
                Three steps to cleaner orders. Take control of your sales with
                no friction.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  step: "01",
                  title: "Configure your link",
                  desc: "Enter your WhatsApp number, store name, and a custom greeting. We generate a unique order link.",
                  img: personalDataSvg,
                },
                {
                  step: "02",
                  title: "Share with customers",
                  desc: "Drop the link in your Instagram bio, WhatsApp status, or anywhere your customers are.",
                  img: organizingProjectsSvg,
                },
                {
                  step: "03",
                  title: "Receive clean orders",
                  desc: "Customers fill a simple form. Their details arrive in your WhatsApp, perfectly formatted.",
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
                  <h3 className="font-poppins font-semibold text-lg text-brand mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary font-rubik text-sm leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              ))}
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
              Join hundreds of vendors streamlining their sales process and
              offering customers a premium checkout experience.
            </p>
            <div className="mt-8">
              <Link
                to="/generate"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-poppins font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/30 cursor-pointer"
              >
                Create your link for free
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
