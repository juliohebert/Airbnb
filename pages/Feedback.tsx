
import React, { useState } from 'react';

const Feedback: React.FC<{ data: any }> = ({ data }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-4 pb-20">
      <header className="text-center mb-10">
        <h1 className="font-script text-6xl text-primary mb-2">Sua Opinião</h1>
        <p className="font-serif text-3xl text-primary/80">- Avaliação da Estadia -</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card-light dark:bg-card-dark p-8 rounded-3xl shadow-soft">
            <h2 className="font-serif text-2xl text-primary font-bold mb-4">Esperamos que tenha adorado!</h2>
            <p className="opacity-80 leading-relaxed mb-6">Seu feedback é essencial para mantermos nosso padrão de acolhimento. Reserve um momento para nos contar sua experiência.</p>
            <div className="flex items-center gap-4 pt-4 border-t border-primary/10">
               <span className="material-icons-outlined text-primary">favorite</span>
               <p className="font-bold text-primary">Dedicados à sua experiência</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-card-dark p-8 rounded-3xl shadow-lg border-t-4 border-primary">
          <h3 className="font-serif text-2xl font-bold text-primary mb-8 text-center">Como foi sua estadia?</h3>
          <div className="flex justify-center gap-2 mb-10">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} onClick={() => setRating(star)} className={`material-icons-outlined text-5xl transition-colors ${rating >= star ? 'text-amber-400' : 'text-gray-200'}`}>
                star
              </button>
            ))}
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Comentário Público</label>
              <textarea className="w-full rounded-xl border-gray-100 bg-background-light dark:bg-black/20 h-32 p-4" placeholder="O que você mais gostou?"></textarea>
            </div>
            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg">Enviar Avaliação</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
