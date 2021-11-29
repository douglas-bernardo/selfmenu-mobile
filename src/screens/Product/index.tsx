import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useRoute } from '@react-navigation/native';
import { Alert, StatusBar, ActivityIndicator, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  Container,
  Header,
  ItemWrapper,
  BackButton,
  BackButtonIcon,
  ItemPhoto,
  ItemInfoContainer,
  ItemContainer,
  StatusTableContainer,
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
  DarkenCoverImg,
} from './styles';
import api from '../../services/api';
import { numberFormatAsCurrency } from '../../utils/numberFormat';
import InputItemDetails from '../../components/InputItemDetails';
import { StackParamList } from '../../routes/app.routes';
import { ProductOptionsModal } from '../ProductOptionsModal';
import { useCart } from '../../hooks/cart';
import { useAuth } from '../../hooks/auth';

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_formatted: string;
  photo_url: string;
}

interface RouteParams {
  item_id: string;
}

type Props = NativeStackScreenProps<StackParamList>;

export const Product: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const { establishment } = useAuth();
  const { addItem } = useCart();

  const [itemDetailsModalOpen, setItemDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuItem, setMenuItem] = useState<IProduct>({} as IProduct);
  const [quantity, setQuantity] = useState(1);
  const [valueOrderTotal, setValueOrderTotal] = useState(0);
  const [textItemDetails, setTextItemDetails] = useState('');

  useEffect(() => {
    api
      .get<IProduct>(`/products/${routeParams.item_id}`)
      .then(response => {
        const menuItemFormatted = {
          ...response.data,
          price_formatted: numberFormatAsCurrency(response.data.price),
        };

        setMenuItem(menuItemFormatted);
        setIsLoading(false);

        setValueOrderTotal(Number(menuItemFormatted.price));
      })
      .catch(err => {
        console.log(err.message);
        Alert.alert('Erro ao consultar item do menu');
      });
  }, [routeParams.item_id]);

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

  const handleAddItemToCart = useCallback(() => {
    addItem({
      id: uuidv4(),
      product: menuItem,
      quantity,
      details: textItemDetails,
      amount: valueOrderTotalFormatted,
    });
    navigation.goBack();
  }, [
    quantity,
    textItemDetails,
    addItem,
    menuItem,
    navigation,
    valueOrderTotalFormatted,
  ]);

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
                <DarkenCoverImg>
                  <BackButton onPress={() => navigation.goBack()}>
                    <BackButtonIcon name="arrow-left" />
                  </BackButton>
                </DarkenCoverImg>

                <ItemPhoto
                  source={{
                    uri: menuItem.photo_url,
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
              {establishment.status_table_id === 3 ? (
                <StatusTableContainer>
                  <Title>Mesa em fechamento</Title>
                </StatusTableContainer>
              ) : (
                <>
                  <AddControl>
                    <RemoveItemButton onPress={handleRemoveItemQuantity}>
                      <RemoveItemIcon name="minus-circle" />
                    </RemoveItemButton>

                    <TotalItemsText>{quantity}</TotalItemsText>

                    <AddItemButton onPress={handleAddItemQuantity}>
                      <AddItemIcon name="plus-circle" />
                    </AddItemButton>
                  </AddControl>
                  <AddItemOrderButton onPress={handleAddItemToCart}>
                    <AddItemOrderButtonText>Adicionar</AddItemOrderButtonText>
                    <ValueOrderTotalText>
                      {valueOrderTotalFormatted}
                    </ValueOrderTotalText>
                  </AddItemOrderButton>
                </>
              )}
            </AddItemToOrderContainer>
          </>
        )}

        <Modal
          visible={itemDetailsModalOpen}
          onRequestClose={() => console.log('close')}
        >
          <ProductOptionsModal
            textItemDetails={textItemDetails}
            setMenuItemDetails={setTextItemDetails}
            toggleOpenMenuItemDetails={toggleModalItemDetails}
          />
        </Modal>
      </Container>
    </>
  );
};
