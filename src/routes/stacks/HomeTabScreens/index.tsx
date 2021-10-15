import React from 'react';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { Platform } from 'react-native';
import Search from '../../../screens/Search';
import Orders from '../../../screens/Orders';
import Home from '../../../screens/Home';

export type HomeTabParamList = {
  Home: undefined;
  Busca: undefined;
  Pedidos: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<HomeTabParamList>();

const HomeTabScreens: React.FC = () => {
  const theme = useTheme();

  return (
    <Navigator
      sceneContainerStyle={{
        backgroundColor: '#fff',
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
          tabBarBadge: 3,
        }}
      />
    </Navigator>
  );
};

export default HomeTabScreens;
