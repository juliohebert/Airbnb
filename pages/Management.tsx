
import React, { useState, useEffect } from 'react';
import { GuideData, User } from '../types';
import { INITIAL_GUIDE_DATA } from '../constants';

interface ManagementProps {
  data: GuideData; // This will now represent the "currently editing" property
  onUpdate: (data: GuideData) => void;
}

const Management: React.FC<ManagementProps> = ({ data, onUpdate }) => {
  const user: User = JSON.parse(localStorage.getItem('casa_verde_user') || '{}');
  const [allGuides, setAllGuides] = useState<{ [key: string]: GuideData }>(() => 
    JSON.parse(localStorage.getItem('casa_verde_all_guides') || '{}')
  );
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'property' | 'host' | 'wifi' | 'rules'>('property');
  const [formData, setFormData] = useState<GuideData | null>(null);
  const [isNewProperty, setIsNewProperty] = useState(false);

  // Fix: Explicitly cast guide objects to GuideData to resolve property access errors
  const myProperties = Object.values(allGuides).filter((g: any) => g.hostId === user.id) as GuideData[];

  const startEditing = (property: GuideData, isNew: boolean = false) => {
    setFormData(property);
    setEditingId(property.propertyId || property.hostId); // Fallback for legacy data
    setIsNewProperty(isNew);
    window.scrollTo(0, 0);
  };

  const createNewProperty = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newProperty: GuideData = {
      ...INITIAL_GUIDE_DATA,
      hostId: user.id,
      propertyId: newId,
      property: {
        ...INITIAL_GUIDE_DATA.property,
        name: "Nova Propriedade"
      }
    };
    // Não salva imediatamente - só ao clicar em Salvar
    startEditing(newProperty, true);
  };

  const handleSave = () => {
    if (!formData || !editingId) {
      console.log('handleSave: missing data', { formData, editingId });
      return;
    }
    const updated = { ...allGuides, [editingId]: formData };
    setAllGuides(updated);
    localStorage.setItem('casa_verde_all_guides', JSON.stringify(updated));
    setEditingId(null);
    setFormData(null);
    setIsNewProperty(false);
    alert('Configurações salvas com sucesso!');
  };

  const handleCancel = () => {
    console.log('handleCancel called');
    // Se for nova propriedade e cancelar, não salva nada
    setEditingId(null);
    setFormData(null);
    setIsNewProperty(false);
  };

  const copyLink = (id: string) => {
    const guestLink = `${window.location.origin}${window.location.pathname}#/guide/${id}`;
    navigator.clipboard.writeText(guestLink);
    alert('Link do hóspede copiado!');
  };

  const deleteProperty = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta propriedade e todo o seu guia?')) {
      const { [id]: _, ...rest } = allGuides;
      setAllGuides(rest);
      localStorage.setItem('casa_verde_all_guides', JSON.stringify(rest));
    }
  };

  const updateHost = (field: string, value: string) => {
    if (formData) setFormData({ ...formData, host: { ...formData.host, [field]: value } });
  };

  const updateProperty = (field: string, value: string) => {
    if (formData) setFormData({ ...formData, property: { ...formData.property, [field]: value } });
  };

  const updateWifi = (field: string, value: string) => {
    if (formData) setFormData({ ...formData, wifi: { ...formData.wifi, [field]: value } });
  };

  // Dashboard View (List of Properties)
  if (!editingId) {
    return (
      <div className="max-w-5xl mx-auto pt-4 pb-24">
        <header className="flex justify-between items-end mb-10 px-2">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-primary">Suas Propriedades</h1>
            <p className="opacity-60 text-sm mt-1">Gerencie os guias de todos os seus imóveis</p>
          </div>
          <button 
            onClick={createNewProperty}
            className="bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-primary-light transition-all flex items-center gap-2 active:scale-95"
          >
            <span className="material-icons-outlined">add_business</span>
            <span className="hidden sm:inline">Adicionar Imóvel</span>
          </button>
        </header>

        {myProperties.length === 0 ? (
          <div className="bg-white dark:bg-card-dark rounded-[2.5rem] p-16 text-center border-2 border-dashed border-primary/20">
            <span className="material-icons-outlined text-6xl text-primary/20 mb-4">apartment</span>
            <p className="text-primary font-serif text-xl">Nenhuma propriedade cadastrada.</p>
            <button onClick={createNewProperty} className="mt-4 text-primary font-bold underline">Clique aqui para começar</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myProperties.map((p) => (
              <div key={p.propertyId || p.hostId} className="bg-white dark:bg-card-dark rounded-3xl p-6 shadow-soft border border-primary/10 flex flex-col justify-between group hover:border-primary/30 transition-all">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <span className="material-icons-outlined text-3xl">cottage</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => copyLink(p.propertyId || p.hostId)}
                        className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-full transition-colors"
                        title="Copiar Link do Hóspede"
                      >
                        <span className="material-icons-outlined text-xl">share</span>
                      </button>
                      <button 
                        onClick={() => deleteProperty(p.propertyId || p.hostId)}
                        className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Excluir"
                      >
                        <span className="material-icons-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-1">{p.property.name}</h3>
                  <p className="text-xs opacity-50 mb-6 truncate">{p.property.addressLine1}, {p.property.cityStateZip}</p>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => startEditing(p)}
                    className="flex-grow bg-primary/10 text-primary py-3 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all"
                  >
                    Editar Guia
                  </button>
                  <a 
                    href={`${window.location.origin}${window.location.pathname}#/guide/${p.propertyId || p.hostId}`}
                    target="_blank"
                    className="px-4 bg-gray-50 dark:bg-black/20 text-gray-400 hover:text-primary py-3 rounded-xl flex items-center justify-center transition-colors"
                    title="Visualizar como Hóspede"
                  >
                    <span className="material-icons-outlined">visibility</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Editing View (Specific Property)
  if (!formData) return null;

  return (
    <div className="max-w-4xl mx-auto pt-2 pb-48 relative">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={handleCancel}
          className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all"
        >
          <span className="material-icons-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="font-serif text-2xl text-primary">Editando: {formData.property.name}</h1>
          <p className="text-[10px] opacity-50 uppercase font-bold tracking-widest">Configurações do Guia Digital</p>
        </div>
      </div>

      <div className="bg-primary/5 dark:bg-primary/10 p-5 md:p-6 rounded-3xl mb-8 border-2 border-primary/20">
        <h2 className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest mb-3">Link Exclusivo desta Unidade</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-black/20 p-2 rounded-xl border border-primary/10">
            <input 
              type="text" 
              readOnly 
              value={`${window.location.origin}${window.location.pathname}#/guide/${editingId}`} 
              className="flex-grow bg-transparent border-none text-xs font-mono focus:ring-0 overflow-hidden text-ellipsis"
            />
            <button 
              onClick={() => copyLink(editingId)}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <span className="material-icons-outlined">content_copy</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 md:gap-4 mb-8 overflow-x-auto pb-4 no-scrollbar">
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

      <div className="bg-white dark:bg-card-dark p-6 md:p-8 rounded-3xl shadow-soft space-y-6 border border-primary/10 mb-32">
        {activeTab === 'property' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Nome do Chalé / Apartamento</label>
              <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.property.name} onChange={(e) => updateProperty('name', e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Endereço Completo</label>
              <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.property.addressLine1} onChange={(e) => updateProperty('addressLine1', e.target.value)} />
            </div>
          </div>
        )}

        {activeTab === 'host' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Nome(s) de Contato</label>
              <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.host.names} onChange={(e) => updateHost('names', e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Bio/Mensagem de Boas-vindas</label>
              <textarea className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3 h-28" value={formData.host.bio} onChange={(e) => updateHost('bio', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">WhatsApp</label>
                <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.host.whatsapp} onChange={(e) => updateHost('whatsapp', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wifi' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Rede Wi-Fi desta Unidade</label>
              <input type="text" className="w-full rounded-xl border-gray-100 bg-background-light/50 dark:bg-black/20 focus:ring-primary text-sm p-3" value={formData.wifi.ssid} onChange={(e) => updateWifi('ssid', e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary uppercase mb-1 px-1">Senha</label>
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
                  if (formData) {
                    const newRule = { id: Date.now().toString(), category: 'Geral', icon: 'info', rule: '' };
                    setFormData({ ...formData, rules: [...formData.rules, newRule] });
                  }
                }}
                className="bg-primary text-white p-2 rounded-lg flex items-center justify-center"
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
                      if (formData) {
                        const newRules = [...formData.rules];
                        newRules[idx].rule = e.target.value;
                        setFormData({ ...formData, rules: newRules });
                      }
                    }} 
                  />
                  <button className="text-red-400 p-2 hover:bg-red-50 rounded-lg" onClick={() => {
                    if (formData) {
                      setFormData({ ...formData, rules: formData.rules.filter(r => r.id !== rule.id) });
                    }
                  }}>
                    <span className="material-icons-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 left-0 right-0 px-4 md:px-0 flex justify-center z-50">
        <div className="flex gap-3 w-full max-w-lg">
          <button 
            onClick={handleCancel}
            className="flex-1 bg-white dark:bg-card-dark text-gray-400 py-4 rounded-2xl font-bold shadow-xl border border-gray-100 dark:border-primary/10 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="flex-[2] bg-primary text-white py-4 rounded-2xl font-bold shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-primary-light cursor-pointer"
          >
            <span className="material-icons-outlined">save</span>
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Management;
