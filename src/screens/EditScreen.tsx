import * as React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, Button } from 'react-native';
import { Title, TextInput } from 'react-native-paper';

import { RootStackScreenProps } from '@types';
import ViewContainer from 'components/ViewContainer';

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
// TODO: need to have state for this screen (define setEntry to be able to change name and id)
// want to pass in id itself, in this screen make call to database (getTree) to get tree associated with that ID
// when submit button is clicked, call to firebase that sets tree to new object
// check that tree is updated correctly
// change value props to reflect current state of edit
// cross reference addScreen
export default function EditScreen({
  route,
  navigation,
}: RootStackScreenProps<'Edit'>) {
  // @ts-ignore
  const { name, id } = route.params;
  return (
    <ViewContainer>
      <Title>Edit Screen</Title>
      <TextInput
        label="Name"
        value={name}
        onChangeText={name => setEntry({ ...entry, name: name.toString() })}
        style={styles.input}
      />
      <TextInput
        label="ID"
        value={id}
        onChangeText={id => setEntry({ ...entry, id: id.toString() })}
        style={styles.input}
      />
      <Button title="Submit Tree" onPress={null} />
    </ViewContainer>
  );
}

EditScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
