import 'react-native-gesture-handler';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';

import AppProvider from './hooks';
import Routes from './routes';

import theme from './global/styles/theme';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <StatusBar
      barStyle="dark-content"
      backgroundColor={theme.colors.background}
    />
    <AppProvider>
      <Routes />
    </AppProvider>
  </ThemeProvider>
);

export default App;
