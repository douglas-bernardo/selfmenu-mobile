import React from 'react';

import { TouchableWithoutFeedback } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProps {
  children: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onPress, ...rest }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  </TouchableWithoutFeedback>
);

export default Button;
