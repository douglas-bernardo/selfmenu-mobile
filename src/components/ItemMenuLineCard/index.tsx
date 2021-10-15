import React from 'react';

import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  ItemContainer,
  ItemPhoto,
  ItemName,
  CategoryName,
} from './styles';

interface ICategory {
  id: number;
  name: string;
}

export interface ItemMenuCardProps {
  id: string;
  name: string;
  category: ICategory;
  url_photo: string;
}

interface Props extends TouchableOpacityProps {
  data: ItemMenuCardProps;
}

const ItemMenuLineCard: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Container {...rest}>
      <ItemContainer>
        <ItemName>{data.name}</ItemName>
        <CategoryName>{data.category.name}</CategoryName>
      </ItemContainer>
      <ItemPhoto
        source={{
          uri: data.url_photo,
        }}
      />
    </Container>
  );
};

export default ItemMenuLineCard;
