import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import MenuItem from '../screens/MenuItem';
import HomeTabScreens from './stacks/HomeTabScreens';

export type HomeStackParamList = {
  HomeScreen: undefined;
  MenuItem: { itemId: string };
};

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>();

const AppRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        cardStyle: { opacity: 1 },
      }}
    >
      <Screen name="HomeScreen" component={HomeTabScreens} />
      <Screen name="MenuItem" component={MenuItem} />
    </Navigator>
  );
};

export default AppRoutes;
