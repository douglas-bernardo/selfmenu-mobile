import React, { useCallback, useEffect, useState } from 'react';

import { useTheme } from 'styled-components/native';
import { Alert, StatusBar } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../../components/Button';

import {
  Container,
  Header,
  HeaderTopInfo,
  HideModalButton,
  ClearCartButton,
  ClearCartButtonText,
  HideModalButtonIcon,
  EstablishmentInfo,
  WaiterName,
  TableNumberText,
  Title,
  CartItemsContainer,
  CartItemsList,
  Footer,
  CartItemsListHeader,
} from './styles';
import { useCart } from '../../hooks/cart';
import { ItemCart } from '../../components/ItemCart';
import { StackParamList } from '../../routes/app.routes';
import { numberFormatAsCurrency } from '../../utils/numberFormat';

interface ICartModal {
  navigation: NativeStackNavigationProp<StackParamList>;
}

export const CartModal: React.FC<ICartModal> = ({ navigation }) => {
  const { cart_items, toggleCartModal, clearCart } = useCart();
  const theme = useTheme();

  const [summary, setSummary] = useState({ total: '', total_items: 0 });

  useEffect(() => {
    const cartSummary = cart_items.reduce(
      (accumulator, item) => {
        accumulator.total_items += item.quantity;
        accumulator.total += item.quantity * item.product.price;
        return accumulator;
      },
      {
        total: 0,
        total_items: 0,
      },
    );
    setSummary({
      total: numberFormatAsCurrency(cartSummary.total),
      total_items: cartSummary.total_items,
    });
  }, [cart_items]);

  const handleClearCart = useCallback(() => {
    clearCart();
    Alert.alert('A comanda esta vazia!');
    toggleCartModal();
  }, [clearCart, toggleCartModal]);

  const handleEditCartItem = useCallback(
    (itemId: string) => {
      navigation.navigate('ProductUpdate', { item_id: itemId });
      toggleCartModal();
    },
    [navigation, toggleCartModal],
  );

  const handleGoToCheckout = useCallback(() => {
    navigation.navigate('Checkout');
    toggleCartModal();
  }, [navigation, toggleCartModal]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.shape} />
      <Container>
        <Header>
          <HeaderTopInfo>
            <HideModalButton onPress={toggleCartModal}>
              <HideModalButtonIcon name="keyboard-arrow-down" />
            </HideModalButton>
            <Title>Comanda</Title>
            <ClearCartButton onPress={handleClearCart}>
              <ClearCartButtonText>Limpar</ClearCartButtonText>
            </ClearCartButton>
          </HeaderTopInfo>
          <EstablishmentInfo>
            <WaiterName>Garçom: Moes</WaiterName>
            <TableNumberText>Mesa: 2</TableNumberText>
          </EstablishmentInfo>
        </Header>

        <CartItemsContainer>
          <CartItemsListHeader>
            <Title>{`Items: ${summary.total_items}`}</Title>
            <Title>{`Valor Total: ${summary.total}`}</Title>
          </CartItemsListHeader>
          {cart_items.length > 0 && (
            <CartItemsList
              keyboardShouldPersistTaps="handled"
              data={cart_items}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ItemCart
                  onPress={() => handleEditCartItem(item.id)}
                  data={item}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: getBottomSpace(),
              }}
            />
          )}
        </CartItemsContainer>

        <Footer>
          <Button onPress={handleGoToCheckout}>Finalizar Pedido</Button>
        </Footer>
      </Container>
    </>
  );
};
