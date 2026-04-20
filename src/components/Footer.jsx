import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand text-white/60 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="font-poppins font-bold text-white text-base">
              Swift<span className="text-accent">Order</span>
            </span>
          </Link>
          <p className="text-sm font-rubik">
            &copy; {new Date().getFullYear()} SwiftOrder &mdash; Simplifying social commerce.
          </p>
        </div>
      </div>
    </footer>
  );
}
