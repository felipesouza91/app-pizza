import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  height: 56px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.SHAPE};
  margin-bottom: 8px;
`;

export const TextContainer = styled.View`
  height: 56px;
  width: 56px;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const Label = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const PriceInput = styled(TextInput)`
  margin-left: 4px;
  flex: 1px;
`;
