import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../../routes/app.routes';
import { useCart } from '../../hooks/cart';

import {
  Container,
  Header,
  EstablishmentWrapper,
  TableIdentify,
  EstablishmentInfo,
  EstablishmentName,
  WaiterName,
  OrdersContainer,
  Title,
} from './styles';

type Props = NativeStackScreenProps<StackParamList>;

export const Orders: React.FC<Props> = () => {
  const { cart_items } = useCart();
  return (
    <Container>
      <Header>
        <EstablishmentWrapper>
          <TableIdentify>Mesa: 2</TableIdentify>
        </EstablishmentWrapper>
        <EstablishmentInfo>
          <EstablishmentName>Does Food</EstablishmentName>
          <WaiterName>Garçom: Moes</WaiterName>
        </EstablishmentInfo>
      </Header>

      <OrdersContainer>
        <Title>{`Existem ${cart_items.length} itens em sua sacola.`}</Title>
      </OrdersContainer>
    </Container>
  );
};
