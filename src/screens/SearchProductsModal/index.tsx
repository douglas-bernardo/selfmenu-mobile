import React, { useCallback, useEffect, useState } from 'react';

import { useTheme } from 'styled-components/native';
import {
  NativeSyntheticEvent,
  StatusBar,
  TextInputSubmitEditingEventData,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import SearchInput from '../../components/SearchInput';
import ItemMenuLineCard from '../../components/ItemMenuLineCard';
import api from '../../services/api';

import {
  Container,
  Header,
  QuitButton,
  QuitButtonText,
  ResultSearchContainer,
  SearchTitle,
  MenuItemsSearchResultsList,
} from './styles';

interface ICategory {
  id: number;
  name: string;
}

export interface IItemMenuSearchResults {
  id: string;
  name: string;
  category: ICategory;
  photo_url: string;
}

interface ISearchItemsModal {
  searchTerm?: string;
  categoryId?: number;
  setSearchTerm: (text: string) => void;
  onSubmitSearch: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  toggleOpenSearchModal: () => void;
  navigation: any;
}

export const SearchProductsModal: React.FC<ISearchItemsModal> = ({
  searchTerm,
  categoryId,
  setSearchTerm,
  onSubmitSearch,
  toggleOpenSearchModal,
  navigation,
}) => {
  const theme = useTheme();
  const [term, setTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IItemMenuSearchResults[]>(
    [],
  );

  useEffect(() => {
    if (term.length < 1) return;
    api
      .get<IItemMenuSearchResults[]>('products/search', {
        params: {
          name: term,
          category_id: categoryId,
        },
      })
      .then(response => {
        setSearchResults(response.data);
      });
  }, [term, categoryId]);

  const handleSaveInputItemDetails = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      onSubmitSearch(e);
      toggleOpenSearchModal();
    },
    [toggleOpenSearchModal, onSubmitSearch],
  );

  const handleQuitSearch = useCallback(() => {
    setSearchTerm('');
    setSearchResults([]);
    toggleOpenSearchModal();
  }, [setSearchTerm, toggleOpenSearchModal]);

  const handleInputSearchItems = useCallback((text: string) => {
    if (text.length > 1) {
      setTerm(text);
      return;
    }
    setSearchResults([]);
  }, []);

  const navigateToItemDetails = useCallback(
    (itemId: string) => {
      toggleOpenSearchModal();
      navigation.navigate('Product', { item_id: itemId });
    },
    [navigation, toggleOpenSearchModal],
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.shape} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <Header>
            <SearchInput
              placeholder="Itens do menu"
              placeholderTextColor={theme.colors.text}
              defaultValue={searchTerm}
              returnKeyType="search"
              onChangeText={handleInputSearchItems}
              onSubmitEditing={handleSaveInputItemDetails}
            />
            <QuitButton onPress={handleQuitSearch}>
              <QuitButtonText>Cancelar</QuitButtonText>
            </QuitButton>
          </Header>
          <ResultSearchContainer>
            {searchResults.length > 0 && (
              <>
                <SearchTitle>Resultados...</SearchTitle>
                <MenuItemsSearchResultsList
                  keyboardShouldPersistTaps="handled"
                  data={searchResults}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <ItemMenuLineCard
                      onPress={() => navigateToItemDetails(item.id)}
                      data={item}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: getBottomSpace(),
                  }}
                />
              </>
            )}
          </ResultSearchContainer>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};
