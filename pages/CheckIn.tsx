
import React from 'react';
import { GuideData } from '../types';
import { useNavigate, useParams } from 'react-router-dom';

const CheckIn: React.FC<{ data: GuideData }> = ({ data }) => {
  const navigate = useNavigate();
  const { hostId } = useParams();

  return (
    <div className="max-w-5xl mx-auto pt-2 pb-20 flex flex-col items-center">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="font-script text-5xl md:text-6xl text-primary mb-2">Guia de Check-in</h1>
        <p className="font-serif text-xl md:text-2xl text-primary/80">- Chegada e Acesso -</p>
      </header>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
        <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-soft text-center border-t-4 border-primary/30 order-2 md:order-1">
          <span className="material-icons-outlined text-3xl md:text-4xl text-primary mb-3">schedule</span>
          <div className="flex justify-between items-center w-full px-2 mb-2">
            <span className="text-[10px] md:text-xs opacity-70 uppercase font-bold">Entrada</span>
            <span className="font-serif font-bold text-primary text-lg">{data.checkIn.time}</span>
          </div>
          <div className="flex justify-between items-center w-full px-2">
            <span className="text-[10px] md:text-xs opacity-70 uppercase font-bold">Saída</span>
            <span className="font-serif font-bold text-primary text-lg">{data.checkOut.time}</span>
          </div>
        </div>

        <div className="bg-primary text-white p-6 md:p-8 rounded-2xl shadow-lg text-center transform md:-translate-y-4 z-10 order-1 md:order-2">
          <h3 className="font-serif text-lg md:text-xl mb-3 md:mb-4 uppercase tracking-wider">Código de Acesso</h3>
          <div className="bg-white/20 rounded-xl py-3 md:py-4 px-4 md:px-8 mb-3 border border-white/30">
            <span className="font-mono text-3xl xs:text-4xl md:text-5xl font-bold tracking-[0.1em] md:tracking-[0.2em]">{data.checkIn.gateCode}</span>
          </div>
          <p className="text-[10px] md:text-xs opacity-70 italic">Toque no teclado para ativar a fechadura</p>
        </div>

        <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-soft text-center border-t-4 border-primary/30 order-3">
          <span className="material-icons-outlined text-3xl md:text-4xl text-primary mb-3">location_on</span>
          <h3 className="font-serif text-lg font-bold text-primary mb-1">Localização</h3>
          <p className="text-xs md:text-sm opacity-80">{data.property.addressLine1}</p>
          <p className="text-xs md:text-sm opacity-80">{data.property.cityStateZip}</p>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-card-dark rounded-3xl p-6 md:p-10 border border-primary/10 shadow-sm mb-10">
        <h2 className="font-serif text-xl md:text-2xl text-primary font-bold mb-8 flex items-center gap-3">
          <span className="material-icons-outlined">directions_walk</span>
          Como entrar
        </h2>
        <div className="space-y-10 pl-4 md:pl-6 border-l-2 border-primary/10">
          {data.checkIn.steps.map((step, idx) => (
            <div key={step.id} className="relative flex gap-4 md:gap-6">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center -ml-[2.1rem] md:-ml-[2.85rem] shadow-sm">
                <span className="font-serif font-bold text-sm md:text-base">{idx + 1}</span>
              </div>
              <div>
                <h4 className="font-bold text-base md:text-lg text-primary mb-1">{step.title}</h4>
                <p className="text-sm md:text-base opacity-80 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={() => navigate(`/guide/${hostId}`)} 
        className="fixed bottom-6 right-6 md:static flex items-center justify-center gap-2 bg-primary text-white p-4 md:px-8 md:py-3 rounded-full shadow-2xl md:shadow-md transition-all active:scale-90 z-50"
      >
        <span className="material-icons-outlined">home</span>
        <span className="hidden md:inline font-bold">Início</span>
      </button>
    </div>
  );
};

export default CheckIn;
