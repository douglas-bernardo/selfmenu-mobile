import React, { useCallback } from 'react';

import { useTheme } from 'styled-components/native';
import { Alert, StatusBar } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../../components/Button';

import {
  Container,
  Header,
  HideModalButton,
  ClearCartButton,
  ClearCartButtonText,
  HideModalButtonIcon,
  Title,
  CartItemsContainer,
  CartItemsList,
  Footer,
} from './styles';
import { useCart } from '../../hooks/cart';
import { ItemCart } from '../../components/ItemCart';
import { StackParamList } from '../../routes/app.routes';

interface ICartModal {
  navigation: NativeStackNavigationProp<StackParamList>;
}

export const CartModal: React.FC<ICartModal> = ({ navigation }) => {
  const { cart_items, toggleCartModal, clearCart } = useCart();
  const theme = useTheme();

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

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.shape} />
      <Container>
        <Header>
          <HideModalButton onPress={toggleCartModal}>
            <HideModalButtonIcon name="keyboard-arrow-down" />
          </HideModalButton>
          <Title>Items do pedido</Title>
          <ClearCartButton onPress={handleClearCart}>
            <ClearCartButtonText>Limpar</ClearCartButtonText>
          </ClearCartButton>
        </Header>

        <CartItemsContainer>
          {cart_items.length > 0 && (
            <>
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
            </>
          )}
        </CartItemsContainer>

        <Footer>
          <Button onPress={() => {}}>Fechar Pedido</Button>
        </Footer>
      </Container>
    </>
  );
};
