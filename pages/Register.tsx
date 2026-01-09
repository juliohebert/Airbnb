
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    propertyName: '',
    ownerName: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.register(
        formData.email,
        formData.password,
        formData.propertyName,
        formData.ownerName
      );
      
      alert('Conta criada com sucesso!');
      navigate('/admin');
    } catch (error: any) {
      alert(error.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 pt-12">
      <div className="bg-white dark:bg-card-dark p-8 rounded-3xl shadow-soft border border-primary/10">
        <h1 className="font-serif text-3xl text-primary mb-2 text-center">Criar Conta</h1>
        <p className="text-sm text-center opacity-70 mb-8">Comece a personalizar seu guia de boas-vindas.</p>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-primary uppercase mb-1">Nome da Propriedade</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Chalé Vale Verde"
              className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary"
              value={formData.propertyName}
              onChange={(e) => setFormData({...formData, propertyName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary uppercase mb-1">Seu Nome</label>
            <input 
              type="text" 
              required
              className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary"
              value={formData.ownerName}
              onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary uppercase mb-1">E-mail</label>
            <input 
              type="email" 
              required
              className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary uppercase mb-1">Senha</label>
            <input 
              type="password" 
              required
              className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar e Começar'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="opacity-70 mb-2">Já possui uma conta?</p>
          <Link to="/login" className="text-primary font-bold hover:underline">Fazer Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
