import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Container, Title } from './styles';
import { useAuth } from '../../hooks/auth';

import { HomeTabParamList } from '../../routes/stacks/HomeTabScreens';

type Props = NativeStackScreenProps<HomeTabParamList, 'Pedidos'>;

const Orders: React.FC<Props> = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Title>Orders Screen</Title>
    </Container>
  );
};

export default Orders;
