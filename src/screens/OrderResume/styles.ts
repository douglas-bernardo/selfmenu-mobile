import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';

import { IOrderProducts } from './index';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(20)}px;

  background-color: ${({ theme }) => theme.colors.background};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const HeaderTopInfoWrapper = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(10)}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const HeaderTopTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
`;

export const EstablishmentInfo = styled.View`
  position: absolute;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  padding: 0 24px;
  bottom: 20px;
`;

export const EstablishmentName = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const WaiterName = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ItemsContainer = styled.View`
  padding: 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const CartItemsListHeader = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 10px;
`;

export const ListSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const HeaderItem = styled.Text`
  width: 60%;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const HeaderQuantity = styled.Text`
  width: 20%;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const HeaderAmount = styled.Text`
  width: 20%;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ItemsList = styled(
  FlatList as new () => FlatList<IOrderProducts>,
)``;

export const ProductContainer = styled.View`
  flex-direction: row;
  padding: 10px;
  background: ${({ theme }) => theme.colors.shape};

  justify-content: space-around;
`;

export const ProductResume = styled.View`
  width: 60%;
`;

export const ProductName = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;

export const QuantityResume = styled.View`
  width: 10%;
  align-items: center;
`;

export const ProductQuantity = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;

export const AmountResume = styled.View`
  width: 30%;
  align-items: center;
`;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;

export const Footer = styled.View`
  position: absolute;
  width: 100%;
  padding: 20px;
  bottom: ${RFValue(10)}px;
`;

export const StatusOrderText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: 18px;

  justify-content: center;
  text-align: center;

  border-radius: 10px;
  margin-top: 24px;
  padding: 12px 24px;
`;

export const PaymentOrderButton = styled(RectButton)`
  background: ${({ theme }) => theme.colors.success};

  justify-content: center;
  align-items: center;

  border-radius: 10px;
  margin-top: 24px;
  padding: 12px 24px;
`;

export const PaymentOrderButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
  font-size: 18px;
`;

export const ItemsListResumeHeader = styled.View`
  position: absolute;
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  margin-top: 10px;

  padding: 24px;
  bottom: ${RFValue(80)}px;
`;
