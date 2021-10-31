import styled from 'styled-components/native';

import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IItemCart } from '../../components/ItemCart';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  text-align: center;
`;

export const CartItemsContainer = styled.View`
  padding: 24px;
`;

export const CartItemsList = styled(
  FlatList as new () => FlatList<IItemCart>,
)``;

export const Footer = styled.View`
  position: absolute;
  width: 100%;
  padding: 20px;
  bottom: ${RFValue(10)}px;
`;
