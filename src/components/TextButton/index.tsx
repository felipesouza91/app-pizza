import React from 'react';

import { Container, Title } from './styles';
import { TouchableOpacityProps } from 'react-native';

type TextButtonProps = TouchableOpacityProps & {
  title: string;
};

const TextButton: React.FC<TextButtonProps> = ({ title, ...rest }) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export default TextButton;
