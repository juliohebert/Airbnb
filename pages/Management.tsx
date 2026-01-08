
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuideData } from '../types';

interface ManagementProps {
  data: GuideData;
  onUpdate: (data: GuideData) => void;
}

const Management: React.FC<ManagementProps> = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState<GuideData>(data);
  const [activeTab, setActiveTab] = useState<'property' | 'host' | 'wifi' | 'rules'>('property');
  const navigate = useNavigate();
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
    <div className="max-w-4xl mx-auto pt-2 pb-24 relative">
      {/* Header Admin - Share Section Optimized for Mobile */}
      <div className="bg-primary/5 dark:bg-primary/10 p-5 md:p-6 rounded-3xl mb-8 border-2 border-primary/20">
        <h2 className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest mb-3">Link Exclusivo do Hóspede</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-black/20 p-2 rounded-xl border border-primary/10">
            <input 
              type="text" 
              readOnly 
              value={guestLink} 
              className="flex-grow bg-transparent border-none text-xs font-mono focus:ring-0 overflow-hidden text-ellipsis"
            />
            <button 
              onClick={copyLink}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              title="Copiar Link"
            >
              <span className="material-icons-outlined">content_copy</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <a 
              href={guestLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-md active:scale-95 transition-transform"
            >
              <span className="material-icons-outlined text-sm">visibility</span>
              Ver Guia
            </a>
            <button 
               onClick={copyLink}
               className="border-2 border-primary text-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform"
            >
              <span className="material-icons-outlined text-sm">share</span>
              Compartilhar
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 className="font-serif text-2xl md:text-4xl text-primary">Ajustes</h1>
        <button 
          onClick={handleSave} 
          className="bg-primary text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-bold shadow-md hover:bg-primary-light transition-colors text-sm md:text-base"
        >
          Salvar
        </button>
      </div>

      {/* Tabs - Horizontal Scroll on Mobile */}
      <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {[
          { id: 'property', label: 'Local', icon: 'cottage' },
          { id: 'host', label: 'Anfitrião', icon: 'person' },
          { id: 'wifi', label: 'Wi-Fi', icon: 'wifi' },
          { id: 'rules', label: 'Regras', icon: 'fact_check' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-all text-xs md:text-sm ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'bg-card-light text-primary border border-primary/10'}`}
          >
            <span className="material-icons-outlined text-base md:text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-card-dark p-6 md:p-8 rounded-3xl shadow-soft space-y-6 border border-primary/10">
        {activeTab === 'property' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Nome da Propriedade</label>
              <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.property.name} onChange={(e) => updateProperty('name', e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Endereço</label>
              <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.property.addressLine1} onChange={(e) => updateProperty('addressLine1', e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Cidade e Estado</label>
              <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.property.cityStateZip} onChange={(e) => updateProperty('cityStateZip', e.target.value)} />
            </div>
          </div>
        )}

        {activeTab === 'host' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Seu Nome / Nomes</label>
              <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.host.names} onChange={(e) => updateHost('names', e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">URL da Foto (Perfil)</label>
              <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.host.photoUrl} onChange={(e) => updateHost('photoUrl', e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Bio ou Mensagem</label>
              <textarea className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3 h-28" value={formData.host.bio} onChange={(e) => updateHost('bio', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Telefone</label>
                <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.host.phone} onChange={(e) => updateHost('phone', e.target.value)} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">E-mail</label>
                <input type="email" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.host.email} onChange={(e) => updateHost('email', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wifi' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Nome da Rede Wi-Fi</label>
              <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.wifi.ssid} onChange={(e) => updateWifi('ssid', e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Senha do Wi-Fi</label>
              <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.wifi.password} onChange={(e) => updateWifi('password', e.target.value)} />
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-primary text-sm">Regras de Convivência</h3>
              <button 
                onClick={() => {
                  const newRule = { id: Date.now().toString(), category: 'Geral', icon: 'info', rule: '' };
                  setFormData({ ...formData, rules: [...formData.rules, newRule] });
                }}
                className="bg-primary text-white p-2 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
              >
                <span className="material-icons-outlined">add</span>
              </button>
            </div>
            <div className="space-y-3">
              {formData.rules.map((rule, idx) => (
                <div key={rule.id} className="flex gap-2 items-start bg-background-light/40 dark:bg-black/10 p-2 rounded-xl border border-primary/5">
                  <textarea 
                    className="flex-grow rounded-lg border-none bg-transparent text-sm focus:ring-0 resize-none p-1" 
                    placeholder="Escreva a regra..."
                    value={rule.rule} 
                    onChange={(e) => {
                      const newRules = [...formData.rules];
                      newRules[idx].rule = e.target.value;
                      setFormData({ ...formData, rules: newRules });
                    }} 
                  />
                  <button className="text-red-400 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" onClick={() => {
                    setFormData({ ...formData, rules: formData.rules.filter(r => r.id !== rule.id) });
                  }}>
                    <span className="material-icons-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Save for Mobile */}
      <div className="fixed bottom-6 left-0 right-0 px-4 md:hidden pointer-events-none">
        <button 
          onClick={handleSave}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-2xl pointer-events-auto active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <span className="material-icons-outlined">save</span>
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default Management;
