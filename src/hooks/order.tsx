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
import { useCart } from './cart';

interface IOrderProduct {
  id: string;
  product_id: string;
  details: string;
  price: number;
  quantity: number;
  order_id: string;
}

interface IOrder {
  id: string;
  table_token: string;
  costumer_name: string;
  status_order_id: number;
  establishment_id: string;
  order_products: IOrderProduct[];
}

interface IProduct {
  id: string;
  quantity: number;
  details?: string;
}

interface ICreateOrderDTO {
  table_token: string;
  costumer_name: string;
  establishment_id: string;
  products: IProduct[];
}

interface IOrderState {
  orders: IOrder[];
}

interface IOrderContextData {
  orders: IOrder[];
  createOrder(order: ICreateOrderDTO): Promise<void>;
}

export const OrderContext = createContext<IOrderContextData>(
  {} as IOrderContextData,
);

export const OrderProvider: React.FC = ({ children }) => {
  const { establishment } = useAuth();
  const [data, setData] = useState<IOrderState>({ orders: [] } as IOrderState);

  useEffect(() => {
    if (establishment) {
      api
        .get<IOrder[]>('/orders', {
          params: {
            table_id: establishment.table_id,
          },
        })
        .then(response => {
          setData({
            orders: response.data,
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }, [establishment]);

  const createOrder = useCallback(async (order: ICreateOrderDTO) => {
    const response = await api.post<IOrder>('/orders', order);
    console.log(response);
    setData(prevState => {
      return {
        orders: [...prevState.orders, response.data],
      };
    });
  }, []);

  return (
    <OrderContext.Provider value={{ orders: data.orders, createOrder }}>
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
