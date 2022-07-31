import React from 'react';
import { InputContainer, TypeProps } from './styles';
import { TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  type?: TypeProps;
};

const Input: React.FC<InputProps> = ({ type = 'primary', ...rest }) => {
  return <InputContainer type={type} {...rest} />;
};

export default Input;
