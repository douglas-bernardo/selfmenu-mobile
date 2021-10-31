import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';
import { IItemMenuSearchResults } from '.';

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

export const QuitButton = styled.TouchableOpacity``;

export const QuitButtonText = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.medium};

  margin-left: 10px;
`;

export const Title = styled.Text`
  width: 90%;

  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.medium};

  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const TextInputContainer = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 20px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Footer = styled.View`
  position: absolute;
  width: 100%;
  padding: 20px;
  bottom: ${RFValue(10)}px;
`;

export const ResultSearchContainer = styled.View`
  flex: 1;
  padding: 0 24px;
`;

export const SearchTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
  margin-bottom: 15px;
`;

export const MenuItemsSearchResultsList = styled(
  FlatList as new () => FlatList<IItemMenuSearchResults>,
)``;
