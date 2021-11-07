import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
  flex-direction: row;
  padding: 10px;
  background: ${({ theme }) => theme.colors.background};
  margin-bottom: 10px;

  border-radius: 5px;
`;

export const ItemContainer = styled.View`
  flex: 1;
  /* margin-left: 17px; */
`;

export const ItemName = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`;

export const TotalItemValue = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(12)}px;
`;

export const ItemDetails = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(10)}px;
`;

export const ItemPhoto = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;

  border-radius: 5px;
`;

export const ItemQuantityBadge = styled.View`
  position: absolute;
  bottom: 13px;
  right: 13px;

  background: ${({ theme }) => theme.colors.attention};
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  border-radius: ${RFValue(10)}px;

  justify-content: center;
  align-items: center;
  padding: 3px;
`;

export const ItemQuantityBadgeText = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(10)}px;
  text-align: center;
`;
