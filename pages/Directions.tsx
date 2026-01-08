
import React from 'react';
import { GuideData } from '../types';

const Directions: React.FC<{ data: GuideData }> = ({ data }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-4 pb-20">
      <header className="text-center mb-10">
        <h1 className="font-serif text-6xl text-primary mb-4">Direções e Guia</h1>
        <p className="text-xl text-primary/80">Encontrando seu caminho para o nosso pequeno paraíso.</p>
      </header>

      <div className="bg-white dark:bg-card-dark rounded-3xl shadow-soft overflow-hidden flex flex-col lg:flex-row mb-12">
        <div className="p-10 lg:w-1/3 bg-card-light/30">
          <h2 className="font-serif text-3xl text-primary mb-6">{data.property.name}</h2>
          <address className="not-italic mb-8 space-y-1">
            <p>{data.property.addressLine1}</p>
            <p>{data.property.addressLine2}</p>
            <p className="font-bold text-primary">{data.property.cityStateZip}</p>
          </address>
          <div className="space-y-3">
            <button className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-md">Abrir no Maps</button>
            <button className="w-full py-4 border-2 border-primary/20 text-primary rounded-xl font-bold">Copiar Endereço</button>
          </div>
        </div>
        <div className="lg:w-2/3 h-[400px] bg-gray-100 flex items-center justify-center relative">
          <img src="https://picsum.photos/id/15/1200/800" alt="Map" className="w-full h-full object-cover grayscale opacity-50" />
          <div className="absolute inset-0 bg-primary/10"></div>
          <span className="material-icons-outlined text-8xl text-primary/20 relative z-10">map</span>
        </div>
      </div>
    </div>
  );
};

export default Directions;
