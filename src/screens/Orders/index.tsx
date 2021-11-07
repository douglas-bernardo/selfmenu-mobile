import React, { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';

import {
  Container,
  Header,
  TableInfoWrapper,
  Logo,
  TableIdentify,
  EstablishmentInfo,
  EstablishmentName,
  WaiterName,
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
  customer_name: string;
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
  2: 'checkmark-circle-outline',
  3: 'ellipsis-horizontal-outline',
  4: 'cash-outline',
};

type Props = NativeStackScreenProps<StackParamList>;

export const Orders: React.FC<Props> = ({ navigation }) => {
  const { establishment } = useAuth();
  const { current_token_table, orders: currentOrders } = useOrder();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
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
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [establishment.table_id, current_token_table, currentOrders]);

  const handleShowOrderDetails = useCallback(
    (order_id: string) => {
      navigation.navigate('OrderDetails', { order_id });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <TableInfoWrapper>
          <Logo
            source={{
              uri: 'https://img.elo7.com.br/product/original/2E973A3/logotipo-personalizada-restaurante-arte-digital-restaurante.jpg',
            }}
          />
          <TableIdentify>{`Mesa: ${establishment.table_number}`}</TableIdentify>
        </TableInfoWrapper>

        <EstablishmentInfo>
          <EstablishmentName>{`${establishment.establishment_name}`}</EstablishmentName>
          <WaiterName>{`Garçom: ${establishment.waiter}`}</WaiterName>
        </EstablishmentInfo>
      </Header>

      <OrdersContainer>
        {orders.length > 0 ? (
          <Title>{`Total de pedidos da mesa: ${orders.length}`}</Title>
        ) : (
          <Title>Você ainda não fez nenhum pedido :(</Title>
        )}

        {orders.length > 0 && (
          <>
            <OrderItemsList
              data={orders}
              keyExtractor={order => order.id}
              renderItem={({ item: order }) => (
                <OrderContainer
                  onPress={() => handleShowOrderDetails(order.id)}
                >
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
            />
          </>
        )}
      </OrdersContainer>
    </Container>
  );
};
