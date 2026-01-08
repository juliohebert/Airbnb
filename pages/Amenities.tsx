
import React from 'react';
import { GuideData } from '../types';

const Amenities: React.FC<{ data: GuideData }> = ({ data }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-4 pb-20">
      <header className="text-center mb-12">
        <h1 className="font-script text-6xl text-primary mb-2">Comodidades e Extras</h1>
        <p className="font-serif text-2xl text-primary/80">- Detalhes da Propriedade -</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {data.amenities.map(cat => (
            <div key={cat.id} className="bg-white dark:bg-card-dark rounded-3xl p-8 shadow-soft flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-card-light text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-icons-outlined text-3xl">{cat.icon}</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-2xl text-primary mb-4">{cat.category}</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm opacity-80">
                      <span className="material-icons-outlined text-primary text-base">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-primary text-white p-8 rounded-3xl shadow-lg">
             <span className="material-icons-outlined text-4xl mb-4">wifi</span>
             <h3 className="font-serif text-xl mb-2">Wifi Ultrarrápido</h3>
             <p className="text-sm opacity-80">Ideal para streaming e home office em toda a casa.</p>
          </div>
          <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl border border-primary/10">
            <h4 className="font-bold text-primary mb-2">Dúvidas?</h4>
            <p className="text-sm opacity-70">Entre em contato para saber como usar qualquer equipamento.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amenities;
