import styled from 'styled-components/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { FlatList, TouchableOpacity } from 'react-native';

import { IOrder } from './index';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(28)}px;

  background-color: ${({ theme }) => theme.colors.background};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;

  border-bottom-left-radius: 35px;
`;

export const RestaurantWrapper = styled.View`
  width: 100%;

  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(40)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RestaurantInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Logo = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.attention};
  border-radius: 10px;
`;

export const TableInfo = styled.View`
  width: 100%;
  position: absolute;

  flex-direction: row;
  justify-content: space-between;

  padding: 0 24px;
  bottom: 20px;
`;

export const WaiterName = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const TableNumber = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Restaurant = styled.View`
  margin-left: 17px;
`;

export const RestaurantGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const RestaurantName = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const OrdersContainer = styled.View`
  padding: 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const OrderItemsList = styled(FlatList as new () => FlatList<IOrder>)`
  margin-top: 20px;
`;

export const OrderContainer = styled(TouchableOpacity)`
  flex-direction: row;
  padding: 10px;
  background: ${({ theme }) => theme.colors.background};
  margin-bottom: 10px;

  border-radius: 5px;

  justify-content: space-between;
`;

export const OrderResume = styled.View`
  width: 70%;
`;

export const ItemsResume = styled.View`
  flex-direction: row;
`;

export const CostumerName = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
`;

export const ItemsQuantity = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
  margin-right: 10px;
`;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
`;

export const OrderStatus = styled.View`
  width: 30%;
  justify-content: center;
  align-items: center;
`;

export const OrderStatusText = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(8)}px;

  text-align: center;
`;
