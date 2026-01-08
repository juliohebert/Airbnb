
import React, { useState } from 'react';
import { GuideData } from '../types';

interface ManagementProps {
  data: GuideData;
  onUpdate: (data: GuideData) => void;
}

const Management: React.FC<ManagementProps> = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState<GuideData>(data);
  const [activeTab, setActiveTab] = useState<'property' | 'host' | 'wifi' | 'rules'>('property');
  const guestLink = `${window.location.origin}${window.location.pathname}#/guide/${data.hostId}`;

  const handleSave = () => {
    onUpdate(formData);
    alert('Configurações salvas com sucesso!');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(guestLink);
    alert('Link copiado para a área de transferência!');
  };

  const updateHost = (field: string, value: string) => {
    setFormData({ ...formData, host: { ...formData.host, [field]: value } });
  };

  const updateProperty = (field: string, value: string) => {
    setFormData({ ...formData, property: { ...formData.property, [field]: value } });
  };

  const updateWifi = (field: string, value: string) => {
    setFormData({ ...formData, wifi: { ...formData.wifi, [field]: value } });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header Admin */}
      <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-3xl mb-8 border-2 border-primary/20">
        <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Link do Seu Guia para Hóspedes</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            readOnly 
            value={guestLink} 
            className="flex-grow bg-white dark:bg-black/20 rounded-xl border-primary/20 text-sm font-mono"
          />
          <button 
            onClick={copyLink}
            className="bg-primary text-white px-6 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-light transition-all"
          >
            <span className="material-icons-outlined text-sm">content_copy</span>
            Copiar Link
          </button>
          <a 
            href={guestLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="border-2 border-primary text-primary px-6 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all"
          >
            <span className="material-icons-outlined text-sm">visibility</span>
            Ver Guia
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-4xl text-primary">Configurações</h1>
        <button onClick={handleSave} className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-primary-light transition-colors">
          Salvar Dados
        </button>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'property', label: 'Propriedade', icon: 'cottage' },
          { id: 'host', label: 'Anfitrião', icon: 'person' },
          { id: 'wifi', label: 'Wi-Fi', icon: 'wifi' },
          { id: 'rules', label: 'Regras', icon: 'fact_check' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-card-light text-primary hover:bg-primary/10'}`}
          >
            <span className="material-icons-outlined text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-card-dark p-8 rounded-3xl shadow-soft space-y-6 border border-primary/10">
        {activeTab === 'property' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-primary uppercase mb-1">Nome Comercial</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.property.name} onChange={(e) => updateProperty('name', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary uppercase mb-1">Endereço Principal</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.property.addressLine1} onChange={(e) => updateProperty('addressLine1', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary uppercase mb-1">Cidade, Estado e CEP</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.property.cityStateZip} onChange={(e) => updateProperty('cityStateZip', e.target.value)} />
            </div>
          </div>
        )}

        {activeTab === 'host' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-primary uppercase mb-1">Nomes (como aparecerá no guia)</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.host.names} onChange={(e) => updateHost('names', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary uppercase mb-1">URL da Foto de Perfil</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.host.photoUrl} onChange={(e) => updateHost('photoUrl', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary uppercase mb-1">Breve Bio / Mensagem de Boas-vindas</label>
              <textarea className="w-full rounded-xl border-gray-200 h-24" value={formData.host.bio} onChange={(e) => updateHost('bio', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-1">Telefone / WhatsApp</label>
                <input type="text" className="w-full rounded-xl border-gray-200" value={formData.host.phone} onChange={(e) => updateHost('phone', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-primary uppercase mb-1">E-mail de Contato</label>
                <input type="email" className="w-full rounded-xl border-gray-200" value={formData.host.email} onChange={(e) => updateHost('email', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wifi' && (
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-2xl mb-4 text-sm text-primary">
              Estas informações aparecerão na tela de Wi-Fi do hóspede.
            </div>
            <div>
              <label className="block text-xs font-bold text-primary uppercase mb-1">Nome da Rede (SSID)</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.wifi.ssid} onChange={(e) => updateWifi('ssid', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary uppercase mb-1">Senha</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.wifi.password} onChange={(e) => updateWifi('password', e.target.value)} />
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-primary">Regras Cadastradas</h3>
              <button 
                onClick={() => {
                  const newRule = { id: Date.now().toString(), category: 'Geral', icon: 'info', rule: 'Nova regra...' };
                  setFormData({ ...formData, rules: [...formData.rules, newRule] });
                }}
                className="text-primary text-sm font-bold flex items-center gap-1"
              >
                <span className="material-icons-outlined text-sm">add</span> Adicionar Regra
              </button>
            </div>
            {formData.rules.map((rule, idx) => (
              <div key={rule.id} className="flex items-center gap-3 bg-background-light dark:bg-black/10 p-3 rounded-xl border border-primary/5">
                <input 
                  type="text" 
                  className="flex-grow rounded-lg border-gray-200 text-sm" 
                  value={rule.rule} 
                  onChange={(e) => {
                    const newRules = [...formData.rules];
                    newRules[idx].rule = e.target.value;
                    setFormData({ ...formData, rules: newRules });
                  }} 
                />
                <button className="text-red-500 material-icons-outlined p-2 hover:bg-red-50 rounded-lg" onClick={() => {
                  setFormData({ ...formData, rules: formData.rules.filter(r => r.id !== rule.id) });
                }}>delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Management;
