
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { GuideData } from '../types';

interface HomeProps {
  data: GuideData;
}

const MenuCard: React.FC<{ to: string, icon: string, title: string }> = ({ to, icon, title }) => {
  const { hostId } = useParams();
  return (
    <Link to={`/guide/${hostId}${to}`} className="group relative flex flex-col items-center text-center">
      <div className="w-full bg-card-light dark:bg-card-dark h-52 rounded-t-xl rounded-b-[3rem] shadow-soft flex flex-col items-center justify-center p-6 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 border-t-4 border-primary/20">
        <span className="material-icons-outlined text-6xl text-primary mb-3 group-hover:scale-110 transition-transform">{icon}</span>
        <h3 className="font-serif text-xl text-primary dark:text-primary-light uppercase tracking-wide leading-tight" dangerouslySetInnerHTML={{ __html: title }}></h3>
      </div>
    </Link>
  );
};

const Home: React.FC<HomeProps> = ({ data }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-4 pb-20 flex flex-col items-center">
      <header className="text-center mb-12 max-w-3xl">
        <div className="relative w-48 h-48 mx-auto mb-6 rounded-full border-4 border-primary/20 flex items-center justify-center bg-white dark:bg-card-dark shadow-soft overflow-hidden">
          <img alt="Interior" className="w-full h-full object-cover opacity-90" src={data.host.photoUrl} />
          <div className="absolute inset-0 border-[6px] border-card-light dark:border-card-dark rounded-full"></div>
        </div>
        <h1 className="font-script text-6xl md:text-7xl text-primary mb-2 leaf-animate drop-shadow-sm">Bem-vindo!</h1>
        <p className="font-script text-4xl text-primary/80 mb-6">- {data.property.name} -</p>
        <div className="inline-block bg-primary text-white px-8 py-3 rounded-full shadow-lg">
          <p className="font-sans text-sm md:text-base font-medium tracking-wide">
            Preparamos este guia para tornar a sua estadia mais confortável e tranquila.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
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
