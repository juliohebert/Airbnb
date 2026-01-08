
import React from 'react';
import { GuideData } from '../types';

const Contact: React.FC<{ data: GuideData }> = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-8 pb-20">
      <header className="text-center mb-12">
        <h1 className="font-script text-6xl md:text-7xl text-primary mb-2">Fale com o Anfitrião</h1>
        <p className="text-xl text-text-dark/80 max-w-2xl mx-auto">
          Estamos aqui para ajudar! Sinta-se à vontade para entrar em contato.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 bg-white dark:bg-card-dark rounded-3xl shadow-soft p-8 border border-primary/10 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full border-4 border-card-light mb-6 overflow-hidden">
            <img alt="Host" className="w-full h-full object-cover" src={data.host.photoUrl} />
          </div>
          <h2 className="font-serif text-2xl text-primary font-bold mb-1">{data.host.names}</h2>
          <p className="text-sm font-bold text-primary/60 uppercase tracking-wider mb-4">{data.host.tagline}</p>
          <p className="text-sm text-text-dark/70 dark:text-text-light/70 italic mb-8">"{data.host.bio}"</p>
          <div className="w-full space-y-3">
            <div className="text-sm text-primary/80 bg-primary/5 py-2 rounded-lg">Falam: {data.host.languages.join(', ')}</div>
            <div className="text-sm text-primary/80 bg-primary/5 py-2 rounded-lg">Resposta: {data.host.responseTime}</div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <a href={`tel:${data.host.phone}`} className="bg-primary text-white p-6 rounded-2xl flex flex-col justify-between h-40 shadow-lg hover:-translate-y-1 transition-transform">
              <div>
                <span className="material-icons-outlined text-3xl mb-2">call</span>
                <h3 className="font-serif text-2xl font-bold">Ligue para Nós</h3>
              </div>
              <div className="font-bold text-lg">{data.host.phone}</div>
            </a>
            <a href={`https://wa.me/${data.host.whatsapp}`} className="bg-[#25D366] text-white p-6 rounded-2xl flex flex-col justify-between h-40 shadow-lg hover:-translate-y-1 transition-transform">
              <div>
                <span className="material-icons-outlined text-3xl mb-2">chat</span>
                <h3 className="font-serif text-2xl font-bold">WhatsApp</h3>
              </div>
              <div className="font-bold text-lg">Iniciar Chat</div>
            </a>
          </div>

          <div className="bg-card-light dark:bg-card-dark rounded-3xl p-8 shadow-soft">
            <h3 className="font-serif text-2xl text-primary mb-6">Outras formas</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-white/60 dark:bg-black/20 rounded-xl">
                <span className="material-icons-outlined text-primary mr-4">email</span>
                <div className="flex-grow">
                  <p className="font-bold">E-mail</p>
                  <p className="text-sm opacity-70">{data.host.email}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-primary/10">
              <h4 className="font-bold text-primary mb-2 text-sm uppercase">Endereço de Emergência</h4>
              <p className="opacity-70">
                {data.property.addressLine1}<br/>
                {data.property.addressLine2}<br/>
                {data.property.cityStateZip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
