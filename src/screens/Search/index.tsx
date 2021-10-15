import React, { useCallback, useEffect, useState } from 'react';

import {
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  Modal,
} from 'react-native';
import { useTheme } from 'styled-components/native';
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

import { HomeTabParamList } from '../../routes/stacks/HomeTabScreens';
import api from '../../services/api';
import SearchItemsModal from '../SearchItemsModal';

export interface ICategorySearch {
  id: string;
  name: string;
  image_cover_url?: string;
}

const mockCategories: ICategorySearch[] = [
  {
    id: '1',
    name: 'Burgers',
    image_cover_url:
      'https://caianomundo-prod.imgix.net/2014/01/imagem_1.jpg?fm=pjpg&ixlib=php-1.2.1',
  },
];

type Props = NativeStackScreenProps<HomeTabParamList, 'Busca'>;

const Search: React.FC<Props> = ({ navigation }) => {
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

  const handleSelectCategory = useCallback((categoryId: string) => {
    console.log(categoryId);
  }, []);

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
    console.log('refreshing');
    setRefreshing(true);
  }, []);

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
          keyExtractor={category => category.id}
          renderItem={({ item: category }) => (
            <CategoryContainer
              onPress={() => handleSelectCategory(category.id)}
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
        <SearchItemsModal
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSubmitSearch={handleSubmitSearch}
          toggleOpenSearchModal={toggleModalSearchItems}
          navigation={navigation}
        />
      </Modal>
    </Container>
  );
};

export default Search;
