import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList, TouchableOpacity } from 'react-native';
import { Category, DataListProps } from '.';

interface CategoryContainerProps {
  selected: boolean;
}

interface CategoryNameProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(25)}px;

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

export const LogOutButton = styled.TouchableOpacity``;

export const Logo = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.attention};
  border-radius: 10px;
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

export const Icon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(28)}px;
`;

export const CategoriesListContainer = styled.View`
  height: 120px;
  /* margin-top: -60px; */
`;

export const CategoriesList = styled(
  FlatList as new () => FlatList<Category>,
).attrs({
  contentContainerStyle: { paddingLeft: 24 },
})`
  padding: 24px 0;
`;

export const CategoryContainer = styled(
  TouchableOpacity,
)<CategoryContainerProps>`
  background: ${props =>
    props.selected
      ? props.theme.colors.attention
      : props.theme.colors.background};

  flex-direction: row;
  padding: 8px 12px;
  align-items: center;
  margin-right: 16px;
  border-radius: 16px;
`;

export const CategoryName = styled.Text<CategoryNameProps>`
  color: ${props =>
    props.selected ? props.theme.colors.shape : props.theme.colors.text_dark};

  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const MenuItemsContainer = styled.View`
  flex: 1;

  padding: 0 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
  margin-bottom: 16px;
`;

export const MenuItemsList = styled(
  FlatList as new () => FlatList<DataListProps>,
)``;
