import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="font-poppins font-bold text-lg text-brand tracking-tight">
            Swift<span className="text-accent">Order</span>
          </span>
        </Link>
        <a
          href="#how-it-works"
          className="text-sm font-rubik text-text-secondary hover:text-accent transition-colors hidden sm:block"
        >
          How it works
        </a>
      </div>
    </nav>
  );
}
