
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    propertyName: '',
    ownerName: ''
  });
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('casa_verde_users') || '[]');
    
    if (users.find((u: any) => u.email === formData.email)) {
      alert('Este e-mail já está cadastrado.');
      return;
    }

    const hostId = Math.random().toString(36).substring(2, 9);
    const newUser = {
      id: hostId,
      email: formData.email,
      password: formData.password,
      propertyName: formData.propertyName,
      ownerName: formData.ownerName,
      isActive: true,
      createdAt: Date.now(),
      subscriptionExpiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days trial
      paymentHistory: []
    };

    localStorage.setItem('casa_verde_users', JSON.stringify([...users, newUser]));
    localStorage.setItem('casa_verde_user', JSON.stringify(newUser));
    navigate('/admin');
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
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg hover:bg-primary-light transition-colors">
            Cadastrar e Começar
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
