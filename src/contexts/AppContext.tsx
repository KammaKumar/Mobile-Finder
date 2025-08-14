import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Phone, User, ChatMessage, Match } from '../types';

interface AppState {
  phones: Phone[];
  currentUser: User | null;
  messages: ChatMessage[];
  matches: Match[];
  isLoading: boolean;
}

type AppAction = 
  | { type: 'SET_PHONES'; payload: Phone[] }
  | { type: 'ADD_PHONE'; payload: Phone }
  | { type: 'UPDATE_PHONE'; payload: { id: string; updates: Partial<Phone> } }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'ADD_MATCH'; payload: Match }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  phones: [],
  currentUser: null,
  messages: [],
  matches: [],
  isLoading: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PHONES':
      return { ...state, phones: action.payload };
    case 'ADD_PHONE':
      return { ...state, phones: [...state.phones, action.payload] };
    case 'UPDATE_PHONE':
      return {
        ...state,
        phones: state.phones.map(phone =>
          phone.id === action.payload.id
            ? { ...phone, ...action.payload.updates }
            : phone
        ),
      };
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'ADD_MATCH':
      return { ...state, matches: [...state.matches, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load mock data
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      reputation: 95,
      verified: true,
    };

    const mockPhones: Phone[] = [
      {
        id: '1',
        type: 'lost',
        brand: 'Apple',
        model: 'iPhone 14 Pro',
        color: 'Deep Purple',
        imei: '123456789012345',
        description: 'Lost at Central Park, has a clear case with family photo',
        location: {
          lat: 40.7829,
          lng: -73.9654,
          address: 'Central Park, New York, NY'
        },
        images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400'],
        reportedAt: new Date('2024-01-15T10:30:00'),
        status: 'active',
        reportedBy: '1',
        reward: 100,
        lastSeen: new Date('2024-01-15T09:45:00')
      },
      {
        id: '2',
        type: 'found',
        brand: 'Samsung',
        model: 'Galaxy S23',
        color: 'Phantom Black',
        description: 'Found at coffee shop on 5th Avenue, screen is cracked',
        location: {
          lat: 40.7580,
          lng: -73.9855,
          address: '5th Avenue Coffee, New York, NY'
        },
        images: ['https://images.pexels.com/photos/1616785/pexels-photo-1616785.jpeg?auto=compress&cs=tinysrgb&w=400'],
        reportedAt: new Date('2024-01-15T14:20:00'),
        status: 'active',
        reportedBy: '2',
        condition: 'damaged'
      },
      {
        id: '3',
        type: 'lost',
        brand: 'Google',
        model: 'Pixel 8',
        color: 'Obsidian',
        description: 'Lost during morning jog in Brooklyn Bridge area',
        location: {
          lat: 40.7061,
          lng: -73.9969,
          address: 'Brooklyn Bridge, New York, NY'
        },
        images: ['https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400'],
        reportedAt: new Date('2024-01-14T07:15:00'),
        status: 'active',
        reportedBy: '3',
        reward: 50
      }
    ];

    dispatch({ type: 'SET_USER', payload: mockUser });
    dispatch({ type: 'SET_PHONES', payload: mockPhones });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}