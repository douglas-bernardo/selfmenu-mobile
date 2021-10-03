import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../services/api';

interface Restaurant {
  id: string;
  name: string;
  owner_id: string;
}

interface AuthState {
  restaurant: Restaurant;
}

interface SignInCredentials {
  restaurant: Restaurant;
}

interface AuthContextData {
  restaurant: Restaurant;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const restaurant = await AsyncStorage.getItem('@SelfMenu:restaurant');

      if (restaurant) {
        // api.defaults.headers.authorization = `Baerer ${token[1]}`;
        setData({ restaurant: JSON.parse(restaurant) });
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async (dataRes: SignInCredentials) => {
    await AsyncStorage.setItem('@SelfMenu:restaurant', JSON.stringify(dataRes));

    // api.defaults.headers.authorization = `Baerer ${token}`;

    setData(dataRes);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@SelfMenu:restaurant');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ restaurant: data.restaurant, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
