import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { Alert, StatusBar, ActivityIndicator, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../../routes/app.routes';

import {
  Container,
  Header,
  ItemWrapper,
  BackButton,
  Icon,
  ItemPhoto,
  ItemInfoContainer,
  ItemContainer,
  Title,
  Description,
  DescriptionText,
  Footer,
  Price,
  Rate,
  AddItemToOrderContainer,
  AddControl,
  RemoveItemButton,
  RemoveItemIcon,
  TotalItemsText,
  AddItemButton,
  AddItemIcon,
  AddItemOrderButton,
  AddItemOrderButtonText,
  ValueOrderTotalText,
} from './styles';
import { IMenuItem } from '../Home';
import api from '../../services/api';
import { numberFormatAsCurrency } from '../../utils/numberFormat';
import InputItemDetails from '../../components/InputItemDetails';
import MenuItemDetails from '../MenuItemDetails';

interface RouteParams {
  itemId: string;
}

type Props = NativeStackScreenProps<HomeStackParamList, 'MenuItem'>;

const MenuItem: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [itemDetailsModalOpen, setItemDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuItem, setMenuItem] = useState<IMenuItem>({} as IMenuItem);
  const [quantity, setQuantity] = useState(1);
  const [valueOrderTotal, setValueOrderTotal] = useState(0);
  const [textItemDetails, setTextItemDetails] = useState('');

  useEffect(() => {
    api
      .get<IMenuItem>(`/items/${routeParams.itemId}`)
      .then(response => {
        const menuItemFormatted = {
          ...response.data,
          price_formatted: numberFormatAsCurrency(response.data.price),
          url_photo: response.data.images[0].image_url,
        };

        setMenuItem(menuItemFormatted);
        setIsLoading(false);

        setValueOrderTotal(Number(menuItemFormatted.price));
      })
      .catch(err => {
        console.log(err.message);
        Alert.alert('Erro ao consultar item do menu');
      });
  }, [routeParams.itemId]);

  const handleRemoveItemQuantity = useCallback(() => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
    setValueOrderTotal(oldState => oldState - Number(menuItem.price));
  }, [quantity, menuItem]);

  const handleAddItemQuantity = useCallback(() => {
    setQuantity(quantity + 1);
    setValueOrderTotal(oldState => oldState + Number(menuItem.price));
  }, [quantity, menuItem]);

  const valueOrderTotalFormatted = useMemo(() => {
    return numberFormatAsCurrency(valueOrderTotal);
  }, [valueOrderTotal]);

  const toggleModalItemDetails = useCallback(() => {
    setItemDetailsModalOpen(!itemDetailsModalOpen);
  }, [itemDetailsModalOpen]);

  const handleSubmitItem = useCallback(() => {
    const data = {
      item_id: menuItem.id,
      quantity,
      total: valueOrderTotal,
      details: textItemDetails,
    };

    console.log(data);
  }, [menuItem.id, quantity, valueOrderTotal, textItemDetails]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Container>
        {isLoading ? (
          <ActivityIndicator size="large" color="#999" />
        ) : (
          <>
            <Header>
              <ItemWrapper>
                <BackButton onPress={() => navigation.goBack()}>
                  <Icon name="arrow-left-circle" />
                </BackButton>

                <ItemPhoto
                  source={{
                    uri: menuItem.url_photo,
                  }}
                />
              </ItemWrapper>
            </Header>

            <ItemInfoContainer>
              <ItemContainer>
                <Title>{menuItem.name}</Title>
                <Description>
                  <DescriptionText>{menuItem.description}</DescriptionText>
                </Description>
                <Footer>
                  <Price>{menuItem.price_formatted}</Price>
                  <Rate>5 estrelas</Rate>
                </Footer>
              </ItemContainer>
              <InputItemDetails
                onPress={toggleModalItemDetails}
                textDetails={
                  textItemDetails ||
                  'Ex. Tirar cebola, maionese à parte, ponto da carne etc'
                }
              />
            </ItemInfoContainer>

            <AddItemToOrderContainer>
              <AddControl>
                <RemoveItemButton onPress={handleRemoveItemQuantity}>
                  <RemoveItemIcon name="minus-circle" />
                </RemoveItemButton>

                <TotalItemsText>{quantity}</TotalItemsText>

                <AddItemButton onPress={handleAddItemQuantity}>
                  <AddItemIcon name="plus-circle" />
                </AddItemButton>
              </AddControl>
              <AddItemOrderButton onPress={handleSubmitItem}>
                <AddItemOrderButtonText>Adicionar</AddItemOrderButtonText>
                <ValueOrderTotalText>
                  {valueOrderTotalFormatted}
                </ValueOrderTotalText>
              </AddItemOrderButton>
            </AddItemToOrderContainer>
          </>
        )}

        <Modal
          visible={itemDetailsModalOpen}
          onRequestClose={() => console.log('close')}
        >
          <MenuItemDetails
            textItemDetails={textItemDetails}
            setMenuItemDetails={setTextItemDetails}
            toggleOpenMenuItemDetails={toggleModalItemDetails}
          />
        </Modal>
      </Container>
    </>
  );
};

export default MenuItem;
