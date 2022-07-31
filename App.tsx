import 'react-native-gesture-handler';

import React from 'react';

import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { ThemeProvider } from 'styled-components';
import { Inter_500Medium } from '@expo-google-fonts/inter';

import theme from './src/theme';

import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/hooks/auth';
import Routers from './src/routers';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </ThemeProvider>
  );
}
