import React from 'react';

import { Container, TextContainer, Label, PriceInput } from './styles';
import { TextInputProps } from 'react-native';

type IInputPriceProps = TextInputProps & {
  size: string;
};

const InputPrice: React.FC<IInputPriceProps> = ({ size, ...rest }) => {
  return (
    <Container>
      <TextContainer>
        <Label>{size}</Label>
      </TextContainer>
      <Label>R$</Label>
      <PriceInput keyboardType="numeric" {...rest} />
    </Container>
  );
};

export default InputPrice;
