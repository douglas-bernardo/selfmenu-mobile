import React from 'react';
import { useTheme } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { Platform } from 'react-native';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Orders from '../screens/Orders';

export type RootStackParamList = {
  Home: undefined;
  ItemDetail: undefined;
  Orders: undefined;
  Search: undefined;
};
const App = createStackNavigator<RootStackParamList>();

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.attention,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          height: 55,
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
        }}
      />
    </Navigator>
  );
};

export default AppRoutes;
