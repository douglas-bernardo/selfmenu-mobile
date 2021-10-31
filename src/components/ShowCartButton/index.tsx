import React, { useEffect, useState } from 'react';

import { TouchableWithoutFeedback } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { numberFormatAsCurrency } from '../../utils/numberFormat';

import {
  Container,
  ButtonCartItemsBadge,
  ButtonCartItemsBadgeText,
  ButtonText,
  TotalCartValueText,
} from './styles';

interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_formatted: string;
  photo_url: string;
}

export interface IItemCart {
  product: IProduct;
  quantity: number;
  amount: string;
  details?: string;
  owner?: string;
}

interface ButtonProps extends RectButtonProps {
  totalCartItems: number;
  cartItems: IItemCart[];
  onPress: () => void;
}

export const ShowCartButton: React.FC<ButtonProps> = ({
  cartItems,
  onPress,
  ...rest
}) => {
  const [data, setData] = useState({
    total_items: 0,
    total_value: '',
  });

  useEffect(() => {
    const summaryCart = cartItems.reduce(
      (accumulator, item) => {
        accumulator.total_items += item.quantity;
        accumulator.total_value += item.product.price * item.quantity;
        return accumulator;
      },
      {
        total_items: 0,
        total_value: 0,
      },
    );
    setData({
      total_items: summaryCart.total_items,
      total_value: numberFormatAsCurrency(summaryCart.total_value),
    });
  }, [cartItems]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container {...rest}>
        <ButtonCartItemsBadge>
          <ButtonCartItemsBadgeText>
            {data.total_items}
          </ButtonCartItemsBadgeText>
        </ButtonCartItemsBadge>

        <ButtonText>Comanda</ButtonText>

        <TotalCartValueText>{data.total_value}</TotalCartValueText>
      </Container>
    </TouchableWithoutFeedback>
  );
};
