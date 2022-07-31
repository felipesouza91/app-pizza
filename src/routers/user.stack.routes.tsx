import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Product from '../screens/Product';
import { useAuth } from '../hooks/auth';
import UserTabRouter from './user.tab.routes';
import Order from '../screens/Order';

const { Navigator, Screen, Group } = createStackNavigator();

const UserStackRouter: React.FC = () => {
  const { user } = useAuth();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user?.isAdmin ? (
        <Group>
          <Screen name="Home" component={Home} />
          <Screen name="Product" component={Product} />
        </Group>
      ) : (
        <Group>
          <Screen name="UserTabRouter" component={UserTabRouter} />
          <Screen name="Order" component={Order} />
        </Group>
      )}
    </Navigator>
  );
};

export default UserStackRouter;
