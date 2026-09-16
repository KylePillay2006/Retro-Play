import { games, type Game } from '../data/games';

const FIELDS: (keyof Game)[] = [
  'title',
  'subtitle',
  'genre',
  'developer',
  'publisher',
];

export function filterGames(query: string, limit?: number): Game[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const tokens = q.split(/\s+/);

  const scored = games
    .map((g) => {
      const haystack = [
        ...FIELDS.map((f) => String(g[f] ?? '')),
        String(g.year),
      ]
        .join(' ')
        .toLowerCase();

      // every token must appear somewhere
      const matchesAll = tokens.every((t) => haystack.includes(t));
      if (!matchesAll) return null;

      // simple relevance: title match beats genre match beats anything else
      let score = 0;
      const title = g.title.toLowerCase();
      if (title === q) score += 100;
      if (title.startsWith(q)) score += 50;
      if (title.includes(q)) score += 25;
      if (g.genre.toLowerCase().includes(q)) score += 10;

      return { game: g, score };
    })
    .filter((x): x is { game: Game; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.game);

  return typeof limit === 'number' ? scored.slice(0, limit) : scored;
}