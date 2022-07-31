import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { IProductData } from 'src/components/ProductTile';

export type IProduct = {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${getStatusBarHeight() + 33}px 20px 55px;
`;
export const Greeating = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GreeatingImage = styled.Image`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

export const GreeatingText = styled.Text`
  font-size: 20px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const HomeTitle = styled.View`
  justify-content: space-between;
  flex-direction: row;

  margin: 25px 24px 22px 27px;
  border-bottom-width: 1px;
  padding-bottom: 22px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE}; ;
`;
export const Title = styled.Text`
  font-size: 20px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
export const Quantity = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const ProductList = styled(
  FlatList as new () => FlatList<IProductData>
).attrs(({ theme }) => ({
  contentContainerStyle: { paddingHorizontal: 24, paddingBottom: 30 },
  showVerticalScroolIndicator: false,
}))``;

export const Footer = styled.View`
  margin: 8px 24px;
`;
