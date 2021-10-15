import React, { useCallback } from 'react';

import { useTheme } from 'styled-components/native';
import { StatusBar } from 'react-native';
import Button from '../../components/Button';

import {
  Container,
  Header,
  HideModalButton,
  Icon,
  Title,
  TextInputContainer,
  TextInput,
  Footer,
} from './styles';

interface IMenuDetails {
  textItemDetails: string;
  setMenuItemDetails: (text: string) => void;
  toggleOpenMenuItemDetails: () => void;
}

const MenuItemDetails: React.FC<IMenuDetails> = ({
  textItemDetails,
  setMenuItemDetails,
  toggleOpenMenuItemDetails,
}) => {
  const theme = useTheme();

  const handleSaveInputItemDetails = useCallback(() => {
    toggleOpenMenuItemDetails();
  }, [toggleOpenMenuItemDetails]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.shape} />
      <Container>
        <Header>
          <HideModalButton onPress={toggleOpenMenuItemDetails}>
            <Icon name="keyboard-arrow-down" />
          </HideModalButton>
          <Title>Alguma Observação?</Title>
        </Header>

        <TextInputContainer>
          <TextInput
            placeholder="Ex. Tirar cebola, maionese à parte, ponto da carne etc"
            placeholderTextColor={theme.colors.text}
            multiline
            defaultValue={textItemDetails}
            onChangeText={setMenuItemDetails}
          />
        </TextInputContainer>

        <Footer>
          <Button onPress={handleSaveInputItemDetails}>Salvar</Button>
        </Footer>
      </Container>
    </>
  );
};

export default MenuItemDetails;
