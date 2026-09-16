import { type NavigateFn } from '../data/games';

interface DonateProps { onNavigate: NavigateFn; }

export default function Donate({ onNavigate: _onNavigate }: DonateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-8" style={{ paddingTop: 60 }}>
      <div className="max-w-md mx-auto text-center py-20">
        <p className="font-mono text-[10px] tracking-widest text-neon/60 mb-6 uppercase">
          Support the project
        </p>
        <h1 className="font-display font-black leading-tight tracking-tight text-frost mb-6"
          style={{ fontSize: 'clamp(36px, 6vw, 56px)' }}>
          SUPPORT THE PROJECT
        </h1>
        <p className="text-fog text-base leading-relaxed mb-3">
          RETRO//PLAY is a small hobby project maintained by one developer.
        </p>
        <p className="text-fog/60 text-sm mb-10">
          If you've found something useful here, consider supporting the project.
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-2 px-10 py-4 font-display font-black text-sm tracking-widest rounded-xl text-base transition-all duration-150"
          style={{ background: '#00FF9C' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        >
          ♥ SUPPORT
        </a>

        <p className="mt-8 text-fog/40 text-sm">Thank you.</p>
      </div>
    </div>
  );
}
