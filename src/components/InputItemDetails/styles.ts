import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View``;

export const TextDetailsContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  height: ${RFValue(60)}px;
  flex-direction: column;

  border-radius: 5px;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};

  margin-bottom: 5px;
`;

export const TextDetails = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;
