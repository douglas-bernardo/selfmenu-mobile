import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  flex-direction: row;
  border-radius: 8px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.background};
  margin-bottom: 16px;
`;

export const ItemContainer = styled.View`
  flex: 1;
  margin-left: 17px;
`;

export const ItemPhoto = styled.Image`
  width: ${RFValue(90)}px;
  height: ${RFValue(90)}px;

  border-radius: 8px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Description = styled.View``;

export const DescriptionText = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Rate = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
`;
