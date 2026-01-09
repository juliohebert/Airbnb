
import React, { useState, useEffect } from 'react';
import { User, PaymentRecord } from '../types';
import { api } from '../api';

const SuperAdmin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('97.00');
  const [loading, setLoading] = useState(false);

  // Load users whenever authentication state changes or component mounts
  useEffect(() => {
    if (isAuthenticated) {
      loadUsers();
    }
  }, [isAuthenticated]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const loadedUsers = await api.getUsers();
      setUsers(loadedUsers);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      alert('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterPassword === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Senha mestra incorreta.');
    }
  };

  const toggleUserStatus = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;
      
      await api.updateUserStatus(userId, !user.isActive);
      await loadUsers(); // Recarregar lista
      alert('Status atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status');
    }
  };

  const registerPayment = async () => {
    if (!selectedUser) return;
    
    try {
      setLoading(true);
      
      const amount = parseFloat(paymentAmount);
      await api.registerPayment(selectedUser.id, amount, 'Pix/Cartão');
      
      // Recarregar lista de usuários
      await loadUsers();
      
      setShowPaymentModal(false);
      setSelectedUser(null);
      alert('Pagamento registrado e licença renovada por 30 dias!');
    } catch (error) {
      console.error('Erro ao registrar pagamento:', error);
      alert('Erro ao registrar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const calculateTotalRevenue = () => {
    return users.reduce((acc, user) => 
      acc + (user.paymentHistory?.reduce((sum, p) => sum + p.amount, 0) || 0), 0
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto pt-20 px-6">
        <div className="bg-white dark:bg-card-dark p-8 rounded-3xl shadow-soft border border-primary/20">
          <h1 className="font-serif text-2xl text-primary mb-6 text-center flex items-center justify-center gap-2">
            <span className="material-icons-outlined">admin_panel_settings</span>
            SaaS Control Center
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Senha Mestra"
              className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary px-4 py-3"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
            />
            <button className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">
              Entrar no Painel de Controle
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-4 pb-32 px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-card-dark p-6 rounded-3xl border border-primary/10 shadow-soft">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">Clientes Totais</span>
          <span className="text-3xl font-serif text-primary">{users.length}</span>
        </div>
        <div className="bg-white dark:bg-card-dark p-6 rounded-3xl border border-primary/10 shadow-soft">
          <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest block mb-1">Licenças Ativas</span>
          <span className="text-3xl font-serif text-green-600">{users.filter(u => u.isActive).length}</span>
        </div>
        <div className="bg-white dark:bg-card-dark p-6 rounded-3xl border border-primary/10 shadow-soft">
          <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-1">Acessos Suspensos</span>
          <span className="text-3xl font-serif text-red-600">{users.filter(u => !u.isActive).length}</span>
        </div>
        <div className="bg-primary text-white p-6 rounded-3xl shadow-lg">
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest block mb-1">Faturamento Total</span>
          <span className="text-3xl font-serif">{formatCurrency(calculateTotalRevenue())}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-card-dark rounded-3xl shadow-soft overflow-hidden border border-primary/10">
        <div className="overflow-x-auto min-h-[300px]">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-center">
              <span className="material-icons-outlined text-5xl text-primary/20 mb-4">group_off</span>
              <p className="text-primary font-serif text-xl">Nenhum cliente cadastrado ainda.</p>
              <p className="text-xs opacity-50 mt-1 uppercase tracking-widest">Os novos registros aparecerão aqui automaticamente</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest">
                  <th className="p-5 border-b border-primary/10">Gestor & Propriedade</th>
                  <th className="p-5 border-b border-primary/10">Cadastro</th>
                  <th className="p-5 border-b border-primary/10">Expiração</th>
                  <th className="p-5 border-b border-primary/10">Status</th>
                  <th className="p-5 border-b border-primary/10">Histórico</th>
                  <th className="p-5 border-b border-primary/10 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-5">
                      <div className="font-bold text-primary">{u.propertyName}</div>
                      <div className="text-xs opacity-60 font-medium">{u.ownerName} • {u.email}</div>
                    </td>
                    <td className="p-5">
                      <div className="text-sm font-medium text-primary/70">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-[10px] opacity-40 uppercase font-bold tracking-tighter">Data de Registro</div>
                    </td>
                    <td className="p-5">
                      <div className="text-sm font-bold text-text-dark dark:text-text-light">
                        {u.subscriptionExpiresAt 
                          ? new Date(u.subscriptionExpiresAt).toLocaleDateString()
                          : 'Período Trial'}
                      </div>
                      {u.subscriptionExpiresAt && (
                        <div className={`text-[10px] font-bold uppercase mt-1 ${
                          (u.subscriptionExpiresAt - Date.now()) < 0 ? 'text-red-500' : 'text-primary/60'
                        }`}>
                          {Math.ceil((u.subscriptionExpiresAt - Date.now()) / (1000 * 60 * 60 * 24))} dias restantes
                        </div>
                      )}
                    </td>
                    <td className="p-5">
                      <button 
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all shadow-sm ${
                          u.isActive 
                            ? 'bg-green-100 text-green-700 hover:bg-red-50 hover:text-red-600' 
                            : 'bg-red-100 text-red-700 hover:bg-green-50 hover:text-green-600'
                        }`}
                      >
                        {u.isActive ? 'Ativo' : 'Suspenso'}
                      </button>
                    </td>
                    <td className="p-5">
                      <button 
                        onClick={() => { setSelectedUser(u); setShowHistoryModal(true); }}
                        className="flex items-center group cursor-pointer"
                        title="Clique para ver histórico completo"
                      >
                        <div className="flex -space-x-2 mr-2">
                          {u.paymentHistory && u.paymentHistory.length > 0 ? (
                            u.paymentHistory.slice(0, 4).map(p => (
                              <div 
                                key={p.id} 
                                className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-[10px] border-2 border-white shadow-sm font-bold"
                              >
                                $
                              </div>
                            ))
                          ) : (
                            <span className="text-[10px] italic opacity-40">Sem faturas</span>
                          )}
                        </div>
                        {u.paymentHistory && u.paymentHistory.length > 4 && (
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-md group-hover:bg-primary group-hover:text-white transition-colors">
                            +{u.paymentHistory.length - 4}
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="p-5 text-right">
                      <button 
                        onClick={() => { setSelectedUser(u); setShowPaymentModal(true); }}
                        className="bg-primary text-white px-4 py-2 rounded-xl text-[10px] font-bold shadow-md hover:bg-primary-light active:scale-95 transition-all"
                      >
                        Registrar Pix
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-card-dark w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-primary/20 animate-in fade-in zoom-in duration-200 flex flex-col max-h-[80vh]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-serif text-2xl text-primary">Extrato de Pagamentos</h2>
                <p className="text-xs opacity-60 uppercase font-bold tracking-widest">{selectedUser.propertyName}</p>
              </div>
              <button 
                onClick={() => setShowHistoryModal(false)}
                className="p-2 hover:bg-primary/5 rounded-full text-primary/40 hover:text-primary transition-colors"
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {selectedUser.paymentHistory && selectedUser.paymentHistory.length > 0 ? (
                selectedUser.paymentHistory.map((payment) => (
                  <div key={payment.id} className="bg-primary/5 dark:bg-black/20 p-4 rounded-2xl border border-primary/10 flex justify-between items-center">
                    <div>
                      <div className="text-xs font-bold text-primary uppercase mb-1">{new Date(payment.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                      <div className="text-xs opacity-60">{payment.method} • ID: {payment.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary text-lg">{formatCurrency(payment.amount)}</div>
                      <div className="text-[10px] text-green-600 font-bold uppercase flex items-center justify-end gap-1">
                        <span className="material-icons-outlined text-xs">check_circle</span> Recebido
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-40 italic">Nenhum pagamento registrado.</div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-primary/10 flex justify-between items-center">
              <span className="text-sm font-bold text-primary/60">Total Investido:</span>
              <span className="text-xl font-serif text-primary">
                {formatCurrency(selectedUser.paymentHistory?.reduce((sum, p) => sum + p.amount, 0) || 0)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-card-dark w-full max-w-md rounded-3xl p-8 shadow-2xl border border-primary/20 animate-in fade-in zoom-in duration-200">
            <h2 className="font-serif text-2xl text-primary mb-2">Registrar Assinatura</h2>
            <p className="text-sm opacity-70 mb-6 font-medium">Você está renovando a licença de <b>{selectedUser.propertyName}</b> por mais 30 dias.</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-1 px-1 tracking-widest">Valor Recebido (R$)</label>
                <input 
                  type="text" 
                  className="w-full rounded-xl border-gray-100 bg-background-light p-4 font-mono text-xl text-primary focus:ring-2 focus:ring-primary/20 border-2"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex justify-between text-xs mb-2">
                  <span className="opacity-60">Expiração Atual:</span>
                  <span className="font-bold text-primary">
                    {selectedUser.subscriptionExpiresAt ? new Date(selectedUser.subscriptionExpiresAt).toLocaleDateString() : 'Trial / Imediata'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-primary pt-2 border-t border-primary/10">
                  <span className="font-bold">Nova Expiração:</span>
                  <span className="font-black underline text-sm">
                    {new Date(Math.max(selectedUser.subscriptionExpiresAt || Date.now(), Date.now()) + (30 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 border-2 border-gray-100 py-4 rounded-xl font-bold text-sm text-gray-400 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={registerPayment}
                className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-sm shadow-xl hover:bg-primary-light transition-all active:scale-95"
              >
                Confirmar Pagamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
