import { useState, useMemo, useEffect } from 'react';
import { games, type NavigateFn, type PageState } from '../data/games';
import GameCard, { AdPlaceholder } from '../components/GameCard';

interface GamesLibraryProps {
  page: Extract<PageState, { type: 'games' }>;
  onNavigate: NavigateFn;
}

type SortKey = 'popular' | 'newest' | 'oldest' | 'size-asc' | 'a-z';
type ViewMode = 'grid' | 'list';

const genres = ['All','Racing','Action','Adventure','Puzzle','Shooter','Platformer','RPG','Strategy','Horror'];

const sortLabels: Record<SortKey, string> = {
  popular:   'POPULAR',
  newest:    'NEWEST',
  oldest:    'OLDEST',
  'size-asc':'SMALLEST SIZE',
  'a-z':     'A – Z',
};

export default function GamesLibrary({ page, onNavigate }: GamesLibraryProps) {
  const [search,       setSearch]      = useState(page.query ?? '');
  const [sortKey,      setSortKey]     = useState<SortKey>('popular');
  const [viewMode,     setViewMode]    = useState<ViewMode>('grid');
  const [pageNum,      setPageNum]     = useState(1);
  const [sidebarOpen,  setSidebarOpen] = useState(false);
  const [filters,      setFilters]     = useState({ genre: 'All', lowEndOnly: false });

  // Sync search when a new query arrives from Home
  useEffect(() => {
    setSearch(page.query ?? '');
    setPageNum(1);
  }, [page.query]);

  const filtered = useMemo(() => {
    let r = [...games];
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q) ||
        g.year.toString().includes(q) ||
        g.developer.toLowerCase().includes(q)
      );
    }
    if (filters.genre !== 'All') r = r.filter(g => g.genre === filters.genre);
    if (filters.lowEndOnly) r = r.filter(g => g.isLowEnd);
    switch (sortKey) {
      case 'newest':   r.sort((a,b) => b.addedDate.localeCompare(a.addedDate)); break;
      case 'oldest':   r.sort((a,b) => a.year - b.year); break;
      case 'size-asc': r.sort((a,b) => parseFloat(a.size) - parseFloat(b.size)); break;
      case 'a-z':      r.sort((a,b) => a.title.localeCompare(b.title)); break;
    }
    return r;
  }, [search, filters, sortKey]);

  const perPage = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((pageNum-1)*perPage, pageNum*perPage);
  const setFilter = (k: keyof typeof filters, v: string | boolean) => {
    setFilters(prev => ({ ...prev, [k]: v }));
    setPageNum(1);
  };

  return (
    <div className="min-h-screen pt-[60px]">
      {/* Header */}
      <div className="py-12 px-4 sm:px-6 border-b border-border bg-deep/50">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] tracking-widest text-fog/45 mb-2">
            // {filtered.length} TITLE{filtered.length === 1 ? '' : 'S'} IN ARCHIVE
            {page.query ? ` · FILTERED BY “${page.query.toUpperCase()}”` : ''}
          </p>
          <h1 className="font-display font-black text-6xl sm:text-7xl text-frost tracking-tight mb-8">
            GAME ARCHIVE
          </h1>
          <div className="relative max-w-xl">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-fog/45 pointer-events-none">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search games, genres, years..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPageNum(1); }}
              className="w-full pl-12 pr-5 py-3.5 rounded-2xl font-sans text-sm text-frost placeholder-fog/35 outline-none transition-colors bg-surface border border-border caret-neon focus:border-neon/35"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 lg:hidden bg-base/70"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <aside className={`
            ${sidebarOpen ? 'fixed inset-y-0 left-0 z-50 flex' : 'hidden'}
            lg:relative lg:flex flex-col w-60 flex-shrink-0
          `} style={{ paddingTop: sidebarOpen ? 88 : 0 }}>
            <div
              className={`w-60 lg:w-auto h-full overflow-y-auto p-4 lg:p-0 rounded-r-2xl lg:rounded-none ${
                sidebarOpen ? 'bg-deep border border-border' : ''
              }`}
            >
              {sidebarOpen && (
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs text-fog/50 tracking-widest">FILTERS</span>
                  <button onClick={() => setSidebarOpen(false)} className="text-fog text-lg" aria-label="Close filters">✕</button>
                </div>
              )}

              <FilterGroup title="GENRE">
                {genres.map(g => (
                  <FilterBtn key={g} label={g} active={filters.genre === g} onClick={() => setFilter('genre', g)} />
                ))}
              </FilterGroup>

              <FilterGroup title="REQUIREMENTS">
                <button
                  onClick={() => setFilter('lowEndOnly', !filters.lowEndOnly)}
                  className="flex items-center gap-2.5 text-xs transition-colors"
                  style={{ color: filters.lowEndOnly ? '#00FF9C' : '#8A94A6' }}
                >
                  <div
                    className="w-8 h-4 rounded-full relative transition-colors"
                    style={{
                      background: filters.lowEndOnly ? 'rgba(0,255,156,0.2)' : 'rgba(17,23,32,1)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      className="absolute top-0.5 w-3 h-3 rounded-full transition-all"
                      style={{ left: filters.lowEndOnly ? 16 : 2, background: filters.lowEndOnly ? '#00FF9C' : '#8A94A6' }}
                    />
                  </div>
                  LOW-END ONLY
                </button>
              </FilterGroup>

              <div className="mt-6"><AdPlaceholder className="py-10" /></div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-7 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs text-fog tracking-widest transition-colors bg-surface border border-border hover:text-frost"
                >
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 6h16M4 12h10M4 18h7"/>
                  </svg>
                  FILTERS
                </button>
                <span className="text-fog/45 text-xs font-mono">
                  {filtered.length} GAME{filtered.length !== 1 ? 'S' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <select
                  value={sortKey}
                  onChange={e => setSortKey(e.target.value as SortKey)}
                  className="font-mono text-xs text-fog tracking-widest px-3.5 py-2 rounded-xl outline-none cursor-pointer transition-colors bg-surface border border-border"
                >
                  {(Object.keys(sortLabels) as SortKey[]).map(k => (
                    <option key={k} value={k}>{sortLabels[k]}</option>
                  ))}
                </select>
                <div className="flex rounded-xl overflow-hidden border border-border">
                  {(['grid','list'] as ViewMode[]).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className="px-3 py-2 font-mono text-xs transition-colors"
                      style={{
                        background: viewMode === mode ? 'rgba(0,255,156,0.12)' : 'var(--color-surface)',
                        color: viewMode === mode ? '#00FF9C' : '#8A94A6',
                      }}
                      aria-label={mode === 'grid' ? 'Grid view' : 'List view'}
                    >
                      {mode === 'grid' ? '⊞' : '☰'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {paginated.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display font-black text-4xl text-fog/25 mb-4">NO GAMES FOUND</p>
                <p className="text-fog/40 text-sm">
                  {search.trim() ? `Nothing matches “${search.trim()}”.` : 'Try adjusting your filters.'}
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                {paginated.map(game => (
                  <GameCard key={game.id} game={game} onNavigate={onNavigate} variant="compact" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2 mb-10">
                {paginated.map(game => (
                  <GameCard key={game.id} game={game} onNavigate={onNavigate} variant="list" />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setPageNum(p => Math.max(1, p - 1))}
                  disabled={pageNum === 1}
                  className="px-3 py-2 font-mono text-xs text-fog rounded-xl border border-border disabled:opacity-25 hover:border-frost/20 hover:text-frost transition-colors"
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPageNum(p)}
                    className="w-8 h-8 font-mono text-xs rounded-xl border transition-colors"
                    style={{
                      background: pageNum === p ? 'rgba(0,255,156,0.12)' : 'transparent',
                      borderColor: pageNum === p ? 'rgba(0,255,156,0.3)' : 'var(--color-border)',
                      color: pageNum === p ? '#00FF9C' : '#8A94A6',
                    }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPageNum(p => Math.min(totalPages, p + 1))}
                  disabled={pageNum === totalPages}
                  className="px-3 py-2 font-mono text-xs text-fog rounded-xl border border-border disabled:opacity-25 hover:border-frost/20 hover:text-frost transition-colors"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h4 className="font-mono text-[9px] tracking-widest text-fog/35 mb-3">{title}</h4>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

function FilterBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left text-xs px-2 py-1.5 rounded-lg transition-colors"
      style={{
        color: active ? '#00FF9C' : '#8A94A6',
        background: active ? 'rgba(0,255,156,0.08)' : 'transparent',
      }}
    >
      {active && <span className="mr-1.5 font-bold">›</span>}{label}
    </button>
  );
}