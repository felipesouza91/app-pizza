import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { useAuth } from '../hooks/auth';
import Signin from '../screens/Signin';
import UserStackRouter from './user.stack.routes';

const Routers: React.FC = () => {
  const { user } = useAuth();
  if (!user) {
    return <Signin />;
  }
  return (
    <NavigationContainer>
      <UserStackRouter />
    </NavigationContainer>
  );
};

export default Routers;
