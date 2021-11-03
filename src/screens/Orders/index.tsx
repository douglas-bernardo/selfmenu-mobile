import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../../routes/app.routes';

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
import { useOrder } from '../../hooks/order';

type Props = NativeStackScreenProps<StackParamList>;

export const Orders: React.FC<Props> = () => {
  const { orders } = useOrder();
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
        <Title>{`Você tem um total de ${orders.length} pedidos.`}</Title>
      </OrdersContainer>
    </Container>
  );
};
