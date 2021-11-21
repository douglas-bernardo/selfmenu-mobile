import React, { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Alert } from 'react-native';
import { StackParamList } from '../../routes/app.routes';

import {
  Container,
  Header,
  RestaurantWrapper,
  RestaurantInfo,
  TableInfo,
  WaiterName,
  TableNumber,
  Logo,
  Restaurant,
  RestaurantGreeting,
  RestaurantName,
  OrdersContainer,
  Title,
  OrderItemsList,
  OrderContainer,
  OrderResume,
  ItemsResume,
  CostumerName,
  ItemsQuantity,
  Amount,
  OrderStatus,
  OrderStatusText,
} from './styles';
import { useOrder } from '../../hooks/order';
import { numberFormatAsCurrency } from '../../utils/numberFormat';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface IOrderProducts {
  id: string;
  product_id: string;
  details: string;
  price: number;
  quantity: number;
  order_id: string;
}

interface IStatusOrder {
  id: number;
  name: string;
}

export interface IOrder {
  id: string;
  table_id: string;
  table_token: string;
  customer_name: string;
  establishment_id: string;
  status_order_id: number;
  status_order: IStatusOrder;
  order_products: IOrderProducts[];
  items_quantity: number;
  amount: string;
}

interface PropIcons {
  [key: number]: string;
}

const typeIcon: PropIcons = {
  1: 'download-outline',
  2: 'ellipsis-horizontal-outline',
  3: 'checkmark-circle-outline',
  4: 'fast-food-outline',
  5: 'cash-outline',
};

type Props = NativeStackScreenProps<StackParamList>;

export const Orders: React.FC<Props> = ({ navigation }) => {
  const { establishment } = useAuth();
  const { current_token_table, updateOrders } = useOrder();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (current_token_table) {
      api
        .get<IOrder[]>('/orders', {
          params: {
            table_id: establishment.table_id,
            table_token: current_token_table,
          },
        })
        .then(response => {
          const dataOrders = response.data.map(order => {
            const qtd = order.order_products.reduce(
              (acc, item) => acc + item.quantity,
              0,
            );

            const amt = order.order_products.reduce(
              (accumulator, product) => {
                accumulator.total += product.quantity * product.price;
                return accumulator;
              },
              { total: 0 },
            );
            return {
              ...order,
              items_quantity: qtd,
              amount: numberFormatAsCurrency(amt.total),
            };
          });
          setOrders(dataOrders);
          updateOrders(response.data);
          // setIsLoading(false);
          // setRefreshing(false);
        })
        .catch(err => {
          Alert.alert(
            err.response.data.message
              ? err.response.data.message
              : 'Erro na solicitação',
          );
        });
    }
    setIsLoading(false);
    setRefreshing(false);
  }, [establishment.table_id, current_token_table, updateOrders, refreshing]);

  const handleRefreshOrders = useCallback(() => {
    setRefreshing(true);
  }, []);

  const handleShowOrderDetails = useCallback(
    (order: IOrder) => {
      if (order.status_order.id === 6) {
        navigation.navigate('OrderResume', { order_id: order.id });
      } else {
        navigation.navigate('OrderDetails', { order_id: order.id });
      }
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <RestaurantWrapper>
          <RestaurantInfo>
            <Logo
              source={{
                uri: 'https://img.elo7.com.br/product/original/2E973A3/logotipo-personalizada-restaurante-arte-digital-restaurante.jpg',
              }}
            />

            <Restaurant>
              <RestaurantGreeting>Seus pedidos no,</RestaurantGreeting>
              <RestaurantName>
                {establishment.establishment_name}
              </RestaurantName>
            </Restaurant>
          </RestaurantInfo>
        </RestaurantWrapper>
        <TableInfo>
          <WaiterName>{`Garçom: ${establishment.waiter}`}</WaiterName>
          <TableNumber>{`Mesa: ${establishment.table_number}`}</TableNumber>
        </TableInfo>
      </Header>

      <OrdersContainer>
        {orders.length > 0 ? (
          <Title>{`Quantidade de pedidos: ${orders.length}`}</Title>
        ) : (
          <Title>Você ainda não fez nenhum pedido :(</Title>
        )}

        {isLoading ? (
          <ActivityIndicator size="large" color="#999" />
        ) : (
          <>
            <OrderItemsList
              data={orders}
              keyExtractor={order => order.id}
              renderItem={({ item: order }) => (
                <OrderContainer onPress={() => handleShowOrderDetails(order)}>
                  <OrderResume>
                    <CostumerName>{order.customer_name}</CostumerName>
                    <ItemsResume>
                      <ItemsQuantity>{`Qtd. Itens: ${order.items_quantity}`}</ItemsQuantity>
                      <Amount>{`Total: ${order.amount}`}</Amount>
                    </ItemsResume>
                  </OrderResume>

                  <OrderStatus>
                    <Icon
                      name={typeIcon[order.status_order.id]}
                      size={25}
                      color="#969CB2"
                    />
                    <OrderStatusText>{order.status_order.name}</OrderStatusText>
                  </OrderStatus>
                </OrderContainer>
              )}
              onRefresh={handleRefreshOrders}
              refreshing={refreshing}
            />
          </>
        )}
      </OrdersContainer>
    </Container>
  );
};
