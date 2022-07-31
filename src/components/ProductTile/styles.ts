import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const ProductImage = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;
  margin-right: 20px;
`;

export const ProductInfo = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProductTitles = styled.View`
  justify-content: flex-end;
`;

export const ProductName = styled.Text`
  font-size: 20px;
  margin-bottom: 8px;
  line-height: 20px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
export const ProductDescription = styled.Text`
  font-size: 12px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_500};
  `}
`;

export const Line = styled.View`
  align-self: flex-end;
  margin: 12px 0;
  height: 1px;
  width: 65%;
  background-color: ${({ theme }) => theme.COLORS.SHAPE}; ;
`;
