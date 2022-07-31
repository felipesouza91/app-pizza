import styled, { css } from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import Input from 'src/components/Input';
export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${getStatusBarHeight() + 33}px 20px 24px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  width: 100%;
  padding: 0 32px;
`;

export const PhotoSection = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 32px 0;
`;

export const FormField = styled.View`
  width: 100%;
`;

export const FormLabel = styled.Text`
  margin-bottom: 12px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const TextArea = styled(Input)`
  height: 80px;
`;

export const FormFieldHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;
export const FormFieldHeaderTitle = styled.Text`
  font-size: 10px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;
