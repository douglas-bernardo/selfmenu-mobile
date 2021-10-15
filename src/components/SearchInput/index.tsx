import React, { useRef, useEffect } from 'react';

import { TextInput, TextInputProps } from 'react-native';

import { Container, InputSearch, InputSearchIcon } from './styles';

const SearchInput: React.FC<TextInputProps> = ({ ...rest }) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  return (
    <Container>
      <InputSearchIcon name="search" />
      <InputSearch ref={inputRef} {...rest} />
    </Container>
  );
};

export default SearchInput;
