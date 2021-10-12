import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Container, Title } from './styles';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { RootStackParamList } from '../../routes/app.routes';

type Props = NativeStackScreenProps<RootStackParamList, 'Orders'>;

const Orders: React.FC<Props> = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Title>Orders Screen</Title>
      <Button onPress={signOut}>Sair</Button>
    </Container>
  );
};

export default Orders;
