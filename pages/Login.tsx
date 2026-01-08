
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [suspendedUser, setSuspendedUser] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSuspendedUser(false);
    
    const users = JSON.parse(localStorage.getItem('casa_verde_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      if (!user.isActive) {
        setSuspendedUser(true);
        return;
      }
      localStorage.setItem('casa_verde_user', JSON.stringify(user));
      navigate('/admin');
    } else {
      alert('Credenciais inválidas. Verifique seu e-mail e senha ou cadastre-se.');
    }
  };

  const contactAdmin = () => {
    const message = encodeURIComponent(`Olá! Meu acesso ao Casa Verde (${email}) está suspenso. Gostaria de verificar a regularização.`);
    window.open(`https://wa.me/5500000000000?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-md mx-auto px-6 pt-12">
      <div className="bg-white dark:bg-card-dark p-8 rounded-3xl shadow-soft border border-primary/10">
        <h1 className="font-serif text-3xl text-primary mb-2 text-center">Acesso do Gestor</h1>
        <p className="text-sm text-center opacity-70 mb-8">Gerencie as informações do seu imóvel.</p>
        
        {suspendedUser && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
              <span className="material-icons-outlined text-xl">lock_person</span>
              <span className="font-bold text-sm uppercase tracking-wider">Acesso Suspenso</span>
            </div>
            <p className="text-xs text-red-700/80 dark:text-red-300/80 mb-4 leading-relaxed">
              Sua licença de uso expirou ou foi desativada pelo administrador do sistema.
            </p>
            <button 
              onClick={contactAdmin}
              className="w-full bg-red-600 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-red-700 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              Falar com o Administrador
            </button>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-primary uppercase mb-1">E-mail</label>
            <input 
              type="email" 
              required
              className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary dark:bg-black/20"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSuspendedUser(false);
              }}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary uppercase mb-1">Senha</label>
            <input 
              type="password" 
              required
              className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary dark:bg-black/20"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setSuspendedUser(false);
              }}
            />
          </div>
          <button 
            type="submit" 
            disabled={suspendedUser}
            className={`w-full py-3 rounded-xl font-bold shadow-lg transition-all ${
              suspendedUser 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-primary-light'
            }`}
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 text-center text-sm space-y-4">
          <div>
            <p className="opacity-70 mb-2">Não tem uma conta?</p>
            <Link to="/register" className="text-primary font-bold hover:underline">Cadastre sua Propriedade</Link>
          </div>
          
          <div className="pt-6 border-t border-primary/5">
            <button 
              onClick={() => navigate('/super-admin')}
              className="flex items-center justify-center gap-2 mx-auto text-[10px] font-bold text-primary/30 hover:text-primary transition-colors uppercase tracking-widest"
            >
              <span className="material-icons-outlined text-xs">admin_panel_settings</span>
              Painel de Licenciamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
