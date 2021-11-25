import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useTheme } from 'styled-components/native';
import {
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useCart } from '../../hooks/cart';
import { StackParamList } from '../../routes/app.routes';
import { numberFormatAsCurrency } from '../../utils/numberFormat';

import {
  Container,
  Header,
  HeaderTopInfo,
  HeaderTitle,
  GoBackButton,
  EstablishmentInfo,
  TableNumberText,
  WaiterName,
  HideModalButtonIcon,
  Title,
  SecurityContainer,
  FormContainer,
  CartItemsListHeader,
} from './styles';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useOrder } from '../../hooks/order';

interface CreateOrderFormData {
  table_token: string;
  customer_name: string;
}

interface ICartModal {
  navigation: NativeStackNavigationProp<StackParamList>;
}

export const Checkout: React.FC<ICartModal> = ({ navigation }) => {
  const { setRefresh } = useOrder();
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);
  const { cart_items, clearCart } = useCart();
  const { establishment } = useAuth();
  const { createOrder } = useOrder();

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

  const handleSubmit = useCallback(
    async (data: CreateOrderFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          customer_name: Yup.string().required('Nome é obrigatório'),
          table_token: Yup.string().required('Código da mesa é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const order = {
          table_id: establishment.table_id,
          table_token: data.table_token,
          customer_name: data.customer_name,
          establishment_id: establishment.establishment_id,
          products: cart_items.map(item => {
            return {
              id: item.product.id,
              quantity: item.quantity,
              details: item.details,
            };
          }),
        };

        await createOrder(order);
        Alert.alert('Pedido realizado com sucesso!');
        clearCart();
        navigation.navigate('Pedidos');
        setRefresh();
      } catch (err: any | Yup.ValidationError) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          err.response.data.message
            ? err.response.data.message
            : 'Erro na solicitação',
        );
      }
    },
    [
      cart_items,
      establishment.table_id,
      establishment.establishment_id,
      createOrder,
      navigation,
      clearCart,
      setRefresh,
    ],
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.shape} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1, marginBottom: 10 }}
        >
          <Container>
            <Header>
              <HeaderTopInfo>
                <GoBackButton onPress={() => navigation.goBack()}>
                  <HideModalButtonIcon name="keyboard-arrow-left" />
                </GoBackButton>
                <HeaderTitle>Código de Segurança</HeaderTitle>
              </HeaderTopInfo>

              <EstablishmentInfo>
                <WaiterName>{`Garçom: ${establishment.waiter}`}</WaiterName>
                <TableNumberText>{`Mesa: ${establishment.table_number}`}</TableNumberText>
              </EstablishmentInfo>
            </Header>

            <SecurityContainer>
              <CartItemsListHeader>
                <Title>{`Itens: ${summary.total_items}`}</Title>
                <Title>{`Total: ${summary.total}`}</Title>
              </CartItemsListHeader>
            </SecurityContainer>

            <FormContainer>
              <Form
                ref={formRef}
                onSubmit={handleSubmit}
                style={{ width: '100%' }}
              >
                <Input
                  autoCorrect={false}
                  autoCapitalize="characters"
                  name="customer_name"
                  icon="user"
                  placeholder="Digite o seu nome"
                  returnKeyType="next"
                  containerStyle={{ marginBottom: 20 }}
                />
                <Input
                  autoCorrect={false}
                  autoCapitalize="characters"
                  name="table_token"
                  icon="shield"
                  placeholder="Insira o código da mesa"
                  returnKeyType="next"
                  containerStyle={{ marginBottom: 30 }}
                />

                <Button
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  Confirmar Pedido
                </Button>
              </Form>
            </FormContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
