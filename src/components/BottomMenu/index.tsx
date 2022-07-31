import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import firebase from '@react-native-firebase/firestore';
import {
  Container,
  NotificationContainer,
  Title,
  NotificationText,
} from './styles';

type BottomMenuProps = {
  color: string;
  title: string;
  notification: string | undefined;
};

const BottomMenu: React.FC<BottomMenuProps> = ({
  color,
  notification,
  title,
}) => {
  return (
    <Container>
      <Title color={color}>{title}</Title>
      {notification && (
        <NotificationContainer notification={notification} color={color}>
          <NotificationText notification={notification} color={color}>
            {notification}
          </NotificationText>
        </NotificationContainer>
      )}
    </Container>
  );
};

export default BottomMenu;
