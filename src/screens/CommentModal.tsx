import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Button } from 'react-native';
import { Title, TextInput } from 'react-native-paper';

import EditScreenInfo from 'components/EditScreenInfo';
import ViewContainer from 'src/components/ViewContainer';

const styles = StyleSheet.create({
  input: {
    width: '90%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

export default function ModalScreen() {
  return (
    <ViewContainer>
      <Title>Add Comment</Title>
      <View style={styles.separator} />
      <TextInput label="Comment" style={styles.input} />
      <Button title="Submit" />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ViewContainer>
  );
}
