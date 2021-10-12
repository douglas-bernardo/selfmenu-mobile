import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Container, Title } from './styles';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { RootStackParamList } from '../../routes/app.routes';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const Search: React.FC<Props> = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Title>Search Screen</Title>
      <Button onPress={signOut}>Sair</Button>
    </Container>
  );
};

export default Search;
