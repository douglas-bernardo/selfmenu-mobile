import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(70)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HideModalButton = styled.TouchableOpacity``;

export const Icon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(30)}px;
`;

export const Title = styled.Text`
  width: 90%;

  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.medium};

  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const TextInputContainer = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 20px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Footer = styled.View`
  position: absolute;
  width: 100%;
  padding: 20px;
  bottom: ${RFValue(10)}px;
`;
