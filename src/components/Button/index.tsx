import React from 'react';
import {
  GestureHandlerRootView,
  RectButtonProperties,
} from 'react-native-gesture-handler';
import { Container, Loading, Title, TypeProps } from './styles';

type ButtonProps = RectButtonProperties & {
  type?: TypeProps;
  title: string;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  title,
  isLoading = false,
  ...rest
}) => {
  return (
    <GestureHandlerRootView>
      <Container type={type} enabled={!isLoading} {...rest}>
        {isLoading ? <Loading /> : <Title>{title}</Title>}
      </Container>
    </GestureHandlerRootView>
  );
};

export default Button;
