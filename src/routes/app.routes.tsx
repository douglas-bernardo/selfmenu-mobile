import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QRCodeScanner from '../pages/QRCode';
// import Home from '../pages/Home';
// import ItemDetail from '../pages/ItemDetail';

const App = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#E5E9F2' },
    }}
  >
    <App.Screen name="QRCodeScanner" component={QRCodeScanner} />
    {/* <App.Screen name="Home" component={Home} /> */}
    {/* <App.Screen name="ItemDetail" component={ItemDetail} /> */}
  </App.Navigator>
);
export default AppRoutes;
