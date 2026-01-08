
export interface HostInfo {
  names: string;
  photoUrl: string;
  tagline: string;
  bio: string;
  languages: string[];
  responseTime: string;
  phone: string;
  whatsapp: string;
  email: string;
  airbnbSupportLink: string;
}

export interface PropertyInfo {
  name: string;
  addressLine1: string;
  addressLine2: string;
  cityStateZip: string;
  latitude: number;
  longitude: number;
}

export interface WifiInfo {
  ssid: string;
  password: string;
  qrCodeUrl?: string;
  routerLocation: string;
}

export interface HouseRule {
  id: string;
  category: string;
  icon: string;
  rule: string;
  isProhibition?: boolean;
}

export interface Amenity {
  id: string;
  category: string;
  icon: string;
  items: string[];
}

export interface CheckInStep {
  id: string;
  title: string;
  description: string;
}

export interface CheckOutStep {
  id: string;
  title: string;
  description: string;
}

export interface GuideData {
  host: HostInfo;
  property: PropertyInfo;
  wifi: WifiInfo;
  rules: HouseRule[];
  amenities: Amenity[];
  checkIn: {
    time: string;
    gateCode: string;
    steps: CheckInStep[];
  };
  checkOut: {
    time: string;
    steps: CheckOutStep[];
  };
}
