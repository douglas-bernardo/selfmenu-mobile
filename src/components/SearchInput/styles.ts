import styled from 'styled-components/native';

import { TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  height: 50px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 25px;
  background: ${({ theme }) => theme.colors.background};
`;

export const InputSearch = styled(TextInput)`
  flex: 1;
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};

  padding: 10px 10px 10px 0;
`;

export const InputSearchIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(25)}px;
  padding: 10px;
`;
