import React from 'react';

import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  ItemContainer,
  ItemPhoto,
  ItemName,
  TotalItemValue,
  ItemDetails,
  ItemQuantityBadge,
  ItemQuantityBadgeText,
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
  id: string;
  product: IProduct;
  quantity: number;
  amount: string;
  details?: string;
  owner?: string;
}

interface Props extends TouchableOpacityProps {
  data: IItemCart;
}

export const ItemCart: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Container {...rest}>
      <ItemContainer>
        <ItemName>{data.product.name}</ItemName>
        <TotalItemValue>{data.amount}</TotalItemValue>
        <ItemDetails>{data.details}</ItemDetails>
      </ItemContainer>
      <ItemPhoto
        source={{
          uri: data.product.photo_url,
        }}
      />
      <ItemQuantityBadge>
        <ItemQuantityBadgeText>{data.quantity}</ItemQuantityBadgeText>
      </ItemQuantityBadge>
    </Container>
  );
};
