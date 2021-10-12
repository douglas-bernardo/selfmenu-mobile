import React from 'react';

import { StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Container, Title } from './styles';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { RootStackParamList } from '../../routes/app.routes';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>;

const ItemDetail: React.FC<Props> = () => {
  const { signOut } = useAuth();
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F7CAD0" />
      <Container>
        <Title>Details Screen</Title>
        <Button onPress={signOut}>Sair</Button>
      </Container>
    </>
  );
};

export default ItemDetail;
