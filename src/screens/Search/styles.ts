import styled from 'styled-components/native';

import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, TouchableOpacity } from 'react-native';
import { ICategorySearch } from '.';

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

export const CategoriesListContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const CategoriesList = styled(
  FlatList as new () => FlatList<ICategorySearch>,
)`
  padding: 20px;
`;

export const CategoryContainer = styled(TouchableOpacity)`
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;

  /* background: ${({ theme }) => theme.colors.background}; */

  justify-content: center;
  align-items: center;

  margin-bottom: 10px;
  margin-left: 10px;
  border-radius: 8px;
`;

export const DarkenImg = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  justify-content: center;
  align-items: center;

  border-radius: 8px;
  z-index: 1;
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const CategoryCover = styled.Image`
  width: 100%;
  height: 100%;

  border-radius: 8px;
`;
