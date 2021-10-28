import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, Button } from 'react-native';
import { Title, TextInput } from 'react-native-paper';

import { RootStackScreenProps, Tree } from '@types';
import ViewContainer from 'components/ViewContainer';
import { getTree, checkID, setTree } from 'src/database/firebase';

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

export default function EditScreen({
  route,
  navigation,
}: RootStackScreenProps<'Edit'>) {
  // @ts-ignore
  const { uuid } = route.params;
  const [entry, setEntry] = useState<Tree>({
    id: '',
    name: '',
    uuid: '',
    location: null,
    planted: null,
  });
  useEffect(() => {
    async function getEntry() {
      const data = await getTree(uuid);
      setEntry(data);
    }
    getEntry();
  }, [uuid]);
  const onPress = () => {
    setTree(entry);
    navigation.goBack();
  };

  return (
    <ViewContainer>
      <Title>Edit Screen</Title>
      <TextInput
        label="Name"
        value={entry.name}
        onChangeText={value => setEntry({ ...entry, name: value.toString() })}
        style={styles.input}
      />
      <TextInput
        label="ID"
        value={entry.id}
        onChangeText={value => setEntry({ ...entry, id: value.toString() })}
        style={styles.input}
      />
      <Button title="Submit Tree" onPress={onPress} />
    </ViewContainer>
  );
}

EditScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
