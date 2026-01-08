
import React from 'react';
import { GuideData } from '../types';

const Rules: React.FC<{ data: GuideData }> = ({ data }) => {
  const categories = Array.from(new Set(data.rules.map(r => r.category)));

  return (
    <div className="max-w-6xl mx-auto px-6 pt-4 pb-20 flex flex-col items-center">
      <header className="text-center mb-12">
        <h1 className="font-script text-6xl md:text-7xl text-primary mb-2">Regras da Casa</h1>
        <p className="font-serif text-2xl text-primary/80">- Orientações & Convivência -</p>
      </header>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6">
        {categories.map(cat => (
          <div key={cat} className={`p-8 rounded-3xl shadow-soft border border-primary/10 ${cat === 'Proibição' ? 'bg-white border-red-100' : 'bg-card-light dark:bg-card-dark'}`}>
            <div className="flex items-center gap-4 mb-6 border-b border-primary/10 pb-4">
              <span className={`material-icons-outlined text-2xl ${cat === 'Proibição' ? 'text-red-500' : 'text-primary'}`}>
                {data.rules.find(r => r.category === cat)?.icon || 'info'}
              </span>
              <h2 className={`font-serif text-2xl font-bold ${cat === 'Proibição' ? 'text-red-700' : 'text-primary'}`}>{cat}</h2>
            </div>
            <ul className="space-y-4">
              {data.rules.filter(r => r.category === cat).map(r => (
                <li key={r.id} className="flex items-start gap-3">
                  <span className={`material-icons-outlined mt-1 text-sm ${cat === 'Proibição' ? 'text-red-400' : 'text-primary'}`}>
                    {cat === 'Proibição' ? 'do_not_disturb_on' : 'circle'}
                  </span>
                  <span className="opacity-80 leading-relaxed">{r.rule}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="bg-primary text-white rounded-2xl p-6 shadow-lg md:col-span-2">
          <h3 className="font-serif text-xl font-bold mb-2">Importante</h3>
          <p className="text-sm opacity-90">O não cumprimento das regras pode resultar na retenção do depósito ou cancelamento imediato.</p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
