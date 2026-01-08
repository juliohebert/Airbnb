
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { GuideData, User } from './types';
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
import Login from './pages/Login';
import Register from './pages/Register';

const Layout: React.FC<{ children: React.ReactNode, isGuest?: boolean }> = ({ children, isGuest }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('casa_verde_user') || 'null');

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem('casa_verde_user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light transition-colors duration-300 font-sans relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none opacity-20 dark:opacity-10 z-0">
        <DecorativeLeaf className="w-full h-full rotate-180 transform -translate-x-4 -translate-y-4" />
      </div>
      <div className="fixed top-0 right-0 w-48 h-48 pointer-events-none opacity-30 dark:opacity-10 z-0">
        <DecorativeLeaf className="w-full h-full" />
      </div>

      <nav className="relative z-50 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-primary text-3xl">cottage</span>
          <span className="font-serif text-xl text-primary font-bold tracking-wide">Casa Verde</span>
        </div>
        <div className="flex items-center gap-4">
          {!isGuest && currentUser && (
            <button onClick={handleLogout} className="text-red-600 font-bold text-sm flex items-center gap-1">
              <span className="material-icons-outlined text-sm">logout</span> Sair
            </button>
          )}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-card-light dark:bg-card-dark text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <span className="material-icons-outlined block dark:hidden">dark_mode</span>
            <span className="material-icons-outlined hidden dark:block">light_mode</span>
          </button>
        </div>
      </nav>

      <main className="relative z-10 w-full">
        {children}
      </main>

      <footer className="text-center py-8 opacity-60 text-sm font-sans relative z-10 border-t border-primary/10 mt-12">
        © 2026 Guia de Boas-vindas. Tenha uma estadia maravilhosa!
      </footer>
    </div>
  );
};

// Component to load data based on HostId
const GuestRouter: React.FC = () => {
  const { hostId } = useParams();
  const [data, setData] = useState<GuideData | null>(null);

  useEffect(() => {
    const allGuides = JSON.parse(localStorage.getItem('casa_verde_all_guides') || '{}');
    if (allGuides[hostId || '']) {
      setData(allGuides[hostId || '']);
    }
  }, [hostId]);

  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="font-serif text-3xl text-primary">Guia não encontrado</h1>
      <p className="opacity-70">Verifique o link enviado pelo seu anfitrião.</p>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Home data={data} />} />
      <Route path="/wifi" element={<Wifi data={data} />} />
      <Route path="/contact" element={<Contact data={data} />} />
      <Route path="/rules" element={<Rules data={data} />} />
      <Route path="/checkin" element={<CheckIn data={data} />} />
      <Route path="/checkout" element={<CheckOut data={data} />} />
      <Route path="/amenities" element={<Amenities data={data} />} />
      <Route path="/directions" element={<Directions data={data} />} />
      <Route path="/feedback" element={<Feedback data={data} />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />

        {/* Guest Portal Route - Dynamic */}
        <Route path="/guide/:hostId/*" element={<Layout isGuest><GuestRouter /></Layout>} />

        {/* Management Route - Protected */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <Layout><AdminWrapper /></Layout>
          </ProtectedRoute>
        } />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = localStorage.getItem('casa_verde_user');
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AdminWrapper: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('casa_verde_user') || '{}');
  const [allGuides, setAllGuides] = useState(() => JSON.parse(localStorage.getItem('casa_verde_all_guides') || '{}'));
  
  const currentGuideData = allGuides[user.id] || { ...INITIAL_GUIDE_DATA, hostId: user.id };

  const handleUpdate = (newData: GuideData) => {
    const updated = { ...allGuides, [user.id]: newData };
    setAllGuides(updated);
    localStorage.setItem('casa_verde_all_guides', JSON.stringify(updated));
  };

  return <Management data={currentGuideData} onUpdate={handleUpdate} />;
};

export default App;
