
import { GuideData } from './types';

export const INITIAL_GUIDE_DATA: GuideData = {
  host: {
    names: "Elena & Marco",
    photoUrl: "https://picsum.photos/id/64/300/300",
    tagline: "Superhosts",
    bio: "Adoramos compartilhar nosso santuário verde com viajantes de todo o mundo. Não hesite em pedir dicas locais!",
    languages: ["Inglês", "Espanhol", "Italiano"],
    responseTime: "< 1 hora",
    phone: "+1 (555) 012-3456",
    whatsapp: "+15550123456",
    email: "hello@casaverde.com",
    airbnbSupportLink: "#"
  },
  property: {
    name: "Casa Verde",
    addressLine1: "1248 Olive Grove Road",
    addressLine2: "Tuscany Hills, CA 93446",
    cityStateZip: "Sonoma, CA 95476",
    latitude: 38.2919,
    longitude: -122.4581
  },
  wifi: {
    ssid: "CasaVerde_Visitante_5G",
    password: "Relaxe&Curta2023!",
    routerLocation: "Estante da Sala"
  },
  rules: [
    { id: '1', category: 'Geral', icon: 'admin_panel_settings', rule: 'Por favor, tranque todas as portas e janelas ao sair.' },
    { id: '2', category: 'Geral', icon: 'admin_panel_settings', rule: 'Visitantes não registrados não são permitidos para pernoite.' },
    { id: '3', category: 'Barulho', icon: 'volume_off', rule: 'Horário de Silêncio: 22h00 às 08h00.' },
    { id: '4', category: 'Proibição', icon: 'block', rule: 'É proibido fumar dentro da casa.', isProhibition: true },
    { id: '5', category: 'Limpeza', icon: 'cleaning_services', rule: 'Lave a louça utilizada antes do check-out.' }
  ],
  amenities: [
    { id: 'a1', category: 'Quarto e Banheiro', icon: 'bed', items: ['Roupas de cama 400 fios', 'Toalhas de algodão egípcio', 'Secador de cabelo'] },
    { id: 'a2', category: 'Cozinha', icon: 'skillet', items: ['Cafeteira Nespresso', 'Utensílios de chef', 'Lava-louças'] }
  ],
  checkIn: {
    time: "15:00",
    gateCode: "8492#",
    steps: [
      { id: 'ci1', title: 'Estacionamento', description: 'Estacione na vaga marcada como "Hóspede".' },
      { id: 'ci2', title: 'Entrada', description: 'A entrada é pela porta verde na varanda.' }
    ]
  },
  checkOut: {
    time: "11:00",
    steps: [
      { id: 'co1', title: 'Chaves', description: 'Deixe as chaves no cofre da varanda.' },
      { id: 'co2', title: 'Lixo', description: 'Retire o lixo e coloque nas lixeiras externas.' }
    ]
  }
};

export const DecorativeLeaf = ({ className }: { className?: string }) => (
  <svg className={`text-primary ${className}`} fill="currentColor" viewBox="0 0 200 200">
    <path d="M150,0 C160,40 120,80 140,120 C100,100 60,60 150,0 Z"></path>
    <path d="M180,20 C170,60 140,90 160,130 C120,110 90,70 180,20 Z" opacity="0.6"></path>
  </svg>
);
