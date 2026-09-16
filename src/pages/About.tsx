import { type NavigateFn } from '../data/games';

interface AboutProps {
  onNavigate: NavigateFn;
}

const sections = [
  {
    title: 'WHY THIS EXISTS',
    body: "Because good games shouldn't require a 2024 gaming rig. Because the era of mid-budget, weird, ambitious PC games deserves to be remembered. RETRO//PLAY is a small attempt to fix that.",
  },
  {
    title: 'WHAT WE OFFER',
    body: "Classic games from the early 2000s and late 1990s. Lightweight titles that run on integrated graphics. Hidden gems that got buried by the AAA machine. If it's interesting and runs on modest hardware, it belongs here.",
  },
  {
    title: 'LEGAL & COPYRIGHT',
    body: "RETRO//PLAY is a hobby discovery project. We do not host game files directly. All games listed link to third-party sources verified as legitimate at time of listing. If you are a rights holder with concerns, contact us.",
  },
  {
    title: 'CONTACT',
    body: "Have a game suggestion, a broken link, or a copyright concern? Get in touch via the GitHub repository or the email listed there. We try to respond within a few days.",
  },
];

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen pt-[60px]">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="py-20 px-5 sm:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] tracking-widest text-fog/45 mb-5 uppercase">
            About
          </p>
          <h1 className="font-display font-black leading-none tracking-tight text-frost mb-6 text-[clamp(36px,6vw,64px)]">
            BUILT FOR PEOPLE
            <br />
            <span className="text-neon">WHO LOVE GAMES.</span>
          </h1>
          <p className="text-fog text-lg leading-relaxed max-w-xl">
            A hobby project focused on discovering classic games, lightweight titles,
            and hidden gems that don't require a powerful gaming PC.
          </p>
        </div>
      </div>

      {/* ── Sections ─────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <div className="divide-y divide-border/60">
          {sections.map((s) => (
            <section key={s.title} className="py-10">
              <h2 className="font-display font-black text-xl text-frost tracking-tight mb-3">
                {s.title}
              </h2>
              <p className="text-fog/75 text-sm sm:text-base leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        {/* ── CTA ───────────────────────────────────────────── */}
        <div className="mt-8 p-7 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-surface border border-border">
          <div>
            <p className="font-display font-black text-lg text-frost mb-1">
              LIKE WHAT WE'RE DOING?
            </p>
            <p className="text-fog/55 text-sm">
              Servers and coffee don't pay for themselves.
            </p>
          </div>
          <button
            onClick={() => onNavigate({ type: 'donate' })}
            className="flex-shrink-0 px-6 py-3 font-display font-bold text-sm tracking-widest rounded-xl text-base bg-neon transition-opacity duration-150 hover:opacity-90"
          >
            ♥ SUPPORT
          </button>
        </div>
      </div>
    </div>
  );
}