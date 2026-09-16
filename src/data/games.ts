export type AccentColor = 'neon' | 'aqua' | 'plasma' | 'iris' | 'ember';

export interface Game {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  year: number;
  platform: string;
  size: string;
  playerMode: string;
  description: string;
  fullDescription: string;
  developer: string;
  publisher: string;
  language: string;
  accent: AccentColor;
  accentHex: string;
  cardBg: string;
  image: string;
  screenshots: string[];
  requirements: {
    min: { cpu: string; ram: string; gpu: string; storage: string };
    rec: { cpu: string; ram: string; gpu: string; storage: string };
  };
  bars: { cpu: number; ram: number; gpu: number; storage: number };
  isLowEnd: boolean;
  addedDate: string;
}

export type PageState =
  | { type: 'home' }
  | { type: 'games'; query?: string }
  | { type: 'game-detail'; gameId: string }
  | { type: 'about' }
  | { type: 'donate' };

export type NavigateFn = (page: PageState) => void;

const u = (id: string, w = 800, h = 500) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

export const games: Game[] = [
  {
    id: 'nfs-most-wanted',
    title: 'NFS: MOST WANTED',
    subtitle: 'Racing // 2005',
    genre: 'Racing',
    year: 2005,
    platform: 'Windows',
    size: '2.4 GB',
    playerMode: 'Single / Multiplayer',
    description: 'Blacklist. Cops. Speed. The definitive street racing game.',
    fullDescription:
      'Need for Speed: Most Wanted drops you into Rockport with nothing but a beat-up BMW and a reputation to build. Climb the Blacklist by defeating 15 rivals in illegal street races while outrunning one of the most aggressive police pursuit systems ever put in a racing game. The speedbreaker mechanic, the heat system, and that soundtrack made this the benchmark for the genre.',
    developer: 'EA Black Box',
    publisher: 'Electronic Arts',
    language: 'English, French, German, Spanish',
    accent: 'ember',
    accentHex: '#FF8A3D',
    cardBg: 'linear-gradient(135deg, #150800 0%, #1e0d00 50%, #120700 100%)',
    image: '/screenshots/Need For Speed Most Wanted (2005)/image.png',
    screenshots: [
      u('1504707748692-419802cf939d', 1200, 700),
      u('1546984575-757f4f7c13cf', 1200, 700),
      u('1560419015-7c708e1c6e9d', 1200, 700),
      u('1558618666-fcd25c85cd64', 1200, 700),
      u('1499333029733-15e62a69b88f', 1200, 700),
    ],
    requirements: {
      min: { cpu: 'Pentium IV 1.4 GHz', ram: '256 MB', gpu: 'GeForce 4 Ti / Radeon 8500', storage: '2.4 GB' },
      rec: { cpu: 'Pentium IV 2.4 GHz', ram: '512 MB', gpu: 'GeForce 6200 / Radeon 9800', storage: '2.4 GB' },
    },
    bars: { cpu: 45, ram: 40, gpu: 55, storage: 70 },
    isLowEnd: false,
    addedDate: '2026-09-14',
  },
  {
    id: 'nfs-underground',
    title: 'NFS: UNDERGROUND',
    subtitle: 'Racing // 2003',
    genre: 'Racing',
    year: 2003,
    platform: 'Windows',
    size: '1.8 GB',
    playerMode: 'Single / Multiplayer',
    description: 'Where the tuner scene went digital. Import culture, neon, and rival crews.',
    fullDescription:
      'The game that launched a thousand body kits. Need for Speed: Underground took the franchise off the open road and into the illegal night racing scene of Olympic City. 111 events, deep visual customization, and a soundtrack that defined mid-2000s car culture. Underground is still the blueprint for every tuner racer since.',
    developer: 'EA Black Box',
    publisher: 'Electronic Arts',
    language: 'English, French, German, Italian',
    accent: 'aqua',
    accentHex: '#00D9FF',
    cardBg: 'linear-gradient(135deg, #060d1a 0%, #0a1525 50%, #050d1f 100%)',
    image: '/screenshots/Need For Speed Underground/image.png',
    screenshots: [
      u('1547954575-443401abf4af', 1200, 700),
      u('1546984575-757f4f7c13cf', 1200, 700),
      u('1504707748692-419802cf939d', 1200, 700),
      u('1499333029733-15e62a69b88f', 1200, 700),
      u('1558618666-fcd25c85cd64', 1200, 700),
    ],
    requirements: {
      min: { cpu: 'Pentium III 700 MHz', ram: '256 MB', gpu: 'GeForce 2 GTS', storage: '1.8 GB' },
      rec: { cpu: 'Pentium IV 1.5 GHz', ram: '512 MB', gpu: 'GeForce 4 Ti', storage: '1.8 GB' },
    },
    bars: { cpu: 30, ram: 28, gpu: 38, storage: 55 },
    isLowEnd: true,
    addedDate: '2026-09-14',
  },
  {
    id: 'nfs-underground-2',
    title: 'NFS: UNDERGROUND 2',
    subtitle: 'Racing // 2004',
    genre: 'Racing',
    year: 2004,
    platform: 'Windows',
    size: '2.2 GB',
    playerMode: 'Single / Multiplayer',
    description: 'Open-world Bayview. Free roaming, SUVs, and the return of the night scene.',
    fullDescription:
      'Underground 2 blew the garage doors open with a free-roaming city, a day/night cycle, and the Outrun mode that made random street races feel alive. Bayview is huge, the car list is deeper, and the customization went even further. The last great Underground before Most Wanted changed the formula.',
    developer: 'EA Black Box',
    publisher: 'Electronic Arts',
    language: 'English, French, German, Spanish',
    accent: 'plasma',
    accentHex: '#FF3CAC',
    cardBg: 'linear-gradient(135deg, #1a0410 0%, #250618 50%, #1a0310 100%)',
    image: '/screenshots/Need For Speed Underground 2/image.png',
    screenshots: [
      u('1560419015-7c708e1c6e9d', 1200, 700),
      u('1547954575-443401abf4af', 1200, 700),
      u('1504707748692-419802cf939d', 1200, 700),
      u('1558618666-fcd25c85cd64', 1200, 700),
      u('1499333029733-15e62a69b88f', 1200, 700),
    ],
    requirements: {
      min: { cpu: 'Pentium IV 1.0 GHz', ram: '256 MB', gpu: 'GeForce 3 Ti', storage: '2.2 GB' },
      rec: { cpu: 'Pentium IV 2.0 GHz', ram: '512 MB', gpu: 'GeForce 4 Ti / Radeon 9600', storage: '2.2 GB' },
    },
    bars: { cpu: 40, ram: 35, gpu: 48, storage: 65 },
    isLowEnd: false,
    addedDate: '2026-09-14',
  },
  {
    id: 'hollow-knight',
    title: 'HOLLOW KNIGHT',
    subtitle: 'Metroidvania // 2017',
    genre: 'Platformer',
    year: 2017,
    platform: 'Windows',
    size: '9 GB',
    playerMode: 'Single Player',
    description: 'A hand-drawn kingdom of bugs. Explore, fight, and descend.',
    fullDescription:
      'Hollow Knight is a sprawling 2D action-adventure set in Hallownest, a ruined insect kingdom buried beneath the surface. Tight combat, precise platforming, and a map system that rewards genuine exploration. With 40+ hours of content, multiple endings, and free content updates that doubled the game, it is one of the best-valued games ever made.',
    developer: 'Team Cherry',
    publisher: 'Team Cherry',
    language: 'English, French, German, Spanish, Japanese',
    accent: 'iris',
    accentHex: '#7C5CFF',
    cardBg: 'linear-gradient(135deg, #080418 0%, #0e0728 50%, #060315 100%)',
    image: '/screenshots/Hollow Knight/image.png',
    screenshots: [
      u('1518770660439-4636190af475', 1200, 700),
      u('1550745165-9bc0b252726f', 1200, 700),
      u('1542751371-adc38448a05e', 1200, 700),
      u('1614854262318-831574f15f1f', 1200, 700),
      u('1485846234645-a62644f84728', 1200, 700),
    ],
    requirements: {
      min: { cpu: 'Intel Core i3', ram: '4 GB', gpu: 'GeForce 9800 GTX / Radeon HD 4870', storage: '9 GB' },
      rec: { cpu: 'Intel Core i5', ram: '8 GB', gpu: 'GeForce GTX 560 / Radeon HD 6870', storage: '9 GB' },
    },
    bars: { cpu: 50, ram: 45, gpu: 50, storage: 85 },
    isLowEnd: false,
    addedDate: '2026-09-15',
  },
  {
    id: 'portal',
    title: 'PORTAL',
    subtitle: 'Puzzle // 2007',
    genre: 'Puzzle',
    year: 2007,
    platform: 'Windows',
    size: '4 GB',
    playerMode: 'Single Player',
    description: 'The cake is a lie. The physics are not.',
    fullDescription:
      'Portal is a first-person puzzle game built around a single mechanic: the portal gun. Fire two linked portals and solve 19 test chambers that escalate from tutorial to genuinely brain-bending. Then GLaDOS starts talking, and the game becomes something else entirely. Short, perfect, and endlessly quotable.',
    developer: 'Valve',
    publisher: 'Valve',
    language: 'English, French, German, Russian, Spanish',
    accent: 'neon',
    accentHex: '#00FF9C',
    cardBg: 'linear-gradient(135deg, #040f0a 0%, #061812 50%, #030c08 100%)',
    image: '/screenshots/Portal 1/image.png',
    screenshots: [
      u('1550745165-9bc0b252726f', 1200, 700),
      u('1614854262318-831574f15f1f', 1200, 700),
      u('1511447333015-45b65e60f6d5', 1200, 700),
      u('1542751371-adc38448a05e', 1200, 700),
      u('1578662996442-48f60103fc96', 1200, 700),
    ],
    requirements: {
      min: { cpu: 'Pentium IV 1.7 GHz', ram: '512 MB', gpu: 'DirectX 8.1 card', storage: '4 GB' },
      rec: { cpu: 'Pentium IV 3.0 GHz', ram: '1 GB', gpu: 'DirectX 9 card', storage: '4 GB' },
    },
    bars: { cpu: 35, ram: 30, gpu: 40, storage: 45 },
    isLowEnd: true,
    addedDate: '2026-09-15',
  },
  {
    id: 'subnautica',
    title: 'SUBNAUTICA',
    subtitle: 'Survival // 2018',
    genre: 'Adventure',
    year: 2018,
    platform: 'Windows',
    size: '20 GB',
    playerMode: 'Single Player',
    description: 'Crash on an ocean planet. Build, dive, and survive.',
    fullDescription:
      'Subnautica drops you on Planet 4546B with a lifepod, a fabricator, and no idea what is down there. Explore a hand-crafted alien ocean across biomes that go from sunlit shallows to crushing depths. Scan everything, build bases, pilot submarines, and try not to think about what made that noise. One of the best survival games ever made, and genuinely terrifying if you are afraid of deep water.',
    developer: 'Unknown Worlds Entertainment',
    publisher: 'Unknown Worlds Entertainment',
    language: 'English, French, German, Spanish, Russian, Japanese',
    accent: 'aqua',
    accentHex: '#00D9FF',
    cardBg: 'linear-gradient(135deg, #030d14 0%, #041520 50%, #030b12 100%)',
    image: '/screenshots/Subnautica/image.png',
    screenshots: [
      u('1485846234645-a62644f84728', 1200, 700),
      u('1509248961158-e54f6934749c', 1200, 700),
      u('1491900177661-4e1cd2d7cce2', 1200, 700),
      u('1558618666-fcd25c85cd64', 1200, 700),
      u('1511447333015-45b65e60f6d5', 1200, 700),
    ],
    requirements: {
      min: { cpu: 'Intel Core i3 / AMD Ryzen 3', ram: '4 GB', gpu: 'GeForce GTX 550 Ti / Radeon HD 5770', storage: '20 GB' },
      rec: { cpu: 'Intel Core i5 / AMD Ryzen 5', ram: '8 GB', gpu: 'GeForce GTX 960 / Radeon R9 380', storage: '20 GB' },
    },
    bars: { cpu: 65, ram: 60, gpu: 70, storage: 95 },
    isLowEnd: false,
    addedDate: '2026-09-16',
  },
  {
    id: 'blasphemous',
    title: 'BLASPHEMOUS',
    subtitle: 'Metroidvania // 2019',
    genre: 'Action',
    year: 2019,
    platform: 'Windows',
    size: '4 GB',
    playerMode: 'Single Player',
    description: 'Brutal penance. A gothic nightmare in pixel art.',
    fullDescription:
      'Blasphemous is a punishing 2D action-platformer set in Cvstodia, a land twisted by a miraculous disaster called The Miracle. You are the Penitent One, the last survivor of the Silent Brotherhood, and your only path is through blood. Gorgeous pixel art, grotesque boss designs, and combat that demands precision. Inspired by Spanish Holy Week imagery in ways that will stay with you.',
    developer: 'The Game Kitchen',
    publisher: 'Team17',
    language: 'English, Spanish, French, German, Japanese',
    accent: 'ember',
    accentHex: '#FF8A3D',
    cardBg: 'linear-gradient(135deg, #180800 0%, #200c00 50%, #150700 100%)',
     image: '/screenshots/Blasphemous/image.png',
    screenshots: [
      u('1542751371-adc38448a05e', 1200, 700),
      u('1518770660439-4636190af475', 1200, 700),
      u('1550745165-9bc0b252726f', 1200, 700),
      u('1614854262318-831574f15f1f', 1200, 700),
      u('1485846234645-a62644f84728', 1200, 700),
    ],
    requirements: {
      min: { cpu: 'Intel Core 2 Duo', ram: '4 GB', gpu: 'GeForce 9800 GT / Radeon HD 4870', storage: '4 GB' },
      rec: { cpu: 'Intel Core i5', ram: '8 GB', gpu: 'GeForce GTX 650 / Radeon HD 7770', storage: '4 GB' },
    },
    bars: { cpu: 45, ram: 40, gpu: 45, storage: 40 },
    isLowEnd: false,
    addedDate: '2026-09-16',
  },
];

export const latestGames = [...games].sort((a, b) =>
  b.addedDate.localeCompare(a.addedDate)
);
export const lowEndGames = games.filter((g) => g.isLowEnd);
export const featuredGames = games.slice(0, 5);

export const accentClasses: Record<AccentColor, { text: string; border: string; bg: string; glow: string }> = {
  neon: { text: 'text-neon', border: 'border-neon/40', bg: 'bg-neon/8', glow: 'glow-neon' },
  aqua: { text: 'text-aqua', border: 'border-aqua/40', bg: 'bg-aqua/8', glow: 'glow-aqua' },
  plasma: { text: 'text-plasma', border: 'border-plasma/40', bg: 'bg-plasma/8', glow: 'glow-plasma' },
  iris: { text: 'text-iris', border: 'border-iris/40', bg: 'bg-iris/8', glow: 'glow-iris' },
  ember: { text: 'text-ember', border: 'border-ember/40', bg: 'bg-ember/8', glow: 'glow-ember' },
};
