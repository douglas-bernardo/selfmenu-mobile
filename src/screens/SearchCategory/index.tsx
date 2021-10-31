import React, { useCallback, useEffect, useState } from 'react';

import {
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  Modal,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import {
  Container,
  Header,
  OpenSearchItemsModalButton,
  OpenSearchItemsModalButtonText,
  InputSearchIcon,
  Title,
  MenuItemsContainer,
  MenuItemsList,
} from './styles';

import ItemMenuCard from '../../components/ItemMenuCard';

import api from '../../services/api';
import { IProduct } from '../Home';
import { numberFormatAsCurrency } from '../../utils/numberFormat';
import { StackParamList } from '../../routes/app.routes';
import { SearchProductsModal } from '../SearchProductsModal';
import { useCart } from '../../hooks/cart';
import { CartModal } from '../CartModal';
import { ShowCartButton } from '../../components/ShowCartButton';

export interface ICategorySearch {
  id: string;
  name: string;
  image_cover_url?: string;
}

interface RouteParams {
  category_id: number;
  category_name: string;
}

type Props = NativeStackScreenProps<StackParamList>;

export const SearchCategory: React.FC<Props> = ({ navigation }) => {
  const { cart_items, showCartModal, toggleCartModal } = useCart();
  const route = useRoute();
  const { category_id, category_name } = route.params as RouteParams;

  const [showModalSearch, setShowModalSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [menuItems, setMenuItems] = useState<IProduct[]>([]);

  useEffect(() => {
    api
      .get<IProduct[]>('/products', {
        params: {
          category: category_id,
        },
      })
      .then(response => {
        const menuItemsFormatted = response.data.map(item => {
          return {
            ...item,
            price_formatted: numberFormatAsCurrency(item.price),
          };
        });

        setMenuItems(menuItemsFormatted);
        setIsLoading(false);
        setRefreshing(false);
      });
  }, [category_id, refreshing]);

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

  const navigateToItemDetails = useCallback(
    (itemId: string) => {
      navigation.navigate('Product', { item_id: itemId });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <OpenSearchItemsModalButton onPress={toggleModalSearchItems}>
          <InputSearchIcon name="search" />
          <OpenSearchItemsModalButtonText>
            {searchTerm || 'Itens por categoria'}
          </OpenSearchItemsModalButtonText>
        </OpenSearchItemsModalButton>
      </Header>
      <Title>{category_name}</Title>

      <MenuItemsContainer>
        {isLoading && <ActivityIndicator size="large" color="#999" />}
        <MenuItemsList
          data={menuItems}
          keyExtractor={item => item.id}
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
          onRefresh={handleOnRefreshCategoryList}
          refreshing={refreshing}
        />
      </MenuItemsContainer>

      <Modal style={{ flex: 1 }} visible={showModalSearch}>
        <SearchProductsModal
          searchTerm={searchTerm}
          categoryId={category_id}
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
