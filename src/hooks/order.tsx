import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';

interface IOrder {
  id: string;
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
}

export const OrderContext = createContext<IOrderContextData>(
  {} as IOrderContextData,
);

export const OrderProvider: React.FC = ({ children }) => {
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

      if (table_token[1] && orders[1]) {
        setCurrentTableToken(table_token[1]);
        setData({ orders: JSON.parse(orders[1]) });
      }
    }

    loadStorageData();
  }, []);

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

  const clearOrders = useCallback(async () => {
    await AsyncStorage.multiRemove([asyncTableToken, asyncTableOrders]);

    setData({ orders: [] });
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders: data.orders,
        current_token_table: currentTableToken,
        createOrder,
        clearOrders,
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