import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useTheme from './src/hooks/useTheme';
import Navigation from './src/navigation/index';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const theme = useTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Navigation />
        <StatusBar />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
