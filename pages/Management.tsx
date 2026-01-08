
import React, { useState } from 'react';
import { GuideData } from '../types';

interface ManagementProps {
  data: GuideData;
  onUpdate: (data: GuideData) => void;
}

const Management: React.FC<ManagementProps> = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState<GuideData>(data);
  const [activeTab, setActiveTab] = useState<'property' | 'host' | 'wifi' | 'rules'>('property');

  const handleSave = () => {
    onUpdate(formData);
    alert('Configurações salvas com sucesso!');
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-4xl text-primary">Gestão da Propriedade</h1>
        <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-primary-light transition-colors">
          Salvar Alterações
        </button>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {['property', 'host', 'wifi', 'rules'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-lg font-bold capitalize transition-all ${activeTab === tab ? 'bg-primary text-white' : 'bg-card-light text-primary hover:bg-primary/10'}`}
          >
            {tab === 'property' ? 'Propriedade' : tab === 'host' ? 'Anfitrião' : tab === 'wifi' ? 'Wi-Fi' : 'Regras'}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-card-dark p-8 rounded-3xl shadow-soft space-y-6">
        {activeTab === 'property' && (
          <>
            <div>
              <label className="block text-sm font-bold text-primary mb-1">Nome da Propriedade</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.property.name} onChange={(e) => updateProperty('name', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-1">Endereço Linha 1</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.property.addressLine1} onChange={(e) => updateProperty('addressLine1', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-1">Cidade, Estado e CEP</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.property.cityStateZip} onChange={(e) => updateProperty('cityStateZip', e.target.value)} />
            </div>
          </>
        )}

        {activeTab === 'host' && (
          <>
            <div>
              <label className="block text-sm font-bold text-primary mb-1">Nomes</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.host.names} onChange={(e) => updateHost('names', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-1">URL da Foto</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.host.photoUrl} onChange={(e) => updateHost('photoUrl', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-1">Bio/Tagline</label>
              <textarea className="w-full rounded-xl border-gray-200" value={formData.host.bio} onChange={(e) => updateHost('bio', e.target.value)} />
            </div>
          </>
        )}

        {activeTab === 'wifi' && (
          <>
            <div>
              <label className="block text-sm font-bold text-primary mb-1">Nome da Rede (SSID)</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.wifi.ssid} onChange={(e) => updateWifi('ssid', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-1">Senha</label>
              <input type="text" className="w-full rounded-xl border-gray-200" value={formData.wifi.password} onChange={(e) => updateWifi('password', e.target.value)} />
            </div>
          </>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-4">
            <p className="text-sm opacity-60">Aqui você pode gerenciar as regras listadas para os hóspedes.</p>
            {formData.rules.map((rule, idx) => (
              <div key={rule.id} className="flex items-center gap-2">
                <input 
                  type="text" 
                  className="flex-grow rounded-xl border-gray-200" 
                  value={rule.rule} 
                  onChange={(e) => {
                    const newRules = [...formData.rules];
                    newRules[idx].rule = e.target.value;
                    setFormData({ ...formData, rules: newRules });
                  }} 
                />
                <button className="text-red-500 material-icons-outlined" onClick={() => {
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
