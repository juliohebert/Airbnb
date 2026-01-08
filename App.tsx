
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { GuideData } from './types';
import { INITIAL_GUIDE_DATA, DecorativeLeaf } from './constants';
import Home from './pages/Home';
import Wifi from './pages/Wifi';
import Contact from './pages/Contact';
import Rules from './pages/Rules';
import CheckIn from './pages/CheckIn';
import CheckOut from './pages/CheckOut';
import Amenities from './pages/Amenities';
import Directions from './pages/Directions';
import Feedback from './pages/Feedback';
import Management from './pages/Management';

const Layout: React.FC<{ children: React.ReactNode, hideNav?: boolean }> = ({ children, hideNav }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light transition-colors duration-300 font-sans relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none opacity-20 dark:opacity-10 z-0">
        <DecorativeLeaf className="w-full h-full rotate-180 transform -translate-x-4 -translate-y-4" />
      </div>
      <div className="fixed top-0 right-0 w-48 h-48 pointer-events-none opacity-30 dark:opacity-10 z-0">
        <DecorativeLeaf className="w-full h-full" />
      </div>
      <div className="fixed bottom-0 right-0 w-40 h-40 pointer-events-none opacity-20 dark:opacity-10 z-0 rotate-180">
        <DecorativeLeaf className="w-full h-full" />
      </div>

      {!hideNav && (
        <nav className="relative z-50 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="material-icons-outlined text-primary text-3xl">cottage</span>
            <span className="font-serif text-xl text-primary font-bold tracking-wide">Casa Verde</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-primary hover:underline font-bold text-sm">
              {isAdmin ? 'Voltar ao Guia' : 'Gestão'}
            </Link>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-card-light dark:bg-card-dark text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <span className="material-icons-outlined block dark:hidden">dark_mode</span>
              <span className="material-icons-outlined hidden dark:block">light_mode</span>
            </button>
          </div>
        </nav>
      )}

      <main className="relative z-10 w-full">
        {children}
      </main>

      <footer className="text-center py-8 opacity-60 text-sm font-sans relative z-10 border-t border-primary/10 mt-12">
        © 2024 Guia de Boas-vindas Casa Verde. Tenha uma estadia maravilhosa!
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [guideData, setGuideData] = useState<GuideData>(() => {
    const saved = localStorage.getItem('casa_verde_guide_data');
    return saved ? JSON.parse(saved) : INITIAL_GUIDE_DATA;
  });

  useEffect(() => {
    localStorage.setItem('casa_verde_guide_data', JSON.stringify(guideData));
  }, [guideData]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout><Home data={guideData} /></Layout>} />
        <Route path="/wifi" element={<Layout><Wifi data={guideData} /></Layout>} />
        <Route path="/contact" element={<Layout><Contact data={guideData} /></Layout>} />
        <Route path="/rules" element={<Layout><Rules data={guideData} /></Layout>} />
        <Route path="/checkin" element={<Layout><CheckIn data={guideData} /></Layout>} />
        <Route path="/checkout" element={<Layout><CheckOut data={guideData} /></Layout>} />
        <Route path="/amenities" element={<Layout><Amenities data={guideData} /></Layout>} />
        <Route path="/directions" element={<Layout><Directions data={guideData} /></Layout>} />
        <Route path="/feedback" element={<Layout><Feedback data={guideData} /></Layout>} />
        <Route path="/admin" element={<Layout><Management data={guideData} onUpdate={setGuideData} /></Layout>} />
      </Routes>
    </HashRouter>
  );
};

export default App;
