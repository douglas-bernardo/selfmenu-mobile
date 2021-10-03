import React, { useCallback, useState } from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import ItemMenuCard, { ItemMenuCardProps } from '../../components/ItemMenuCard';

import {
  Container,
  Header,
  RestaurantWrapper,
  RestaurantInfo,
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

export interface Category {
  id: string;
  name: string;
}

export interface DataListProps extends ItemMenuCardProps {
  id: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Todas',
  },
  {
    id: '2',
    name: 'Bebidas',
  },
  {
    id: '3',
    name: 'Massas',
  },
  {
    id: '4',
    name: 'Sobremesas',
  },
  {
    id: '5',
    name: 'Light',
  },
];

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('1');

  const handleSelectCategory = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const data: DataListProps[] = [
    {
      id: '1',
      url_photo:
        'https://t2.rg.ltmcdn.com/pt/images/1/3/7/salada_tropical_natalina_9731_orig.jpg',
      title: 'Salada Tropical',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem iure quae excepturi at dolores minima repudiandae neque, fugit ducimus, consectetur eos praesentium, esse sit nulla! Quos debitis beatae exercitationem officia!',
      price: 'R$ 25,00',
    },
    {
      id: '2',
      url_photo:
        'https://t2.rg.ltmcdn.com/pt/images/1/3/7/salada_tropical_natalina_9731_orig.jpg',
      title: 'Salada Tropical',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem iure quae excepturi at dolores minima repudiandae neque, fugit ducimus, consectetur eos praesentium, esse sit nulla! Quos debitis beatae exercitationem officia!',
      price: 'R$ 25,00',
    },
    {
      id: '3',
      url_photo:
        'https://t2.rg.ltmcdn.com/pt/images/1/3/7/salada_tropical_natalina_9731_orig.jpg',
      title: 'Salada Tropical',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem iure quae excepturi at dolores minima repudiandae neque, fugit ducimus, consectetur eos praesentium, esse sit nulla! Quos debitis beatae exercitationem officia!',
      price: 'R$ 25,00',
    },
    {
      id: '4',
      url_photo:
        'https://t2.rg.ltmcdn.com/pt/images/1/3/7/salada_tropical_natalina_9731_orig.jpg',
      title: 'Salada Tropical',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem iure quae excepturi at dolores minima repudiandae neque, fugit ducimus, consectetur eos praesentium, esse sit nulla! Quos debitis beatae exercitationem officia!',
      price: 'R$ 25,00',
    },
  ];

  return (
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
              <RestaurantName>Nome Restaurante!</RestaurantName>
            </Restaurant>
          </RestaurantInfo>
          <Icon name="power" />
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
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ItemMenuCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace(),
          }}
        />
      </MenuItemsContainer>
    </Container>
  );
};

export default Home;
