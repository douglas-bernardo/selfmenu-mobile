import styled from 'styled-components/native';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
  margin-bottom: 10px;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(20)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const HeaderTopInfo = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(10)}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const GoBackButton = styled.TouchableOpacity``;

export const HideModalButtonIcon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(32)}px;
`;

export const HeaderTitle = styled.Text`
  width: 90%;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;

  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const EstablishmentInfo = styled.View`
  position: absolute;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  padding: 0 24px;
  bottom: 20px;
`;

export const WaiterName = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const TableNumberText = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const SecurityContainer = styled.View`
  padding: 24px;
`;

export const CartItemsListHeader = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.medium};

  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.View`
  flex: 1;
  padding: 0 24px;
`;

export const Footer = styled.View`
  position: absolute;

  width: 100%;
  padding: 0 24px;

  bottom: ${RFValue(20)}px;
`;
