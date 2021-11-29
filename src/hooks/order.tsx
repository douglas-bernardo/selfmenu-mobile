import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import { useAuth } from './auth';

interface IOrder {
  id: string;
  table_id: string;
  table_token: string;
  customer_name: string;
  status_order_id: number;
  establishment_id: string;
}

interface IOrderState {
  orders: IOrder[];
}

interface IProduct {
  id: string;
  quantity: number;
  details?: string;
}

interface ICreateOrderDTO {
  table_token: string;
  customer_name: string;
  establishment_id: string;
  products: IProduct[];
}

interface IOrderContextData {
  orders: IOrder[];
  current_token_table: string;
  createOrder(order: ICreateOrderDTO): Promise<void>;
  clearOrders(): Promise<void>;
  updateOrders(orders: IOrder[]): Promise<void>;
  updateOrderStatus(order_id: string, status_order_id: number): void;
  removeOrder(order_id: string): Promise<void>;
  clearCurrentTableToken(): void;
  refresh: boolean;
  setRefresh: () => void;
}

export const OrderContext = createContext<IOrderContextData>(
  {} as IOrderContextData,
);

export const OrderProvider: React.FC = ({ children }) => {
  const { establishment } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [currentTableToken, setCurrentTableToken] = useState('');

  const [data, setData] = useState<IOrderState>({ orders: [] } as IOrderState);
  const asyncTableToken = '@SelfMenu:tableToken';
  const asyncTableOrders = '@SelfMenu:tableOrders';

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [table_token, orders] = await AsyncStorage.multiGet([
        asyncTableToken,
        asyncTableOrders,
      ]);

      if (establishment?.table_token) {
        setCurrentTableToken(establishment.table_token);
        await AsyncStorage.setItem(asyncTableToken, establishment.table_token);
      } else if (table_token[1]) {
        setCurrentTableToken(table_token[1]);
      }

      if (orders[1]) {
        setData({ orders: JSON.parse(orders[1]) });
      }
    }

    loadStorageData();
  }, [establishment?.table_token]);

  const createOrder = useCallback(
    async (order: ICreateOrderDTO) => {
      const response = await api.post<IOrder>('/orders', order);

      await AsyncStorage.multiSet([
        [asyncTableToken, response.data.table_token],
        [asyncTableOrders, JSON.stringify([...data.orders, response.data])],
      ]);

      setCurrentTableToken(response.data.table_token);

      setData(prevState => {
        return {
          orders: [...prevState.orders, response.data],
        };
      });
    },
    [data.orders],
  );

  const removeOrder = useCallback(
    async (order_id: string) => {
      const ordersUpdated = data.orders.filter(item => item.id !== order_id);

      await AsyncStorage.setItem(
        asyncTableOrders,
        JSON.stringify(ordersUpdated),
      );

      setData({
        orders: ordersUpdated,
      });
    },
    [data.orders],
  );

  const clearOrders = useCallback(async () => {
    // await AsyncStorage.multiRemove([asyncTableToken, asyncTableOrders]);
    await AsyncStorage.removeItem(asyncTableOrders);

    setData({ orders: [] });
  }, []);

  const updateOrders = useCallback(async (orders: IOrder[]) => {
    await AsyncStorage.setItem(asyncTableOrders, JSON.stringify(orders));

    setData({ orders });
  }, []);

  const clearCurrentTableToken = useCallback(async () => {
    await AsyncStorage.removeItem(asyncTableToken);

    setCurrentTableToken('');
  }, []);

  const setRefresh = useCallback(() => {
    setRefreshing(!refreshing);
  }, [refreshing]);

  const updateOrderStatus = useCallback(
    (order_id: string, status_order_id: number) => {
      setData(prevState => {
        return {
          orders: prevState.orders.map(item => {
            if (item.id === order_id) {
              return {
                ...item,
                status_order_id,
              };
            }
            return item;
          }),
        };
      });
    },
    [],
  );

  return (
    <OrderContext.Provider
      value={{
        orders: data.orders,
        current_token_table: currentTableToken,
        createOrder,
        clearOrders,
        updateOrders,
        updateOrderStatus,
        removeOrder,
        clearCurrentTableToken,
        refresh: refreshing,
        setRefresh,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export function useOrder(): IOrderContextData {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }

  return context;
}
