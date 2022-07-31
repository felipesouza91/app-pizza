import styled, { css } from 'styled-components/native';

type ColorProps = {
  color: string;
};

type NotificationProps = ColorProps & {
  notification: string | undefined;
};

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text<ColorProps>`
  color: ${({ color }) => color};
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  font-size: 18px;
`;
export const NotificationContainer = styled.View<NotificationProps>`
  margin-left: 9px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  ${({ theme, color, notification }) =>
    notification !== '0'
      ? css`
          border: none;
          background-color: ${theme.COLORS.SUCCESS_900};
        `
      : css`
          border: 1px solid ${color};
          background-color: transparent;
        `}
`;
export const NotificationText = styled.Text<NotificationProps>`
  color: ${({ theme, color, notification }) =>
    notification !== '0' ? theme.COLORS.TITLE : color};
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  font-size: 12px;
`;
