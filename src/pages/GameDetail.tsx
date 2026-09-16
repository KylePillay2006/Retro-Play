import { useState } from 'react';
import { games, type NavigateFn } from '../data/games';
import GameCard, { AdPlaceholder } from '../components/GameCard';

interface GameDetailProps {
  gameId: string;
  onNavigate: NavigateFn;
}

export default function GameDetail({ gameId, onNavigate }: GameDetailProps) {
  const game = games.find((g) => g.id === gameId) ?? games[0];
  const related = games
    .filter((g) => g.id !== game.id && g.genre === game.genre)
    .slice(0, 4);

  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="pt-[60px]">
        {/* ── Back ─────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-4">
          <button
            onClick={() => onNavigate({ type: 'games' })}
            className="flex items-center gap-2 text-fog hover:text-frost font-mono text-xs tracking-widest transition-colors"
          >
            ← BACK TO GAMES
          </button>
        </div>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Cover */}
            <div
              className="rounded-2xl overflow-hidden bg-surface border border-border"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-widest text-fog/50 border border-border px-2 py-0.5 rounded">
                  {game.genre}
                </span>
                <span className="font-mono text-[10px] text-fog/40">{game.year}</span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-frost tracking-tight leading-none mb-2">
                {game.title}
              </h1>
              <p className="text-fog/60 text-base mb-5">{game.subtitle}</p>
              <p className="text-fog/80 text-sm leading-relaxed mb-7">{game.description}</p>

              {/* Quick metadata */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-7">
                {([
                  ['Platform', game.platform],
                  ['Genre', game.genre],
                  ['Year', game.year.toString()],
                  ['Size', game.size],
                ] as const).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-1.5 border-b border-border/60"
                  >
                    <span className="text-fog/45 text-xs">{label}</span>
                    <span className="text-frost/80 text-xs font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* Single CTA */}
              <button
                className="w-full sm:w-auto px-7 py-3 font-display font-bold text-sm tracking-widest rounded-xl text-base transition-opacity duration-150 hover:opacity-90"
                style={{ background: game.accentHex }}
              >
                GET GAME →
              </button>

              <div className="mt-4 flex items-center gap-1.5">
                <span className="text-neon text-xs">✓</span>
                <span className="font-mono text-[9px] text-fog/40 tracking-widest">
                  SOURCE VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <section>
                <h2 className="font-display font-black text-2xl text-frost tracking-tight mb-4">
                  ABOUT THE GAME
                </h2>
                <p className="text-fog/80 text-sm leading-relaxed">{game.fullDescription}</p>
              </section>

              {/* Screenshots */}
              <section>
                <h2 className="font-display font-black text-2xl text-frost tracking-tight mb-4">
                  SCREENSHOTS
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {game.screenshots.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox(src)}
                      className="group relative rounded-xl overflow-hidden bg-surface border border-border"
                      style={{ aspectRatio: '16/9' }}
                    >
                      <img
                        src={src}
                        alt={`Screenshot ${i + 1}`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300"
                      />
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md font-mono text-[9px] tracking-widest text-frost/70 bg-base/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        {i + 1} / {game.screenshots.length}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Download header — no duplicate button, just a label */}
              <div className="rounded-xl p-5 bg-surface border border-border">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] tracking-widest text-fog/40">
                    DOWNLOAD
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-neon text-xs">✓</span>
                    <span className="font-mono text-[9px] text-fog/40 tracking-widest">
                      VERIFIED
                    </span>
                  </div>
                </div>
                <p className="text-fog/60 text-xs mt-3 leading-relaxed">
                  Use the <span className="text-frost/80">GET GAME</span> button above to
                  start your download.
                </p>
              </div>

              {/* System requirements — directly under download */}
              <div className="rounded-xl p-5 bg-surface border border-border">
                <p className="font-mono text-[10px] tracking-widest text-fog/40 mb-4">
                  SYSTEM REQUIREMENTS
                </p>
                <div className="space-y-5">
                  {(['min', 'rec'] as const).map((tier) => (
                    <div key={tier}>
                      <p className="font-mono text-[9px] tracking-widest text-fog/35 mb-2.5 uppercase">
                        {tier === 'min' ? 'Minimum' : 'Recommended'}
                      </p>
                      <div className="space-y-2">
                        {(['cpu', 'ram', 'gpu', 'storage'] as const).map((key) => (
                          <div
                            key={key}
                            className="flex justify-between items-start gap-4"
                          >
                            <span className="font-mono text-[10px] text-fog/40 tracking-widest uppercase flex-shrink-0 w-14">
                              {key}
                            </span>
                            <span className="text-fog/75 text-xs text-right">
                              {game.requirements[tier][key]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Game information */}
              <div className="rounded-xl p-5 bg-surface border border-border">
                <p className="font-mono text-[10px] tracking-widest text-fog/40 mb-4">
                  GAME INFORMATION
                </p>
                <div className="space-y-2.5">
                  {([
                    ['Developer', game.developer],
                    ['Publisher', game.publisher],
                    ['Release', game.year.toString()],
                    ['Genre', game.genre],
                    ['Platform', game.platform],
                    ['Size', game.size],
                  ] as const).map(([label, value]) => (
                    <div key={label} className="flex justify-between items-start gap-4">
                      <span className="text-fog/40 text-xs flex-shrink-0">{label}</span>
                      <span className="text-frost/75 text-xs text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <AdPlaceholder className="py-12" />
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-14 pt-14 border-t border-border/60">
              <h2 className="font-display font-black text-2xl text-frost tracking-tight mb-7">
                RELATED GAMES
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map((g) => (
                  <GameCard key={g.id} game={g} onNavigate={onNavigate} variant="compact" />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-base/95"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-fog hover:text-frost text-xl transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={lightbox}
            alt="Screenshot"
            draggable={false}
            className="max-w-full max-h-[88vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}