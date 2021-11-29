import React, { useCallback, useState, useEffect } from 'react';

import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Modal, StatusBar } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import ItemMenuCard from '../../components/ItemMenuCard';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import { numberFormatAsCurrency } from '../../utils/numberFormat';

import {
  Container,
  Header,
  RestaurantWrapper,
  RestaurantInfo,
  LogOutButton,
  TableInfo,
  WaiterName,
  TableNumber,
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

import { StackParamList } from '../../routes/app.routes';
import { CartModal } from '../CartModal';
import { ShowCartButton } from '../../components/ShowCartButton';
import { useCart } from '../../hooks/cart';
import { useOrder } from '../../hooks/order';

export interface ICategory {
  id: string;
  name: string;
}

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_formatted: string;
  photo_url: string;
}

type Props = NativeStackScreenProps<StackParamList>;

export const Home: React.FC<Props> = ({ navigation }) => {
  const { clearOrders, clearCurrentTableToken } = useOrder();
  const { establishment, signOut } = useAuth();
  const { cart_items, showCartModal, toggleCartModal } = useCart();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('/categories').then(response => {
      const categoriesApp = [{ id: '0', name: 'Destaques' }, ...response.data];
      setCategories(categoriesApp);
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    api
      .get<IProduct[]>('/products', {
        params: {
          category: selectedCategory,
        },
      })
      .then(response => {
        const productFormatted = response.data.map(item => {
          return {
            ...item,
            price_formatted: numberFormatAsCurrency(item.price),
          };
        });

        setProducts(productFormatted);
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [selectedCategory, refreshing]);

  const handleSelectCategory = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
  }, []);

  const navigateToItemDetails = useCallback(
    (itemId: string) => {
      navigation.navigate('Product', { item_id: itemId });
    },
    [navigation],
  );

  const handleRefreshHomeApp = useCallback(() => {
    setRefreshing(true);
  }, []);

  const handleSignOut = useCallback(() => {
    clearOrders();
    clearCurrentTableToken();
    signOut();
  }, [clearCurrentTableToken, clearOrders, signOut]);

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
                <RestaurantName>
                  {establishment.establishment_name}
                </RestaurantName>
              </Restaurant>
            </RestaurantInfo>
            <LogOutButton onPress={handleSignOut}>
              <Icon name="qr-code-scanner" />
            </LogOutButton>
          </RestaurantWrapper>
          <TableInfo>
            <WaiterName>{`Garçom: ${establishment.waiter}`}</WaiterName>
            <TableNumber>{`Mesa: ${establishment.table_number}`}</TableNumber>
          </TableInfo>
        </Header>

        <CategoriesListContainer>
          <Title>Categorias</Title>
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
            onRefresh={handleRefreshHomeApp}
            refreshing={refreshing}
          />
          <Title>Itens do Cardápio</Title>
        </CategoriesListContainer>

        {isLoading ? (
          <ActivityIndicator size="large" color="#999" />
        ) : (
          <MenuItemsContainer>
            <MenuItemsList
              data={products}
              keyExtractor={product => product.id}
              renderItem={({ item }) => (
                <ItemMenuCard
                  onPress={() => navigateToItemDetails(item.id)}
                  data={item}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: getBottomSpace(),
              }}
              onRefresh={handleRefreshHomeApp}
              refreshing={refreshing}
            />
          </MenuItemsContainer>
        )}

        <Modal visible={showCartModal} onRequestClose={toggleCartModal}>
          <CartModal navigation={navigation} />
        </Modal>

        {cart_items.length > 0 && (
          <ShowCartButton
            onPress={toggleCartModal}
            totalCartItems={cart_items.length}
            cartItems={cart_items}
          />
        )}
      </Container>
    </>
  );
};
