import styled, { css } from 'styled-components/native';

export const Container = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;

export const Placeholder = styled.View`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  border: 1px dashed ${({ theme }) => theme.COLORS.SECONDARY_900};
  justify-content: center;
  align-items: center;
`;

export const PlaceholderText = styled.Text`
  text-align: center;
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
