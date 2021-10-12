import React from 'react';

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

export interface ItemMenuCardProps {
  id: string;
  name: string;
  description: string;
  url_photo: string;
  price_formatted: string;
}

interface Props {
  data: ItemMenuCardProps;
}

const ItemMenuCard: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <ItemPhoto
        source={{
          uri: data.url_photo,
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
