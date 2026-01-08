
import React from 'react';
import { GuideData } from '../types';

const CheckIn: React.FC<{ data: GuideData }> = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-4 pb-20 flex flex-col items-center">
      <header className="text-center mb-12">
        <h1 className="font-script text-6xl text-primary mb-2">Guia de Check-in</h1>
        <p className="font-serif text-2xl text-primary/80">- Chegada e Acesso -</p>
      </header>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-soft text-center border-t-4 border-primary/30 flex flex-col items-center justify-center">
          <span className="material-icons-outlined text-4xl text-primary mb-3">schedule</span>
          <div className="flex justify-between w-full px-4 mb-2">
            <span className="text-xs opacity-70">CHECK-IN</span>
            <span className="font-serif font-bold text-primary">{data.checkIn.time}</span>
          </div>
          <div className="flex justify-between w-full px-4">
            <span className="text-xs opacity-70">CHECK-OUT</span>
            <span className="font-serif font-bold text-primary">{data.checkOut.time}</span>
          </div>
        </div>

        <div className="bg-primary text-white p-8 rounded-2xl shadow-lg text-center transform md:-translate-y-4 z-10">
          <h3 className="font-serif text-xl mb-4 uppercase tracking-wider">Código da Porta</h3>
          <div className="bg-white/20 rounded-xl py-4 px-8 mb-3 border border-white/30">
            <span className="font-mono text-5xl font-bold tracking-[0.2em]">{data.checkIn.gateCode}</span>
          </div>
          <p className="text-xs opacity-70">Pressione Yale para ativar</p>
        </div>

        <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-soft text-center border-t-4 border-primary/30">
          <span className="material-icons-outlined text-4xl text-primary mb-3">location_on</span>
          <h3 className="font-serif text-lg font-bold text-primary mb-1">Endereço</h3>
          <p className="text-sm opacity-80 mb-4">{data.property.addressLine1}<br/>{data.property.cityStateZip}</p>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-card-dark rounded-3xl p-8 border border-primary/10 shadow-sm">
        <h2 className="font-serif text-2xl text-primary font-bold mb-8 flex items-center gap-3">
          <span className="material-icons-outlined">directions_walk</span>
          Procedimento de Chegada
        </h2>
        <div className="space-y-8 pl-4 border-l-2 border-primary/10">
          {data.checkIn.steps.map((step, idx) => (
            <div key={step.id} className="relative flex gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-card-light dark:bg-card-dark border-2 border-white flex items-center justify-center -ml-[2.6rem]">
                <span className="font-serif font-bold text-primary">{idx + 1}</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-primary">{step.title}</h4>
                <p className="opacity-80 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
