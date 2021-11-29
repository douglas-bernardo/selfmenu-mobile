import React, { useCallback, useEffect, useState } from 'react';

import { ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';

import api from '../../services/api';
import { numberFormatAsCurrency } from '../../utils/numberFormat';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTopInfoWrapper,
  HeaderTopTitle,
  EstablishmentInfo,
  EstablishmentName,
  WaiterName,
  ItemsContainer,
  CartItemsListHeader,
  HeaderItem,
  HeaderQuantity,
  HeaderAmount,
  ItemsList,
  ProductContainer,
  ProductResume,
  QuantityResume,
  ProductName,
  ProductQuantity,
  Amount,
  AmountResume,
  Footer,
  StatusOrderText,
  PaymentOrderButton,
  PaymentOrderButtonText,
  ListSeparator,
  Title,
  ItemsListResumeHeader,
} from './styles';
import { useOrder } from '../../hooks/order';

export interface IOrderProducts {
  id: string;
  product_id: string;
  details: string;
  price: number;
  quantity: number;
  order_id: string;
  amount_formatted: string;
  product: {
    name: string;
  };
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

export interface IOrderItems {
  id: string;
  name: string;
  quantity: number;
  amount: string;
}

interface RouteParams {
  order_id: string;
}

type Props = NativeStackScreenProps<StackParamList>;

export const OrderResume: React.FC<Props> = ({ navigation }) => {
  const { updateOrderStatus } = useOrder();
  const { establishment } = useAuth();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [order, setOrder] = useState<IOrder>();
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    api
      .get<IOrder>(`/orders/${routeParams.order_id}`)
      .then(response => {
        const cartSummary = response.data.order_products.reduce(
          (accumulator, item) => {
            accumulator.total_items += item.quantity;
            accumulator.total += item.quantity * item.price;
            return accumulator;
          },
          {
            total: 0,
            total_items: 0,
          },
        );

        setOrder({
          ...response.data,
          items_quantity: cartSummary.total_items,
          amount: numberFormatAsCurrency(cartSummary.total),
          order_products: response.data.order_products.map(item => {
            return {
              ...item,
              amount_formatted: numberFormatAsCurrency(
                item.quantity * item.price,
              ),
            };
          }),
        });

        setRefresh(false);
      })
      .catch(err => {
        console.log(err.message);
        Alert.alert('Erro ao consultar item do menu');
      });
  }, [routeParams.order_id, refresh]);

  const handlePaymentOrder = useCallback(
    async (order_id: string) => {
      await api.patch(`/orders/${order_id}/request-payment`, {
        status_order_id: 5,
      });

      updateOrderStatus(order_id, 5);

      Alert.alert(
        'Pagamento de Pedido',
        'O garçom esta já está indo até sua mesa. Aguarde!',
      );
      navigation.navigate('Pedidos');
    },
    [navigation, updateOrderStatus],
  );

  const handleConfirmPayment = useCallback(
    (order_id: string) => {
      if (order) {
        Alert.alert(
          'Pagamento',
          `Valor total do pedido: ${order.amount}. O garçom virá até sua mesa receber o pagamento. Confirma solicitar pagamento?`,
          [
            {
              text: 'Sim',
              onPress: () => {
                handlePaymentOrder(order_id);
              },
            },
            {
              text: 'Não',
            },
          ],
        );
      }
    },
    [handlePaymentOrder, order],
  );

  return (
    <Container>
      <Header>
        <HeaderTopInfoWrapper>
          <HeaderTopTitle>Resumo do Pedido</HeaderTopTitle>
        </HeaderTopInfoWrapper>

        <EstablishmentInfo>
          <EstablishmentName>
            {establishment.establishment_name}
          </EstablishmentName>
          <WaiterName>{`Garçom: ${establishment.waiter}`}</WaiterName>
        </EstablishmentInfo>
      </Header>
      {refresh && <ActivityIndicator size="large" color="#999" />}
      {order && (
        <>
          <ItemsContainer>
            <CartItemsListHeader>
              <HeaderItem>Item</HeaderItem>
              <HeaderQuantity>Qtd</HeaderQuantity>
              <HeaderAmount>Valor</HeaderAmount>
            </CartItemsListHeader>

            <ItemsList
              data={order.order_products}
              keyExtractor={item => item.id}
              renderItem={({ item: order_product }) => (
                <ProductContainer>
                  <ProductResume>
                    <ProductName>{order_product.product.name}</ProductName>
                  </ProductResume>

                  <QuantityResume>
                    <ProductQuantity>{order_product.quantity}</ProductQuantity>
                  </QuantityResume>

                  <AmountResume>
                    <Amount>{order_product.amount_formatted}</Amount>
                  </AmountResume>
                </ProductContainer>
              )}
              ItemSeparatorComponent={() => <ListSeparator />}
            />
          </ItemsContainer>

          <ItemsListResumeHeader>
            <Title>{`Total: ${order.amount}`}</Title>
          </ItemsListResumeHeader>

          <Footer>
            {order.status_order.id === 5 ||
            establishment.status_table_id === 3 ? (
              <StatusOrderText>{order.status_order.name}</StatusOrderText>
            ) : (
              <PaymentOrderButton
                onPress={() => handleConfirmPayment(order.id)}
              >
                <PaymentOrderButtonText>Pagamento</PaymentOrderButtonText>
              </PaymentOrderButton>
            )}
          </Footer>
        </>
      )}
    </Container>
  );
};
