import styled from 'styled-components/native';

import { FlatList } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { IItemCart } from '../../components/ItemCart';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(20)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const HeaderTopInfo = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(10)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const EstablishmentInfo = styled.View`
  position: absolute;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  padding: 0 24px;
  bottom: 20px;
`;

export const TableNumberText = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const WaiterName = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const HideModalButton = styled.TouchableOpacity``;

export const HideModalButtonIcon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(32)}px;
`;

export const ClearCartButton = styled.TouchableOpacity``;

export const ClearCartButtonText = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.medium};

  margin-left: 10px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.medium};

  align-items: center;
  justify-content: center;
`;

export const CartItemsContainer = styled.View`
  flex: 1;
  padding: 24px 24px 0 24px;
`;

export const CartItemsList = styled(FlatList as new () => FlatList<IItemCart>)`
  margin-top: 10px;
`;

export const CartItemsListHeader = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Footer = styled.View`
  width: 100%;
  height: ${RFPercentage(11)}px;
  padding: 10px 20px;
`;
