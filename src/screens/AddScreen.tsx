import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

import EditScreenInfo from 'components/EditScreenInfo';
import ViewContainer from 'components/ViewContainer';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

export default function AddScreen() {
  return (
    <ViewContainer>
      <Title>Create Screen</Title>
      <View style={styles.separator} />
      <EditScreenInfo path="/screens/AddScreen.tsx" />
    </ViewContainer>
  );
}
