
import React, { useState, useEffect } from 'react';
import { User } from '../types';

const SuperAdmin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const storedUsers = JSON.parse(localStorage.getItem('casa_verde_users') || '[]');
      setUsers(storedUsers);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterPassword === 'admin123') { // Simple hardcoded master password
      setIsAuthenticated(true);
    } else {
      alert('Senha mestra incorreta.');
    }
  };

  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('casa_verde_users', JSON.stringify(updatedUsers));
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto pt-20 px-6">
        <div className="bg-white dark:bg-card-dark p-8 rounded-3xl shadow-soft border border-primary/20">
          <h1 className="font-serif text-2xl text-primary mb-6 text-center">Portal do Licenciador</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Senha Mestra"
              className="w-full rounded-xl border-gray-200"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
            />
            <button className="w-full bg-primary text-white py-3 rounded-xl font-bold">Acessar Sistema</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-4 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-4xl text-primary">Gestão de Licenças</h1>
          <p className="opacity-70">Controle o acesso de todos os anfitriões cadastrados.</p>
        </div>
        <div className="bg-primary/10 px-6 py-3 rounded-2xl flex items-center gap-4">
          <div className="text-center">
            <span className="block text-xs font-bold text-primary uppercase">Total de Clientes</span>
            <span className="text-2xl font-bold text-primary">{users.length}</span>
          </div>
          <div className="h-10 w-[1px] bg-primary/20"></div>
          <div className="text-center">
            <span className="block text-xs font-bold text-primary uppercase">Ativos</span>
            <span className="text-2xl font-bold text-primary">{users.filter(u => u.isActive).length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-card-dark rounded-3xl shadow-soft overflow-hidden border border-primary/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                <th className="p-4 border-b border-primary/10">Propriedade / Gestor</th>
                <th className="p-4 border-b border-primary/10">ID / Link</th>
                <th className="p-4 border-b border-primary/10">Status Licença</th>
                <th className="p-4 border-b border-primary/10 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center opacity-40">Nenhum gestor cadastrado no momento.</td>
                </tr>
              ) : (
                users.map(u => (
                  <tr key={u.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-primary">{u.propertyName}</div>
                      <div className="text-xs opacity-60">{u.ownerName} • {u.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-xs">{u.id}</div>
                      <a 
                        href={`${window.location.origin}${window.location.pathname}#/guide/${u.id}`} 
                        target="_blank" 
                        className="text-[10px] text-primary underline"
                      >
                        Abrir Link do Hóspede
                      </a>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {u.isActive ? 'Ativo (Pago)' : 'Inativo (Suspenso)'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${u.isActive ? 'border border-red-200 text-red-600 hover:bg-red-50' : 'bg-primary text-white shadow-md'}`}
                      >
                        {u.isActive ? 'Suspender' : 'Reativar'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
