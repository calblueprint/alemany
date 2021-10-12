import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import useCachedResources from 'hooks/useCachedResources';
import useTheme from 'hooks/useTheme';
import Navigation from 'navigation/index';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const theme = useTheme();

  const handleUrl = (event: { url: string }) => {
    const { path, queryParams } = Linking.parse(event.url);
    alert(
      `Linked to app with path: ${path} and data: ${JSON.stringify(
        queryParams,
      )}`,
    );
  };

  Linking.addEventListener('url', handleUrl);

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
