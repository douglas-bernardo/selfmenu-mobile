import React, { useCallback, useEffect, useState } from 'react';

import { useTheme } from 'styled-components/native';
import { ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';

import {
  Container,
  Header,
  TableInfoWrapper,
  OrderIdentify,
  EstablishmentInfo,
  EstablishmentName,
  WaiterName,
  OrdersContainer,
  CartItemsListHeader,
  Title,
  OrderItemsList,
  ProductContainer,
  ProductResume,
  ProductResumeSummary,
  ProductName,
  ProductQuantity,
  Amount,
  OrderActions,
  OrderActionText,
  OrderStatusText,
  Footer,
  CloseOrderButton,
  InvoiceIcon,
  CloseOrderButtonText,
  OrderActionStatusText,
} from './styles';

import { numberFormatAsCurrency } from '../../utils/numberFormat';
import api from '../../services/api';
import { useOrder } from '../../hooks/order';
import { useAuth } from '../../hooks/auth';

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

interface IOrderFeedBack {
  [key: number]: string;
}

const statusOrderFeedBack: IOrderFeedBack = {
  1: 'Seu pedido foi recebido na cozinha. Aguarde que logo iniciaremos o preparo...',
  2: 'Legal! Seu pedido já está em preparação',
  3: 'Seu esta pronto e já já chegará até sua mesa',
  4: 'Seu pedido foi entregue. Aproveite!',
};

type Props = NativeStackScreenProps<StackParamList>;

export const OrderDetails: React.FC<Props> = ({ navigation }) => {
  const { establishment } = useAuth();
  const { removeOrder, setRefresh } = useOrder();
  const theme = useTheme();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [order, setOrder] = useState<IOrder>();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        console.log(err.message);
        Alert.alert('Erro ao consultar item do menu');
      });
  }, [routeParams.order_id, refreshing]);

  const handleDeleteItem = useCallback(
    async (item_id: string) => {
      if (order) {
        if (order.order_products.length === 1) {
          await api.patch(`/orders/${order?.id}/cancel`, {
            status_order_id: 7,
          });
          await removeOrder(order?.id);
          navigation.navigate('Pedidos');
          setRefresh();
          return;
        }

        await api.delete(`/orders/${order.id}/remove-item`, {
          data: {
            order_product_id: item_id,
          },
        });

        setOrder({
          ...order,
          order_products: order.order_products.filter(
            item => item.id !== item_id,
          ),
        });

        setRefresh();
      }
    },
    [order, removeOrder, navigation, setRefresh],
  );

  const handleConfirmDeleteItem = useCallback(
    (item_id: string) => {
      const message =
        order?.order_products.length === 1
          ? 'Este é o último item do seu pedido, ao excluí-lo automaticamente o pedido será cancelado. Confirma a exclusão?'
          : 'Tem certeza que deseja excluir esse item do pedido?';

      Alert.alert('Excluir Item?', message, [
        {
          text: 'Sim',
          onPress: () => {
            handleDeleteItem(item_id);
          },
        },
        {
          text: 'Não',
        },
      ]);
    },
    [handleDeleteItem, order?.order_products.length],
  );

  const handleCloseOrder = useCallback(
    (order_id: string) => {
      navigation.navigate('OrderResume', { order_id });
    },
    [navigation],
  );

  const handleCancelOrder = useCallback(async () => {
    if (order) {
      await api.patch(`/orders/${order?.id}/cancel`, {
        status_order_id: 7,
      });
      await removeOrder(order?.id);
      navigation.navigate('Pedidos');
    }
    setRefresh();
  }, [order, removeOrder, navigation, setRefresh]);

  const handleConfirmCancelOrder = useCallback(() => {
    Alert.alert(
      'Cancelar Pedido?',
      'Tem certeza que deseja cancelar o pedido? Todos os itens serão excluídos da comanda.',
      [
        {
          text: 'Sim',
          onPress: () => {
            handleCancelOrder();
          },
        },
        {
          text: 'Não',
        },
      ],
    );
  }, [handleCancelOrder]);

  const handleRefreshItems = useCallback(() => {
    setRefreshing(true);
  }, []);

  return (
    <Container>
      <Header>
        <TableInfoWrapper>
          <OrderIdentify>{`Pedido: ${
            order?.customer_name || ''
          }`}</OrderIdentify>
        </TableInfoWrapper>

        <EstablishmentInfo>
          <EstablishmentName>
            {establishment.establishment_name}
          </EstablishmentName>
          <WaiterName>{`Garçom: ${establishment.waiter}`}</WaiterName>
        </EstablishmentInfo>
      </Header>
      {isLoading && <ActivityIndicator size="large" color="#999" />}
      {order && (
        <>
          <OrdersContainer>
            <OrderStatusText>{`${
              statusOrderFeedBack[order.status_order.id]
            }`}</OrderStatusText>

            <CartItemsListHeader>
              <Title>{`Qtd. Itens: ${order.items_quantity}`}</Title>
              <Title>{`Valor Total do Pedido: ${order.amount}`}</Title>
            </CartItemsListHeader>

            <OrderItemsList
              data={order.order_products}
              keyExtractor={item => item.id}
              renderItem={({ item: order_product }) => (
                <ProductContainer>
                  <ProductResume>
                    <ProductName>{order_product.product.name}</ProductName>
                    <ProductResumeSummary>
                      <ProductQuantity>{`Qtd. Itens: ${order_product.quantity}`}</ProductQuantity>
                      <Amount>{`Total: ${order_product.amount_formatted}`}</Amount>
                    </ProductResumeSummary>
                  </ProductResume>

                  {order.status_order.id === 1 ? (
                    <OrderActions
                      onPress={() => handleConfirmDeleteItem(order_product.id)}
                    >
                      <Icon
                        name="trash-outline"
                        size={25}
                        color={theme.colors.attention}
                      />
                      <OrderActionText>Excluir</OrderActionText>
                    </OrderActions>
                  ) : (
                    <OrderActionStatusText>
                      {order.status_order.name}
                    </OrderActionStatusText>
                  )}
                </ProductContainer>
              )}
              onRefresh={handleRefreshItems}
              refreshing={refreshing}
            />
          </OrdersContainer>

          <Footer>
            {(order.status_order.id === 1 && (
              <CloseOrderButton onPress={handleConfirmCancelOrder}>
                <CloseOrderButtonText>Cancelar Pedido</CloseOrderButtonText>
              </CloseOrderButton>
            )) ||
              (order.status_order.id === 4 && (
                <CloseOrderButton onPress={() => handleCloseOrder(order.id)}>
                  <InvoiceIcon name="file-invoice-dollar" size={20} />
                  <CloseOrderButtonText>Pedir Conta</CloseOrderButtonText>
                </CloseOrderButton>
              ))}
          </Footer>
        </>
      )}
    </Container>
  );
};
