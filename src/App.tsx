import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import AppProvider from './hooks';
import AppRoutes from './routes/app.routes';
import theme from './global/styles/theme';

const App: React.FC = () => (
  <NavigationContainer>
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9BEC7" />
      <AppProvider>
        <AppRoutes />
        {/* <View style={{ flex: 1, backgroundColor: '#E5E9F2' }}>
          <AppRoutes />
        </View> */}
      </AppProvider>
    </ThemeProvider>
  </NavigationContainer>
);

export default App;
