import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';

import EditScreenInfo from 'components/EditScreenInfo';
import ViewContainer from 'components/ViewContainer';
import { writeTree } from 'database/firebase';

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
  const [tree, setTree] = React.useState<Tree>({
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
        style={styles.input}
        value={tree.name}
        onChangeText={name => setTree({ ...tree, name })}
      />
      <TextInput
        label="ID"
        style={styles.input}
        value={tree.id}
        onChangeText={id => setTree({ ...tree, id })}
      />
      <Button
        mode="contained"
        onPress={() => writeTree(tree)}
        style={styles.input}
      >
        Submit
      </Button>
    </ViewContainer>
  );
}
