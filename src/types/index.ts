export interface Phone {
  id: string;
  type: 'lost' | 'found';
  brand: string;
  model: string;
  color: string;
  imei?: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images: string[];
  reportedAt: Date;
  status: 'active' | 'matched' | 'resolved';
  reportedBy: string;
  contactInfo?: string;
  reward?: number;
  condition?: string;
  lastSeen?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  reputation: number;
  verified: boolean;
}

export interface ChatMessage {
  id: string;
  phoneId: string;
  senderId: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface Match {
  id: string;
  lostPhoneId: string;
  foundPhoneId: string;
  confidence: number;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
}