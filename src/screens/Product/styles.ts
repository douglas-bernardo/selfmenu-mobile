import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;

  background: ${({ theme }) => theme.colors.background};
  margin-bottom: ${RFValue(20)}px;
`;

export const ItemWrapper = styled.View`
  position: relative;
  width: 100%;

  flex-direction: column;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  width: ${RFValue(36)}px;
  height: ${RFValue(36)}px;

  margin-top: ${getStatusBarHeight() + RFValue(20)}px;
  margin-left: ${RFValue(17)}px;

  background: ${({ theme }) => theme.colors.shape};
  border-radius: ${RFValue(18)}px;
  justify-content: center;
  align-items: center;

  z-index: 2;
`;

export const BackButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(25)}px;
`;

export const ItemPhoto = styled.Image`
  width: 100%;
  height: 100%;
`;

export const DarkenCoverImg = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  /* justify-content: center;
  align-items: center; */
  z-index: 1;
`;

export const ItemInfoContainer = styled.View`
  width: 100%;
  padding: 0 24px;
`;

export const ItemContainer = styled.View`
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  padding: 8px 0;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
`;

export const Description = styled.View``;

export const DescriptionText = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(14)}px;
`;

export const Footer = styled.View`
  padding: 10px 0;
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

export const AddItemToOrderContainer = styled.View`
  width: 100%;
  position: absolute;
  padding: 0 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  bottom: ${RFValue(10)}px;
`;

export const AddControl = styled.View`
  flex: 1;
  height: 60px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`;

export const RemoveItemButton = styled.TouchableOpacity``;

export const RemoveItemIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(32)}px;
`;

export const TotalItemsText = styled.Text`
  padding: 10px;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const AddItemButton = styled.TouchableOpacity``;

export const AddItemIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(32)}px;
`;

export const AddItemOrderButton = styled(RectButton)`
  padding: 0 15px;
  width: 65%;
  height: 60px;
  background: ${({ theme }) => theme.colors.attention};
  border-radius: 7px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AddItemOrderButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: 16px;
`;

export const ValueOrderTotalText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: 16px;
`;
