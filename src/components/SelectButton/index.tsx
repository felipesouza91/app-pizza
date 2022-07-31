import React from 'react';
import { Container, Label, Check, CheckInside } from './styles';
import { TouchableOpacityProps } from 'react-native';

type SelectButtonProps = TouchableOpacityProps & {
  title: string;
  isChecked?: boolean;
};

const SelectButton: React.FC<SelectButtonProps> = ({
  title,
  isChecked = false,
  ...rest
}) => {
  return (
    <Container isChecked={isChecked} {...rest}>
      <Check isChecked={isChecked}>{isChecked && <CheckInside />}</Check>
      <Label>{title}</Label>
    </Container>
  );
};

export default SelectButton;
