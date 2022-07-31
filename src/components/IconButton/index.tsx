import React from 'react';

import { Container } from './styles';
import { TouchableOpacityProps } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
type IconButtonProps = TouchableOpacityProps & {
  type?: 'primary' | 'secondary';
  iconName: 'chevron-left' | 'search' | 'logout' | 'search';
  size?: number;
};

const IconButton: React.FC<IconButtonProps> = ({
  type = 'primary',
  iconName,
  size = 28,
  ...rest
}) => {
  return (
    <Container type={type} {...rest}>
      <MaterialIcons name={iconName} size={size} color="#FFF" />
    </Container>
  );
};

export default IconButton;
