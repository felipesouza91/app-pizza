import styled, { css } from 'styled-components/native';

type ContainerProps = {
  status: 'Entregue' | 'Preparando' | 'Pronto';
};

export const Container = styled.TouchableOpacity`
  padding: 24px 40px;
  justify-content: center;
  align-items: center;
`;

export const Photo = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;
  margin-bottom: 21px;
`;

export const Title = styled.Text`
  font-size: 20px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
  margin-bottom: 11px;
`;

export const Info = styled.Text`
  font-size: 16px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_500};
  `}
  margin-bottom: 16px;
`;

export const StatusContainer = styled.View<ContainerProps>`
  padding: 6px 16px;
  background-color: red;
  border-radius: 12px;
  background-color: ${({ theme, status }) =>
    status === 'Entregue'
      ? theme.COLORS.SECONDARY_900
      : status === 'Preparando'
      ? theme.COLORS.ALERT_50
      : theme.COLORS.SUCCESS_900};
  ${({ theme, status }) =>
    status === 'Preparando'
      ? css`
          border: 1px solid ${theme.COLORS.ALERT_900};
        `
      : css`
          border: none;
        `};
`;

export const Status = styled.Text<ContainerProps>`
  font-size: 12px;
  ${({ theme, status }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${status === 'Preparando'
      ? theme.COLORS.ALERT_900
      : theme.COLORS.TITLE};
  `}
`;
