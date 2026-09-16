import { useState, useEffect, useRef } from 'react';
import { games, latestGames, type NavigateFn } from '../data/games';
import GameCard, { AdPlaceholder } from '../components/GameCard';
import SearchOverlay from '../components/SearchOverlay';

interface HomeProps {
  onNavigate: NavigateFn;
}

const SPARKLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${Math.round(5 + ((i * 3.4) % 90))}%`,
  top: `${Math.round(10 + ((i * 7.3) % 80))}%`,
  size: i % 3 === 0 ? 2.5 : 1.5,
  dur: `${4 + (i % 5) * 1.4}s`,
  delay: `${(i * 0.37) % 7}s`,
  dx: `${((i % 5) - 2) * 18}px`,
  color: ['#00FF9C', '#00FF9C', '#00FF9C', '#00D9FF', '#7C5CFF'][i % 5],
}));

function Sparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {SPARKLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full sparkle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            '--dur': p.dur,
            '--delay': p.delay,
            '--dx': p.dx,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

export default function Home({ onNavigate }: HomeProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const latestReveal = useReveal();

  // Cmd/Ctrl + K opens search — same shortcut as AnkerGames
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleRandom = () => {
    const g = games[Math.floor(Math.random() * games.length)];
    onNavigate({ type: 'game-detail', gameId: g.id });
  };

  return (
    <div className="pt-[60px]">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 text-center bg-gradient-to-b from-neon/[0.03] to-transparent">
        <Sparkles />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="hero-1 font-mono text-[10px] tracking-widest text-neon/60 mb-6 uppercase">
            Classic · Lightweight · Verified
          </p>

          <h1 className="hero-2 font-display font-black leading-none tracking-tight mb-4 text-[clamp(44px,8vw,80px)]">
            <span className="text-frost block">PLAY SOMETHING</span>
            <span className="text-frost block">YOU REMEMBER.</span>
          </h1>

          <p className="hero-3 text-fog text-lg mb-10">
            Classic games, hidden gems and lightweight adventures.
          </p>

          {/* Search trigger — looks like an input, opens the overlay */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hero-4 w-full max-w-xl mx-auto mb-5 flex items-center gap-3 px-5 py-3.5 rounded-xl text-left transition-colors bg-surface border border-border hover:border-frost/20"
          >
            <span className="text-fog/40 shrink-0">
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <span className="flex-1 text-sm text-fog/45 font-sans">
              Search games, genres, years...
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-mono text-[10px] text-fog/50 bg-base border border-border">
              ⌘K
            </kbd>
          </button>

          {/* Buttons */}
          <div className="hero-5 flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => onNavigate({ type: 'games' })}
              className="px-7 py-3 font-display font-bold text-sm tracking-widest rounded-xl transition-opacity duration-150 bg-neon text-base hover:opacity-90"
            >
              BROWSE GAMES
            </button>
            <button
              type="button"
              onClick={handleRandom}
              className="px-7 py-3 font-display font-bold text-sm tracking-widest rounded-xl text-fog hover:text-frost transition-colors duration-150 bg-surface border border-border hover:border-frost/20"
            >
              RANDOM GAME
            </button>
          </div>
        </div>
      </section>

      {/* ── LATEST ADDED ─────────────────────────────────────── */}
      <section
        ref={latestReveal.ref}
        className="py-16 px-5 sm:px-8 border-t border-border bg-surface/30"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`flex items-center justify-between mb-8 reveal ${
              latestReveal.visible ? 'in-view' : ''
            }`}
          >
            <h2 className="font-display font-black text-3xl sm:text-4xl text-frost tracking-tight">
              LATEST ADDED
            </h2>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'games' })}
              className="font-mono text-xs text-fog hover:text-frost transition-colors tracking-widest hidden sm:block"
            >
              VIEW ALL →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {latestGames.slice(0, 8).map((game, i) => (
              <div
                key={game.id}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} ${
                  latestReveal.visible ? 'in-view' : ''
                }`}
              >
                <GameCard game={game} onNavigate={onNavigate} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AD ───────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <AdPlaceholder className="py-6" />
      </div>

      {/* ── SEARCH OVERLAY ───────────────────────────────────── */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
}