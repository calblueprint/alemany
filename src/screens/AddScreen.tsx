import * as React from 'react';

import { StyleSheet } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';

import { Tree } from '@types';
import ViewContainer from 'components/ViewContainer';
import { addTree } from 'database/firebase';

const styles = StyleSheet.create({
  input: {
    width: '90%',
  },
});
// TODO: research date picker options (drop down, calender view, etc)

export default function AddScreen() {
  const [entry, setEntry] = React.useState<Tree>({
    id: '',
    name: '',
    uuid: '',
    location: null,
    planted: null,
  });

  return (
    <ViewContainer>
      <Title>Create Screen</Title>
      <TextInput
        label="Name"
        value={entry.name}
        onChangeText={name => setEntry({ ...entry, name: name.toString() })}
        style={styles.input}
      />
      <TextInput
        label="ID"
        value={entry.id}
        onChangeText={id => setEntry({ ...entry, id: id.toString() })}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => addTree(entry)}>
        Submit
      </Button>
    </ViewContainer>
  );
}
