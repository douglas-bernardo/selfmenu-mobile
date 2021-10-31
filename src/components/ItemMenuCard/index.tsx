import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { IProduct } from '../../screens/Home';

import {
  Container,
  ItemContainer,
  ItemPhoto,
  Title,
  Description,
  DescriptionText,
  Footer,
  Price,
  Rate,
} from './styles';

// export interface ItemMenuCardProps {
//   id: string;
//   name: string;
//   description: string;
//   url_photo: string;
//   price_formatted: string;
// }

interface Props extends RectButtonProps {
  data: IProduct;
}

const ItemMenuCard: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Container {...rest}>
      <ItemPhoto
        source={{
          uri: data.photo_url,
        }}
      />

      <ItemContainer>
        <Title>{data.name}</Title>
        <Description>
          <DescriptionText ellipsizeMode="tail" numberOfLines={2}>
            {data.description}
          </DescriptionText>
        </Description>
        <Footer>
          <Price>{data.price_formatted}</Price>
          <Rate>5 estrelas</Rate>
        </Footer>
      </ItemContainer>
    </Container>
  );
};

export default ItemMenuCard;
