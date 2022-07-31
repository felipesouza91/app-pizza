import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';

import Orders from '../screens/Orders/index';
import Home from '../screens/Home/index';
import BottomMenu from '../components/BottomMenu';

const { Navigator, Screen } = createBottomTabNavigator();

const UserTabRouter: React.FC = () => {
  const [notifications, setNotifications] = useState('0');
  const theme = useTheme();

  useEffect(() => {
    const subscribe = firestore()
      .collection('orders')
      .where('status', '==', 1)
      .onSnapshot((snapshot) => {
        setNotifications(String(snapshot.docs.length));
      });
    return () => subscribe();
  }, []);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 72 },
        tabBarIconStyle: { display: 'none' },
        tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
        tabBarActiveTintColor: theme.COLORS.SECONDARY_900,
        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontFamily: theme.FONTS.TITLE,

          fontSize: 18,
        },
        tabBarIcon: undefined,
      }}
    >
      <Screen name="Cardápio" component={Home} />
      <Screen
        name="Pedidos"
        component={Orders}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            fontSize: 10,
          },
          tabBarLabel: ({ color, focused, position }) => {
            return (
              <BottomMenu
                title="Pedidos"
                notification={notifications}
                color={color}
              />
            );
          },
        }}
      />
    </Navigator>
  );
};

export default UserTabRouter;
