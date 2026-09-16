import { type Game, type NavigateFn, accentClasses } from '../data/games';

interface GameCardProps {
  game: Game;
  onNavigate: NavigateFn;
  variant?: 'featured' | 'compact' | 'list';
}

export default function GameCard({ game, onNavigate, variant = 'compact' }: GameCardProps) {
  const ac = accentClasses[game.accent];

  if (variant === 'list') {
    return (
      <button
        onClick={() => onNavigate({ type: 'game-detail', gameId: game.id })}
        className="w-full flex items-center gap-4 p-3 rounded-xl text-left group transition-all duration-200"
        style={{ background: 'rgba(17,21,27,1)', border: '1px solid rgba(245,247,250,0.06)' }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,156,0.2)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,247,250,0.06)';
        }}
      >
        <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0" style={{ background: game.cardBg }}>
          <img
            src={`${game.image.split('?')[0]}?w=112&h=112&fit=crop&auto=format`}
            alt={game.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-200"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-sans font-semibold text-sm text-frost truncate mb-0.5">{game.title}</p>
          <p className="text-fog text-xs">{game.genre} · {game.year}</p>
        </div>
        <div className="flex-shrink-0">
          <span className="font-mono text-xs text-fog/50">{game.size}</span>
        </div>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className="cursor-pointer group rounded-2xl overflow-hidden"
        style={{
          background: '#11151B',
          border: '1px solid rgba(245,247,250,0.06)',
          transition: 'transform 0.18s ease, border-color 0.18s ease',
        }}
        onClick={() => onNavigate({ type: 'game-detail', gameId: game.id })}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,156,0.3)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = '';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,247,250,0.06)';
        }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-all duration-250"
            style={{ transition: 'transform 0.25s ease, opacity 0.2s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = ''; }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,10,14,0.85) 0%, transparent 50%)' }}
          />
          {game.isLowEnd && (
            <div className="absolute top-2 left-2">
              <span className="text-[9px] font-mono tracking-widest text-neon bg-base/80 border border-neon/30 px-1.5 py-0.5 rounded-sm">
                LOW-END
              </span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-display font-bold text-sm text-frost leading-tight mb-0.5">{game.title}</h3>
          <p className="text-fog/65 text-xs">{game.genre} · {game.year}</p>
          <div className="mt-2">
            <span className={`font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded text-xs ${ac.text}`}
              style={{ background: `${game.accentHex}12` }}>
              {game.platform}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Featured variant
  return (
    <div
      className="cursor-pointer group rounded-2xl overflow-hidden flex-shrink-0"
      style={{
        background: '#11151B',
        border: '1px solid rgba(245,247,250,0.06)',
        transition: 'transform 0.18s ease, border-color 0.18s ease',
        width: 240,
      }}
      onClick={() => onNavigate({ type: 'game-detail', gameId: game.id })}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,156,0.3)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,247,250,0.06)';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-all duration-250"
          style={{ transition: 'transform 0.25s ease, opacity 0.2s ease' }}
          onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = ''; }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(8,10,14,0.9) 0%, transparent 50%)' }}
        />
        {game.isLowEnd && (
          <div className="absolute top-2 left-2">
            <span className="text-[9px] font-mono tracking-widest text-neon bg-base/80 border border-neon/30 px-1.5 py-0.5 rounded-sm">
              LOW-END
            </span>
          </div>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="font-display font-bold text-sm text-frost leading-tight mb-0.5">{game.title}</h3>
        <p className="text-fog/65 text-xs">{game.genre} · {game.year}</p>
      </div>
    </div>
  );
}

export function AdPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-xl flex items-center justify-center ${className}`}
      style={{
        border: '1px dashed rgba(138,148,166,0.1)',
        background: 'rgba(17,21,27,0.4)',
        minHeight: 80,
      }}
    >
      <span className="font-mono text-[9px] tracking-widest text-fog/20">ADVERTISEMENT</span>
    </div>
  );
}
