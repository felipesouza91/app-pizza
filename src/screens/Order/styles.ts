import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Button from './../../components/Button/index';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  padding: ${getStatusBarHeight() + 33}px 24px 0;
`;

export const Image = styled.Image`
  align-self: center;
  position: relative;
  top: -120px;
  width: 240px;
  height: 240px;
  border-radius: 120px;
`;

export const Form = styled.View`
  margin-top: -126px;
  padding: 0 24px;
`;

export const Title = styled.Text`
  align-self: center;
  margin-top: 24px;
  font-size: 32px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
export const SelectionSection = styled.View`
  margin-top: 40px;
  width: 100%;
`;

export const SelectionSectionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const InputSection = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
export const InputGroup = styled.View`
  flex: 1;
`;
export const Label = styled.Text`
  margin-bottom: 16px;
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
export const Total = styled.Text`
  align-self: flex-end;
  margin: 14px 0 24px 0;
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const ConfirmationButtonContainer = styled.View`
  width: 100%;
`;

export const ConfirmationButton = styled(Button)`
  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;
