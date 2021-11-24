import React from 'react';

import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from 'hooks/useCachedResources';
import useTheme from 'hooks/useTheme';
import Navigation from 'navigation/index';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const theme = useTheme();

  if (!isLoadingComplete) {
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
