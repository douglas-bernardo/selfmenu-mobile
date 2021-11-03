import React from 'react';

import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { Platform } from 'react-native';
import { Search } from '../../../screens/Search';
import { Orders } from '../../../screens/Orders';
import { Home } from '../../../screens/Home';
import { useOrder } from '../../../hooks/order';

const { Navigator, Screen } = createBottomTabNavigator();

export const HomeTabScreens: React.FC = () => {
  const theme = useTheme();
  const { orders } = useOrder();

  return (
    <Navigator
      sceneContainerStyle={{
        backgroundColor: '#000',
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.attention,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          height: 60,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FeatherIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Busca"
        component={Search}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FeatherIcon name="search" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Pedidos"
        component={Orders}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FeatherIcon name="file-text" size={size} color={color} />
          ),
          tabBarBadge: orders.length > 0 ? orders.length : undefined,
        }}
      />
    </Navigator>
  );
};
