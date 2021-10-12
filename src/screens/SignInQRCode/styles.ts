import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 18px;
  padding: 32px;
  color: #777;
  text-align: center;
`;

export const SignInButton = styled.TouchableOpacity`
  padding: 16px;
`;

export const SignInButtonText = styled.Text`
  font-size: 21px;
  color: 'rgb(0,122,255)';
`;
