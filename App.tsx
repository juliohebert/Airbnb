
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
import SuperAdmin from './pages/SuperAdmin';
import Promote from './pages/Promote';

const Layout: React.FC<{ children: React.ReactNode, isGuest?: boolean }> = ({ children, isGuest }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { hostId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('casa_verde_user') || 'null');

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem('casa_verde_user');
    navigate('/login');
  };

  const homeLink = isGuest ? `/guide/${hostId}` : (currentUser ? '/admin' : '/login');

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light transition-colors duration-300 font-sans relative overflow-x-hidden">
      <div className="fixed top-0 left-0 w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-10 dark:opacity-5 z-0">
        <DecorativeLeaf className="w-full h-full rotate-180 transform -translate-x-4 -translate-y-4" />
      </div>
      <div className="fixed top-0 right-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none opacity-20 dark:opacity-5 z-0">
        <DecorativeLeaf className="w-full h-full" />
      </div>

      <nav className="relative z-50 w-full p-4 md:p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link to={homeLink} className="flex items-center gap-2 active:scale-95 transition-transform">
          <span className="material-icons-outlined text-primary text-2xl md:text-3xl">cottage</span>
          <span className="font-serif text-lg md:text-xl text-primary font-bold tracking-wide">Casa Verde</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          {!isGuest && currentUser && (
            <button onClick={handleLogout} className="text-red-600 font-bold text-xs md:text-sm flex items-center gap-1 p-2">
              <span className="material-icons-outlined text-sm">logout</span> <span className="hidden sm:inline">Sair</span>
            </button>
          )}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-card-light dark:bg-card-dark text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <span className="material-icons-outlined block dark:hidden text-xl">dark_mode</span>
            <span className="material-icons-outlined hidden dark:block text-xl">light_mode</span>
          </button>
        </div>
      </nav>

      <main className="relative z-10 w-full px-4 md:px-6">
        {children}
      </main>

      <footer className="text-center py-8 opacity-40 text-[10px] md:text-xs font-sans relative z-10 border-t border-primary/5 mt-12 px-4">
        © 2026 Guia Digital Casa Verde.
      </footer>
    </div>
  );
};

const GuestRouter: React.FC = () => {
  const { hostId } = useParams(); // Now this acts as the unique property ID
  const [data, setData] = useState<GuideData | null>(null);
  const [isSuspended, setIsSuspended] = useState(false);

  useEffect(() => {
    const allUsers: User[] = JSON.parse(localStorage.getItem('casa_verde_users') || '[]');
    const allGuides: { [key: string]: GuideData } = JSON.parse(localStorage.getItem('casa_verde_all_guides') || '{}');
    
    // Find the guide data for this specific property ID
    const guide = allGuides[hostId || ''];
    
    if (guide) {
      // Check if the owner of this property is active
      const owner = allUsers.find(u => u.id === guide.hostId);
      if (owner && !owner.isActive) {
        setIsSuspended(true);
        return;
      }
      setData(guide);
    } else if (hostId === 'demo') {
      setData({ ...INITIAL_GUIDE_DATA, hostId: 'demo', propertyId: 'demo' });
    }
  }, [hostId]);

  if (isSuspended) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <span className="material-icons-outlined text-7xl text-amber-500 mb-4 animate-pulse">lock_clock</span>
        <h1 className="font-serif text-3xl text-primary mb-3">Guia Indisponível</h1>
        <p className="opacity-70 max-w-sm mb-6">
          Este guia de boas-vindas está temporariamente suspenso. Por favor, entre em contato com seu anfitrião para obter as informações de acesso.
        </p>
      </div>
    );
  }

  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <span className="material-icons-outlined text-6xl text-primary/20 mb-4">search_off</span>
      <h1 className="font-serif text-2xl text-primary mb-2">Guia não encontrado</h1>
      <Link to="/login" className="mt-6 text-primary font-bold underline">Voltar ao Login</Link>
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
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/promote" element={<Layout><Promote /></Layout>} />
        <Route path="/super-admin" element={<Layout><SuperAdmin /></Layout>} />
        <Route path="/guide/:hostId/*" element={<Layout isGuest><GuestRouter /></Layout>} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Layout><AdminWrapper /></Layout>
          </ProtectedRoute>
        } />
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
  // Pass a dummy guide to satisfy Management props, it will manage its own state now
  return <Management data={null as any} onUpdate={() => {}} />;
};

export default App;
