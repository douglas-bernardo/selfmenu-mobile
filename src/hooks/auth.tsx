import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export interface IEstablishment {
  table_id: string;
  table_number: number;
  waiter: string;
  establishment_name: string;
  establishment_id: string;
  owner_id: string;
}

interface AuthState {
  establishment: IEstablishment;
}

interface AuthContextData {
  establishment: IEstablishment;
  loading: boolean;
  signIn(establishment: IEstablishment): Promise<void>;
  signOut(): void;
  updateEstablishment(establishment: IEstablishment): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  const asyncUser = '@SelfMenu:establishment';

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const establishment = await AsyncStorage.getItem(asyncUser);

      if (establishment) {
        const loggedEstablishment: IEstablishment = JSON.parse(establishment);

        api.defaults.headers.authorization = `Baerer ${loggedEstablishment.owner_id}`;
        setData({ establishment: loggedEstablishment });
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async (establishment: IEstablishment) => {
    await AsyncStorage.setItem(asyncUser, JSON.stringify(establishment));

    api.defaults.headers.authorization = `Baerer ${establishment.owner_id}`;
    setData({ establishment });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(asyncUser);

    setData({} as AuthState);
  }, []);

  const updateEstablishment = useCallback(
    async (establishment: IEstablishment) => {
      await AsyncStorage.setItem(asyncUser, JSON.stringify(establishment));
      setData({ establishment });
    },
    [setData],
  );

  return (
    <AuthContext.Provider
      value={{
        establishment: data.establishment,
        loading,
        signIn,
        signOut,
        updateEstablishment,
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
