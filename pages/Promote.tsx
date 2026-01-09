import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const Promote: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePromote = async () => {
    try {
      setLoading(true);
      setMessage('');
      
      await api.promoteToSuperAdmin();
      
      // Atualizar o usuário no localStorage
      const currentUser = JSON.parse(localStorage.getItem('casa_verde_user') || '{}');
      currentUser.isSuperAdmin = true;
      localStorage.setItem('casa_verde_user', JSON.stringify(currentUser));
      
      setMessage('✅ Você agora é Super Admin! Redirecionando...');
      
      setTimeout(() => {
        navigate('/super-admin');
      }, 2000);
    } catch (error) {
      setMessage(`❌ Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-serif font-bold text-primary mb-6">
          Promover a Super Admin
        </h1>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Esta página permite que você se promova a Super Administrador do sistema.
          </p>
          <p className="text-sm text-orange-600 dark:text-orange-400">
            ⚠️ Esta é uma rota temporária que deve ser removida em produção.
          </p>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.includes('✅') 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
          }`}>
            {message}
          </div>
        )}

        <button
          onClick={handlePromote}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Promovendo...' : 'Promover a Super Admin'}
        </button>

        <button
          onClick={() => navigate('/admin')}
          className="w-full mt-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Promote;
