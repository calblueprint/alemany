import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';

import ViewContainer from 'components/ViewContainer';
import { setTree } from 'database/firebase';

import { Tree } from '@types';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
  input: {
    width: '100%',
  },
});

export default function AddScreen() {
  const [entry, setEntry] = React.useState<Tree>({
    id: '',
    name: '',
    location: null,
    planted: null,
  });

  return (
    <ViewContainer>
      <Title>Create Screen</Title>
      <View style={styles.separator} />
      <TextInput
        label="Name"
        value={entry.name}
        onChangeText={name => setEntry({ ...entry, name })}
      />
      <TextInput
        label="ID"
        value={entry.id}
        onChangeText={id => setEntry({ ...entry, id })}
      />
      <Button mode="contained" onPress={() => setTree(entry)}>
        Submit
      </Button>
    </ViewContainer>
  );
}
