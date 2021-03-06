import React, { useCallback, useEffect, useState } from 'react';

import {
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  Modal,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  Container,
  Header,
  OpenSearchItemsModalButton,
  OpenSearchItemsModalButtonText,
  InputSearchIcon,
  Title,
  CategoriesListContainer,
  CategoriesList,
  CategoryContainer,
  CategoryName,
  CategoryCover,
  DarkenImg,
} from './styles';

import api from '../../services/api';
import { StackParamList } from '../../routes/app.routes';
import { SearchProductsModal } from '../SearchProductsModal';
import { CartModal } from '../CartModal';
import { useCart } from '../../hooks/cart';
import { ShowCartButton } from '../../components/ShowCartButton';

export interface ICategorySearch {
  id: number;
  name: string;
  image_cover_url?: string;
}

type Props = NativeStackScreenProps<StackParamList>;

export const Search: React.FC<Props> = ({ navigation }) => {
  const { cart_items, showCartModal, toggleCartModal } = useCart();

  const [showModalSearch, setShowModalSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<ICategorySearch[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.get('/categories').then(response => {
      const { data } = response;
      setCategories(data);
      setIsLoading(false);
      setRefreshing(false);
    });
  }, [refreshing]);

  const handleSubmitSearch = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      console.log(e.nativeEvent.text);
    },
    [],
  );

  const toggleModalSearchItems = useCallback(() => {
    setShowModalSearch(!showModalSearch);
  }, [showModalSearch]);

  const handleOnRefreshCategoryList = useCallback(() => {
    setRefreshing(true);
  }, []);

  const navigateToSearchCategory = useCallback(
    (category_id: number, category_name: string) => {
      navigation.navigate('SearchCategory', { category_id, category_name });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <OpenSearchItemsModalButton onPress={toggleModalSearchItems}>
          <InputSearchIcon name="search" />
          <OpenSearchItemsModalButtonText>
            {searchTerm || 'Itens do menu'}
          </OpenSearchItemsModalButtonText>
        </OpenSearchItemsModalButton>
      </Header>
      <Title>Categorias</Title>
      <CategoriesListContainer>
        {isLoading && <ActivityIndicator size="large" color="#999" />}
        <CategoriesList
          data={categories}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          keyExtractor={category => String(category.id)}
          renderItem={({ item: category }) => (
            <CategoryContainer
              onPress={() =>
                navigateToSearchCategory(category.id, category.name)
              }
            >
              <DarkenImg>
                <CategoryName>{category.name}</CategoryName>
              </DarkenImg>
              <CategoryCover
                source={{
                  uri: category.image_cover_url,
                }}
              />
            </CategoryContainer>
          )}
          onRefresh={handleOnRefreshCategoryList}
          refreshing={refreshing}
        />
      </CategoriesListContainer>
      <Modal visible={showModalSearch}>
        <SearchProductsModal
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSubmitSearch={handleSubmitSearch}
          toggleOpenSearchModal={toggleModalSearchItems}
          navigation={navigation}
        />
      </Modal>

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
  );
};
