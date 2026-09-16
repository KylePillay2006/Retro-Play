import { useState, useCallback } from 'react';
import { type PageState } from './data/games';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import GamesLibrary from './pages/GamesLibrary';
import About from './pages/About';
import Donate from './pages/Donate';

export default function App() {
  const [page, setPage] = useState<PageState>({ type: 'home' });

  const navigate = useCallback((next: PageState) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-base text-frost font-sans">
      <Nav currentPage={page} onNavigate={navigate} />
      <main>
        {page.type === 'home'        && <Home onNavigate={navigate} />}
        {page.type === 'games'       && <GamesLibrary page={page} onNavigate={navigate} />}
        {page.type === 'game-detail' && <GameDetail gameId={page.gameId} onNavigate={navigate} />}
        {page.type === 'about'       && <About onNavigate={navigate} />}
        {page.type === 'donate'      && <Donate onNavigate={navigate} />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}