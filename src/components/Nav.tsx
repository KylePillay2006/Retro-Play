import { useState } from 'react';
import { type PageState, type NavigateFn } from '../data/games';

interface NavProps {
  currentPage: PageState;
  onNavigate: NavigateFn;
}

export default function Nav({ currentPage, onNavigate }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (type: PageState['type']) => currentPage.type === type;
  const go = (p: PageState) => { onNavigate(p); setMenuOpen(false); };

  const links: { label: string; page: PageState }[] = [
    { label: 'Games',  page: { type: 'games' } },
    { label: 'About',  page: { type: 'about' } },
    { label: 'Donate', page: { type: 'donate' } },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8"
      style={{
        height: 60,
        background: 'rgba(8,10,14,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(245,247,250,0.06)',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => go({ type: 'home' })}
        className="font-display font-black text-xl tracking-tight text-frost hover:text-frost transition-colors leading-none flex-shrink-0"
      >
        RETRO<span className="text-neon">//</span>PLAY
      </button>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-1">
        {links.map(({ label, page }) => (
          <button
            key={label}
            onClick={() => go(page)}
            className={`px-4 py-2 font-sans text-sm font-medium rounded-lg transition-colors duration-150 ${
              isActive(page.type)
                ? 'text-frost bg-white/6'
                : 'text-fog hover:text-frost'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Right: search */}
      <div className="hidden md:flex items-center gap-3 flex-shrink-0">
        <button className="p-2 text-fog hover:text-frost transition-colors rounded-lg hover:bg-white/5">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      </div>

      {/* Mobile: hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 text-fog hover:text-frost transition-colors"
        aria-label="Menu"
      >
        {menuOpen
          ? <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
          : <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
        }
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 md:hidden py-2"
          style={{
            background: 'rgba(8,10,14,0.97)',
            borderBottom: '1px solid rgba(245,247,250,0.06)',
          }}
        >
          {links.map(({ label, page }) => (
            <button
              key={label}
              onClick={() => go(page)}
              className={`w-full text-left px-6 py-3.5 font-sans text-sm transition-colors ${
                isActive(page.type) ? 'text-neon' : 'text-fog hover:text-frost'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
