import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';

export const SearchSection = styled.View`
  width: 100%;
  margin-top: -27px;
  flex-direction: row;

  justify-content: center;
  padding: 0 24px;
`;
export const InputArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  border-radius: 12px;
  margin-right: 7px;
  ${({ theme }) => css`
    background-color: ${theme.COLORS.TITLE};
    border: 1px solid ${theme.COLORS.SHAPE};
  `}
`;

export const SearchInput = styled(TextInput)`
  flex: 1;
  height: 52px;
  padding-left: 12px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
`;

export const ButtonClear = styled.TouchableOpacity`
  margin-right: 7px;
  align-self: center;
`;
