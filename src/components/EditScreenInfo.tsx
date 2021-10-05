import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import MonoText from './StyledText';

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});

export default function EditScreenInfo({ path }: { path: string }) {
  const handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet',
    );
  };

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>
          Open up the code for this screen:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
        >
          <MonoText>{path}</MonoText>
        </View>

        <Text style={styles.getStartedText}>
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <Text style={styles.helpLinkText}>
            Tap here if your app doesn&apos;t automatically update after making
            changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
