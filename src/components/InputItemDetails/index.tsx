import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Title, TextDetailsContainer, TextDetails } from './styles';

interface Props extends RectButtonProps {
  textDetails: string;
  onPress: () => void;
}

const InputItemDetails: React.FC<Props> = ({ textDetails, onPress }) => {
  return (
    <Container>
      <Title>Alguma Observação?</Title>
      <TextDetailsContainer onPress={onPress}>
        <TextDetails>{textDetails}</TextDetails>
      </TextDetailsContainer>
    </Container>
  );
};

export default InputItemDetails;
