import styled, { css } from 'styled-components/native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ContaionerProps = TouchableOpacityProps & {
  type: 'primary' | 'secondary';
};

export const Container = styled(TouchableOpacity)<ContaionerProps>`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  ${({ theme, type }) =>
    type === 'primary'
      ? css`
          background-color: ${theme.COLORS.SUCCESS_900};
          border: none;
        `
      : css`
          background-color: transparent;
          border: 1px solid ${theme.COLORS.PRIMARY_100};
        `}
`;
