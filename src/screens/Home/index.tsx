import React, { useCallback, useState, useEffect } from 'react';

import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import ItemMenuCard, { ItemMenuCardProps } from '../../components/ItemMenuCard';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import { numberFormatAsCurrency } from '../../utils/numberFormat';

import {
  Container,
  Header,
  RestaurantWrapper,
  RestaurantInfo,
  LogOutButton,
  Logo,
  Restaurant,
  RestaurantGreeting,
  RestaurantName,
  Icon,
  CategoriesListContainer,
  CategoriesList,
  CategoryContainer,
  CategoryName,
  MenuItemsContainer,
  Title,
  MenuItemsList,
} from './styles';
import { RootStackParamList } from '../../routes/app.routes';

export interface Category {
  id: string;
  name: string;
}

interface Image {
  id: string;
  image_url: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  price_formatted: string;
  url_photo: string;
  images: Image[];
}

export interface DataListProps extends ItemMenuCardProps {
  id: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({ navigation }) => {
  const { restaurant, signOut } = useAuth();
  const theme = useTheme();

  const [selectedCategory, setSelectedCategory] = useState('0');
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    api.get('/categories').then(response => {
      const categoriesApp = [{ id: '0', name: 'Todas' }, ...response.data];
      setCategories(categoriesApp);
    });
  }, []);

  useEffect(() => {
    api
      .get<MenuItem[]>('/items', {
        params: {
          category: selectedCategory,
        },
      })
      .then(response => {
        const menuItemsFormatted = response.data.map(item => {
          return {
            ...item,
            price_formatted: numberFormatAsCurrency(item.price),
            url_photo: item.images[0].image_url,
          };
        });

        setMenuItems(menuItemsFormatted);
      });
  }, [selectedCategory]);

  const handleSelectCategory = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <Container>
        <Header>
          <RestaurantWrapper>
            <RestaurantInfo>
              <Logo
                source={{
                  uri: 'https://img.elo7.com.br/product/original/2E973A3/logotipo-personalizada-restaurante-arte-digital-restaurante.jpg',
                }}
              />

              <Restaurant>
                <RestaurantGreeting>Bem vindo ao,</RestaurantGreeting>
                <RestaurantName>{restaurant.establishment_name}</RestaurantName>
              </Restaurant>
            </RestaurantInfo>
            <LogOutButton onPress={signOut}>
              <Icon name="qr-code-scanner" />
            </LogOutButton>
          </RestaurantWrapper>
        </Header>

        <CategoriesListContainer>
          <CategoriesList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={category => category.id}
            renderItem={({ item: category }) => (
              <CategoryContainer
                activeOpacity={0.9}
                onPress={() => handleSelectCategory(category.id)}
                selected={category.id === selectedCategory}
              >
                <CategoryName selected={category.id === selectedCategory}>
                  {category.name}
                </CategoryName>
              </CategoryContainer>
            )}
          />
        </CategoriesListContainer>

        <MenuItemsContainer>
          <Title>Itens do Cardápio</Title>

          <MenuItemsList
            data={menuItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ItemMenuCard data={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: getBottomSpace(),
            }}
          />
        </MenuItemsContainer>
      </Container>
    </>
  );
};

export default Home;
