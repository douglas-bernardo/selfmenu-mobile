import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F7CAD0" />
      <Container />
    </>
  );
};

export default Home;
