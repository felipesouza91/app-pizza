import styled, { css } from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

type CheckProps = {
  isChecked: boolean;
};
type ContainerProps = TouchableOpacityProps & CheckProps;

export const Container = styled.TouchableOpacity<ContainerProps>`
  flex: 1;
  height: 82px;
  padding: 14px 16px;
  border-radius: 8px;
  ${({ theme, isChecked }) => css`
    background-color: ${isChecked
      ? theme.COLORS.SUCCESS_50
      : theme.COLORS.TITLE};
    border: 1px solid
      ${isChecked ? theme.COLORS.SUCCESS_900 : theme.COLORS.SHAPE};
  `}

  justify-content: space-between;
`;

export const Check = styled.View<CheckProps>`
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 2px solid
    ${({ theme, isChecked }) =>
      isChecked ? theme.COLORS.SUCCESS_900 : theme.COLORS.SECONDARY_900};
`;

export const CheckInside = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;

export const Label = styled.Text`
  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
