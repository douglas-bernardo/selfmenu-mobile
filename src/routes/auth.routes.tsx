import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignInQRCode } from '../screens/SignInQRCode';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      animationEnabled: false,
      cardStyle: { opacity: 1 },
    }}
  >
    <Auth.Screen name="SignInQRCode" component={SignInQRCode} />
  </Auth.Navigator>
);

export default AuthRoutes;
