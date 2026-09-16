import { type NavigateFn } from '../data/games';

interface FooterProps {
  onNavigate: NavigateFn;
}

export default function Footer({ onNavigate }: FooterProps) {
  const links: { label: string; page: 'home' | 'games' | 'about' | 'donate' }[] = [
    { label: 'Games',    page: 'games' },
    { label: 'Categories', page: 'games' },
    { label: 'About',    page: 'about' },
    { label: 'Donate',   page: 'donate' },
    { label: 'Contact',  page: 'about' },
    { label: 'Privacy',  page: 'about' },
    { label: 'Copyright', page: 'about' },
  ];

  return (
    <footer
      className="border-t mt-0"
      style={{ borderColor: 'rgba(245,247,250,0.06)' }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <button
              onClick={() => onNavigate({ type: 'home' })}
              className="font-display font-black text-xl tracking-tight text-frost hover:text-neon transition-colors block mb-2"
            >
              RETRO<span className="text-neon">//</span>PLAY
            </button>
            <p className="text-fog text-sm">Classic games for modern machines.</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map(({ label, page }) => (
              <button
                key={label}
                onClick={() => onNavigate({ type: page })}
                className="text-fog text-sm hover:text-frost transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(245,247,250,0.06)', paddingTop: '1.5rem' }}>
          <p className="font-mono text-xs text-fog/40 tracking-wide">
            © 2026 RETRO//PLAY — A HOBBY PROJECT. NOT AFFILIATED WITH ANY PUBLISHER.
          </p>
        </div>
      </div>
    </footer>
  );
}
