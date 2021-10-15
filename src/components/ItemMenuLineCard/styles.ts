import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
  flex-direction: row;
  padding: 10px;
  background: ${({ theme }) => theme.colors.shape};
  margin-bottom: 16px;
`;

export const ItemContainer = styled.View`
  flex: 1;
  margin-left: 17px;
`;

export const ItemPhoto = styled.Image`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;

  border-radius: ${RFValue(20)}px;
`;

export const ItemName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(10)}px;
`;
