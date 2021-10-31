import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { StatusBar, ActivityIndicator, Modal } from 'react-native';
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
  Title,
  Description,
  DescriptionText,
  Footer,
  Price,
  Rate,
  CartItemControlContainer,
  QuantityControl,
  RemoveUnitButton,
  RemoveUnitButtonIcon,
  TotalQuantityText,
  AddUnitButton,
  AddUnitButtonIcon,
  AddItemToCartButton,
  AddItemToCartButtonText,
  TotalItemValueText,
  DarkenCoverImg,
  RemoveItemCartButton,
  RemoveItemCartButtonText,
} from './styles';

import { numberFormatAsCurrency } from '../../utils/numberFormat';
import InputItemDetails from '../../components/InputItemDetails';
import { StackParamList } from '../../routes/app.routes';
import { ProductOptionsModal } from '../ProductOptionsModal';
import { useCart } from '../../hooks/cart';

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_formatted: string;
  photo_url: string;
}

interface ICartItem {
  id: string;
  product: IProduct;
  quantity: number;
  amount: string;
  details?: string;
  owner?: string;
}

interface RouteParams {
  item_id: string;
}

type Props = NativeStackScreenProps<StackParamList>;

export const ProductUpdate: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const { cart_items, updateItem, removeItem } = useCart();
  const routeParams = route.params as RouteParams;

  const [itemDetailsModalOpen, setItemDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItem, setCartItem] = useState<ICartItem>({} as ICartItem);

  const [quantity, setQuantity] = useState(1);
  const [valueOrderTotal, setValueOrderTotal] = useState(0);
  const [textItemDetails, setTextItemDetails] = useState('');

  useEffect(() => {
    const findItemCart = cart_items.find(
      item => item.id === routeParams.item_id,
    );
    if (findItemCart) {
      setCartItem(findItemCart);

      const currentTotalValue =
        findItemCart.quantity * findItemCart.product.price;
      setValueOrderTotal(currentTotalValue);

      setQuantity(findItemCart.quantity);
      setTextItemDetails(findItemCart.details || '');
      setIsLoading(false);
    }
  }, [cart_items, routeParams.item_id]);

  const handleRemoveItemQuantity = useCallback(() => {
    if (quantity === 0) return;
    setQuantity(quantity - 1);
    setValueOrderTotal(oldState => oldState - Number(cartItem.product.price));
  }, [quantity, cartItem]);

  const handleAddItemQuantity = useCallback(() => {
    setQuantity(quantity + 1);
    setValueOrderTotal(oldState => oldState + Number(cartItem.product.price));
  }, [quantity, cartItem]);

  const valueOrderTotalFormatted = useMemo(() => {
    return numberFormatAsCurrency(valueOrderTotal);
  }, [valueOrderTotal]);

  const toggleModalItemDetails = useCallback(() => {
    setItemDetailsModalOpen(!itemDetailsModalOpen);
  }, [itemDetailsModalOpen]);

  const handleUpdateItemCart = useCallback(() => {
    updateItem({
      id: cartItem.id,
      product: cartItem.product,
      quantity,
      details: textItemDetails,
      amount: valueOrderTotalFormatted,
    });

    navigation.goBack();
  }, [
    quantity,
    textItemDetails,
    cartItem,
    navigation,
    valueOrderTotalFormatted,
    updateItem,
  ]);

  const handleRemoveItemCart = useCallback(() => {
    removeItem(cartItem);
    navigation.goBack();
  }, [removeItem, cartItem, navigation]);

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
                    uri: cartItem.product.photo_url,
                  }}
                />
              </ItemWrapper>
            </Header>

            <ItemInfoContainer>
              <ItemContainer>
                <Title>{cartItem.product.name}</Title>
                <Description>
                  <DescriptionText>
                    {cartItem.product.description}
                  </DescriptionText>
                </Description>
                <Footer>
                  <Price>{cartItem.product.price_formatted}</Price>
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

            <CartItemControlContainer>
              <QuantityControl>
                <RemoveUnitButton onPress={handleRemoveItemQuantity}>
                  <RemoveUnitButtonIcon
                    isEmpty={quantity === 0}
                    name="minus-circle"
                  />
                </RemoveUnitButton>

                <TotalQuantityText>{quantity}</TotalQuantityText>

                <AddUnitButton onPress={handleAddItemQuantity}>
                  <AddUnitButtonIcon name="plus-circle" />
                </AddUnitButton>
              </QuantityControl>

              {quantity === 0 ? (
                <RemoveItemCartButton onPress={handleRemoveItemCart}>
                  <RemoveItemCartButtonText>Remover</RemoveItemCartButtonText>
                </RemoveItemCartButton>
              ) : (
                <AddItemToCartButton onPress={handleUpdateItemCart}>
                  <AddItemToCartButtonText>Atualizar</AddItemToCartButtonText>
                  <TotalItemValueText>
                    {valueOrderTotalFormatted}
                  </TotalItemValueText>
                </AddItemToCartButton>
              )}
            </CartItemControlContainer>
          </>
        )}

        <Modal
          visible={itemDetailsModalOpen}
          onRequestClose={toggleModalItemDetails}
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
