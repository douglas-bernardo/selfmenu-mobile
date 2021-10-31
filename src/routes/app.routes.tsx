import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeTabScreens } from './stacks/HomeTabScreens';
import { SearchCategory } from '../screens/SearchCategory';
import { Product } from '../screens/Product';
import { ProductUpdate } from '../screens/ProductUpdate';

export type StackParamList = {
  HomeScreen: undefined;
  Product: { item_id: string };
  ProductUpdate: { item_id: string };
  Orders: undefined;
  SearchCategory: { category_id: number; category_name: string };
};

// export type HomeStackParamList = {
//   HomeScreen: undefined;
//   Product: { item_id: string; edit?: boolean };
//   Pedidos: undefined;
// };

// export type SearchStackParamList = {
//   HomeScreen: undefined;
//   Product: { item_id: string; edit?: boolean };
//   SearchCategory: { category_id: number; category_name: string };
// };

const { Navigator, Screen } = createStackNavigator();

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
      <Screen name="Product" component={Product} />
      <Screen name="ProductUpdate" component={ProductUpdate} />
      <Screen name="SearchCategory" component={SearchCategory} />
    </Navigator>
  );
};

export default AppRoutes;
