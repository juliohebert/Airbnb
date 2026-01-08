
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('casa_verde_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('casa_verde_user', JSON.stringify(user));
      navigate('/admin');
    } else {
      alert('Credenciais inválidas. Use "teste@teste.com" / "123456" ou cadastre-se.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 pt-12">
      <div className="bg-white dark:bg-card-dark p-8 rounded-3xl shadow-soft border border-primary/10">
        <h1 className="font-serif text-3xl text-primary mb-2 text-center">Acesso do Gestor</h1>
        <p className="text-sm text-center opacity-70 mb-8">Gerencie as informações do seu imóvel.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-primary uppercase mb-1">E-mail</label>
            <input 
              type="email" 
              required
              className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary uppercase mb-1">Senha</label>
            <input 
              type="password" 
              required
              className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg hover:bg-primary-light transition-colors">
            Entrar
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="opacity-70 mb-2">Não tem uma conta?</p>
          <Link to="/register" className="text-primary font-bold hover:underline">Cadastre sua Propriedade</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
