import React, { useCallback, useEffect, useState } from 'react';

import { useTheme } from 'styled-components/native';
import {
  NativeSyntheticEvent,
  StatusBar,
  TextInputSubmitEditingEventData,
  KeyboardAvoidingView,
  ScrollView,
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

interface IImage {
  id: string;
  image_url: string;
}

export interface IItemMenuSearchResults {
  id: string;
  name: string;
  category: ICategory;
  url_photo: string;
  images: IImage[];
}

interface ISearchItemsModal {
  searchTerm?: string;
  setSearchTerm: (text: string) => void;
  onSubmitSearch: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  toggleOpenSearchModal: () => void;
  navigation: any;
}

const SearchItemsModal: React.FC<ISearchItemsModal> = ({
  searchTerm,
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
      .get<IItemMenuSearchResults[]>('items/search', {
        params: {
          name: term,
        },
      })
      .then(response => {
        const itemsFormatted = response.data.map(item => {
          return {
            ...item,
            url_photo: item.images[0].image_url,
          };
        });

        setSearchResults(itemsFormatted);
      });
  }, [term]);

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
      navigation.navigate('MenuItem', { itemId });
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

export default SearchItemsModal;
