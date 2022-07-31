import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export type TypeProps = 'primary' | 'secondary';

type Props = RectButtonProperties & {
  type: TypeProps;
};

export const Container = styled(RectButton)<Props>`
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 56px;
  min-height: 56px;
  border-radius: 12px;
  padding: 16px;
  background-color: ${({ theme, type }) =>
    type === 'primary' ? theme.COLORS.PRIMARY_900 : theme.COLORS.PRIMARY_800};
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TITLE,
}))``;
