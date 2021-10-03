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
        value={tree.name}
        onChangeText={name => setTree({ ...tree, name })}
      />
      <TextInput
        label="ID"
        value={tree.id}
        onChangeText={id => setTree({ ...tree, id })}
      />
      <Button mode="contained" onPress={() => writeTree(tree)}>
        Submit
      </Button>
    </ViewContainer>
  );
}
