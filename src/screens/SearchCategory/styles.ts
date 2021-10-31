import styled from 'styled-components/native';

import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';
import { IProduct } from '../Home';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(70)}px;

  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.shape};

  margin-bottom: 20px;
`;

export const OpenSearchItemsModalButton = styled.TouchableOpacity`
  flex: 1;
  height: 50px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 25px;
  background: ${({ theme }) => theme.colors.background};
`;

export const OpenSearchItemsModalButtonText = styled.Text`
  flex: 1;
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};

  padding: 10px 10px 10px 0;
`;

export const InputSearchIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(25)}px;
  padding: 10px;
`;

export const Title = styled.Text`
  padding: 0 24px;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const MenuItemsContainer = styled.View`
  flex: 1;

  margin-top: 15px;
  padding: 0 24px;
`;

export const MenuItemsList = styled(FlatList as new () => FlatList<IProduct>)``;
