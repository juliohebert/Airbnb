
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { GuideData } from '../types';

interface HomeProps {
  data: GuideData;
}

const MenuCard: React.FC<{ to: string, icon: string, title: string }> = ({ to, icon, title }) => {
  const { hostId } = useParams();
  return (
    <Link 
      to={`/guide/${hostId}${to}`} 
      className="group relative flex flex-col items-center text-center active:scale-95 transition-transform"
    >
      <div className="w-full bg-card-light dark:bg-card-dark h-44 sm:h-52 rounded-t-xl rounded-b-[2.5rem] sm:rounded-b-[3rem] shadow-soft flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-300 border-t-4 border-primary/20">
        <span className="material-icons-outlined text-4xl sm:text-6xl text-primary mb-2 sm:mb-3 group-hover:scale-110 transition-transform">{icon}</span>
        <h3 className="font-serif text-sm sm:text-lg md:text-xl text-primary dark:text-primary-light uppercase tracking-wide leading-tight px-1" dangerouslySetInnerHTML={{ __html: title }}></h3>
      </div>
    </Link>
  );
};

const Home: React.FC<HomeProps> = ({ data }) => {
  return (
    <div className="max-w-6xl mx-auto pt-2 pb-20 flex flex-col items-center">
      <header className="text-center mb-10 md:mb-12 max-w-3xl w-full">
        <div className="relative w-36 h-36 md:w-48 md:h-48 mx-auto mb-6 rounded-full border-4 border-primary/20 flex items-center justify-center bg-white dark:bg-card-dark shadow-soft overflow-hidden">
          <img alt="Interior" className="w-full h-full object-cover opacity-90" src={data.host.photoUrl} />
          <div className="absolute inset-0 border-[4px] md:border-[6px] border-card-light dark:border-card-dark rounded-full"></div>
        </div>
        <h1 className="font-script text-5xl md:text-7xl text-primary mb-1 leaf-animate drop-shadow-sm">Bem-vindo!</h1>
        <p className="font-script text-3xl md:text-4xl text-primary/80 mb-6">- {data.property.name} -</p>
        <div className="inline-block bg-primary text-white px-6 md:px-8 py-3 rounded-full shadow-lg mx-4">
          <p className="font-sans text-xs md:text-base font-medium tracking-wide">
            Seu refúgio está pronto. Aproveite cada detalhe.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
        <MenuCard to="/checkin" icon="lock_open" title="Check-in<br/>e Acesso" />
        <MenuCard to="/wifi" icon="wifi" title="Senha do<br/>Wi-Fi" />
        <MenuCard to="/directions" icon="map" title="Direções<br/>e Guia" />
        <MenuCard to="/contact" icon="support_agent" title="Contato com<br/>o Anfitrião" />
        <MenuCard to="/rules" icon="fact_check" title="Regras<br/>da Casa" />
        <MenuCard to="/amenities" icon="checkroom" title="Comodidades<br/>e Extras" />
        <MenuCard to="/checkout" icon="inventory_2" title="Informações de<br/>Check-out" />
        <MenuCard to="/feedback" icon="reviews" title="Feedback<br/>e Avaliação" />
      </div>
    </div>
  );
};

export default Home;
