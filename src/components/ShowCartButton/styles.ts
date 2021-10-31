import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  position: absolute;
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.attention};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 24px;
  bottom: 0;
`;

export const ButtonCartItemsBadge = styled.View`
  background: ${({ theme }) => theme.colors.background};
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
  border-radius: ${RFValue(12)}px;

  justify-content: center;
  align-items: center;
  padding: 2px;
`;

export const ButtonCartItemsBadgeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(12)}px;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: 16px;
`;

export const TotalCartValueText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: 16px;
`;
