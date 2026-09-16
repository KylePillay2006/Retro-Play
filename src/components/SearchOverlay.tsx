import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { games, type Game, type NavigateFn } from '../data/games';
import { filterGames } from '../hooks/useGameSearch';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onNavigate: NavigateFn;
}

const POPULAR = ['gta', 'racing', '2005', 'portal', 'nfs'];

export default function SearchOverlay({ open, onClose, onNavigate }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => filterGames(query, 8), [query]);
  const hasQuery = query.trim().length > 0;

  // Focus input when opening, reset when closing
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    } else {
      setQuery('');
      setHighlight(0);
    }
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Reset highlight when query changes
  useEffect(() => { setHighlight(0); }, [query]);

  if (!open) return null;

  const goToResults = () => {
    const q = query.trim();
    if (q) onNavigate({ type: 'games', query: q });
    onClose();
  };

  const goToGame = (g: Game) => {
    onNavigate({ type: 'game-detail', gameId: g.id });
    onClose();
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (hasQuery && results[highlight]) goToGame(results[highlight]);
      else if (hasQuery) goToResults();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-start justify-center px-4 sm:px-6 pt-[12vh]"
      onMouseDown={(e) => {
        // close only when clicking the backdrop, not the panel
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ background: 'rgba(4,6,10,0.72)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden bg-elevated border border-border shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Search games"
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <span className="text-fog/50 shrink-0">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search games by title, genre, year, developer..."
            autoComplete="off"
            className="flex-1 bg-transparent outline-none font-sans text-sm sm:text-base text-frost placeholder-fog/40 caret-neon"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="shrink-0 text-fog/60 hover:text-frost transition-colors p-1"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {hasQuery ? (
          <div className="max-h-[55vh] overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-fog text-sm">No games match “{query.trim()}”.</p>
              </div>
            ) : (
              <>
                <div className="px-5 pt-4 pb-2">
                  <p className="font-mono text-[10px] tracking-widest text-fog/45 uppercase">
                    Results · {results.length}
                  </p>
                </div>
                {results.map((g, i) => (
                  <button
                    key={g.id}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => goToGame(g)}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                      i === highlight ? 'bg-surface' : 'hover:bg-surface/60'
                    }`}
                  >
                    <img
                      src={g.image}
                      alt=""
                      className="w-11 h-11 rounded-md object-cover shrink-0 bg-surface border border-border"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-frost font-medium truncate">{g.title}</div>
                      <div className="text-xs text-fog truncate">{g.genre} · {g.year} · {g.developer}</div>
                    </div>
                    <span
                      className="text-[10px] font-mono tracking-widest uppercase shrink-0"
                      style={{ color: g.accentHex }}
                    >
                      {g.platform}
                    </span>
                  </button>
                ))}
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={goToResults}
                  className="w-full px-5 py-3 border-t border-border text-xs font-mono tracking-widest text-fog hover:text-frost hover:bg-surface/60 transition-colors text-left"
                >
                  VIEW ALL RESULTS FOR “{query.trim().toUpperCase()}” →
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="px-5 py-5">
            <p className="font-mono text-[10px] tracking-widest text-fog/45 uppercase mb-3 flex items-center gap-2">
              <span className="text-ember">⌬</span> Popular searches
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-lg font-mono text-xs tracking-wider text-fog bg-surface border border-border hover:text-frost hover:border-frost/20 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}