import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { ThemeProvider } from 'styled-components';

import { AppProvider } from './hooks';
import Routes from './routes';

import theme from './global/styles/theme';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
