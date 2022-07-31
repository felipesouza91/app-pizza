import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  align-items: center;
  padding: ${getStatusBarHeight() + 33}px 0 32px;
`;

export const Title = styled.Text`
  font-size: 24px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const BottomSeparator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const RightSeparator = styled.View`
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.COLORS.SHAPE};
`;
