
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GuideData } from '../types';

const Wifi: React.FC<{ data: GuideData }> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 pt-8 pb-20 flex flex-col items-center">
      <header className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-6 leaf-animate">
          <span className="material-icons-outlined text-5xl">wifi</span>
        </div>
        <h1 className="font-script text-6xl md:text-7xl text-primary mb-4">Mantenha-se Conectado</h1>
        <p className="font-sans text-xl text-primary/70 max-w-xl mx-auto">
          Internet de alta velocidade disponível em toda a propriedade.
        </p>
      </header>

      <div className="w-full max-w-2xl bg-white dark:bg-card-dark rounded-3xl shadow-soft border-t-4 border-primary/20 p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10 space-y-10">
          <div className="p-6 bg-card-light/40 dark:bg-black/20 rounded-2xl border border-primary/10">
            <h3 className="text-sm font-bold text-primary/60 uppercase tracking-widest mb-1">Nome da Rede</h3>
            <p className="text-3xl font-serif text-text-dark dark:text-text-light select-all">{data.wifi.ssid}</p>
          </div>
          <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl border-2 border-primary/20">
            <h3 className="text-sm font-bold text-primary/60 uppercase tracking-widest mb-1">Senha</h3>
            <p className="text-4xl font-mono text-primary font-bold tracking-wider select-all break-all">{data.wifi.password}</p>
          </div>
          <div className="flex flex-col items-center pt-6 border-t border-primary/10">
            <p className="text-sm font-sans text-primary/60 mb-6 font-medium">ESCANEIE PARA CONECTAR</p>
            <div className="p-4 bg-white rounded-xl shadow-md">
              {/* Mock QR code svg */}
              <svg className="w-48 h-48 text-primary" viewBox="0 0 100 100" fill="currentColor">
                <rect x="10" y="10" width="20" height="20" />
                <rect x="70" y="10" width="20" height="20" />
                <rect x="10" y="70" width="20" height="20" />
                <rect x="35" y="35" width="30" height="30" />
                <rect x="40" y="10" width="10" height="10" />
                <rect x="10" y="40" width="10" height="10" />
                <rect x="80" y="40" width="10" height="10" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-all bg-card-light dark:bg-card-dark px-8 py-3 rounded-full shadow-sm">
          <span className="material-icons-outlined">arrow_back</span>
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};

export default Wifi;
