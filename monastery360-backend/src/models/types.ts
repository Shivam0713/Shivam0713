export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'researcher' | 'tourist';
  createdAt: Date;
  updatedAt: Date;
}

export interface Monastery {
  id: string;
  name: string;
  location: {
    country: string;
    region: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  description: string;
  founded: number;
  images: string[];
  virtualTour: {
    url: string;
    scenes: Scene[];
  };
  availableLanguages: string[];
  artifacts: string[];
  events: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Scene {
  id: string;
  name: string;
  url: string;
  hotspots: Hotspot[];
  narration: {
    [language: string]: {
      text: string;
      audioUrl: string;
    };
  };
}

export interface Hotspot {
  id: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  type: 'info' | 'navigation' | 'artifact';
  title: string;
  description: string;
  targetScene?: string;
  artifactId?: string;
}

export interface Archive {
  id: string;
  title: string;
  description: string;
  type: 'manuscript' | 'artifact' | 'document' | 'audio' | 'video';
  monastery: string;
  tags: string[];
  metadata: {
    [key: string]: any;
  };
  fileUrl: string;
  thumbnailUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  monastery: string;
  date: Date;
  duration: number; // in minutes
  capacity: number;
  bookings: number;
  price: number;
  type: 'festival' | 'ceremony' | 'tour' | 'workshop';
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  numberOfPeople: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}