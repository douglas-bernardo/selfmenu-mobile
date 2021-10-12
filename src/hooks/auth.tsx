import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export interface IRestaurant {
  id: string;
  name: string;
  owner_id: string;
}

interface AuthState {
  restaurant: IRestaurant;
}

interface SignInCredentials {
  url_restaurant: string;
}

interface AuthContextData {
  restaurant: IRestaurant;
  loading: boolean;
  signIn(restaurant: IRestaurant): Promise<void>;
  // signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateRestaurant(restaurant: IRestaurant): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  const asyncUser = '@SelfMenu:restaurant';

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const restaurant = await AsyncStorage.getItem(asyncUser);

      if (restaurant) {
        const loggedRestaurant: IRestaurant = JSON.parse(restaurant);

        api.defaults.headers.authorization = `Baerer ${loggedRestaurant.owner_id}`;
        setData({ restaurant: loggedRestaurant });
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async (restaurant: IRestaurant) => {
    await AsyncStorage.setItem(asyncUser, JSON.stringify(restaurant));

    api.defaults.headers.authorization = `Baerer ${restaurant.owner_id}`;
    setData({ restaurant });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(asyncUser);

    setData({} as AuthState);
  }, []);

  const updateRestaurant = useCallback(
    async (restaurant: IRestaurant) => {
      await AsyncStorage.setItem(asyncUser, JSON.stringify(restaurant));
      setData({ restaurant });
    },
    [setData],
  );

  return (
    <AuthContext.Provider
      value={{
        restaurant: data.restaurant,
        loading,
        signIn,
        signOut,
        updateRestaurant,
      }}
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
