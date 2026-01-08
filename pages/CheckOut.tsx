
import React from 'react';
import { GuideData } from '../types';

const CheckOut: React.FC<{ data: GuideData }> = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-4 pb-20 flex flex-col items-center">
      <header className="text-center mb-12">
        <h1 className="font-script text-6xl text-primary mb-2">Informações de Check-out</h1>
        <p className="text-xl text-primary/80">Esperamos que tenha gostado da estadia!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
        <div className="bg-white dark:bg-card-dark rounded-3xl p-8 shadow-soft border-l-8 border-primary">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-icons-outlined text-primary text-3xl">schedule</span>
            <h2 className="font-serif text-2xl text-primary font-bold">Horário Limite</h2>
          </div>
          <div className="bg-card-light dark:bg-black/20 rounded-2xl p-8 text-center">
            <span className="block text-sm opacity-50 mb-1">ATÉ ÀS</span>
            <span className="font-serif text-6xl text-primary font-bold">{data.checkOut.time}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-3xl p-8 shadow-soft border-l-8 border-primary">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-icons-outlined text-primary text-3xl">fact_check</span>
            <h2 className="font-serif text-2xl text-primary font-bold">O que fazer</h2>
          </div>
          <ul className="space-y-6">
            {data.checkOut.steps.map((step, idx) => (
              <li key={step.id} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">{idx + 1}</span>
                <div>
                  <p className="font-bold text-primary">{step.title}</p>
                  <p className="text-sm opacity-70">{step.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
