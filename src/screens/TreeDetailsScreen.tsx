import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, Button } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

import { RootStackScreenProps, Tree, Comment } from '@types';
import ViewContainer from 'components/ViewContainer';
import {
  getTree,
  setTree,
  addComment,
  saveComment,
} from 'src/database/firebase';

const styles = StyleSheet.create({
  input: {
    width: '90%',
    marginBottom: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

export default function TreeDetailsScreen({
  route,
  navigation,
}: RootStackScreenProps<'TreeDetails'>) {
  // @ts-ignore
  const { uuid } = route.params;
  const [entry, setEntry] = useState<Tree>({
    id: '',
    name: '',
    uuid: '',
    location: null,
    planted: null,
    comments: [],
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [comment, setComment] = useState<Comment>({
    uuid: '',
    input: '',
  });

  useEffect(() => {
    async function getEntry() {
      const data = await getTree(uuid);
      setEntry(data);
    }
    getEntry();
  }, [uuid]);

  const toggleEditing = () => {
    if (isEditing) {
      setIsEditing(false);
      navigation.setOptions({
        title: 'View Tree',
      });
    } else {
      setIsEditing(true);
      navigation.setOptions({
        title: 'Edit Tree',
      });
    }
  };

  const handleSaveChanges = () => {
    setTree(entry);
    toggleEditing();
  };

  const handleSaveComment = () => {
    saveComment(comment);
    addComment(comment, entry.uuid);
  };

  navigation.setOptions({
    headerRight: () => <IconButton icon="pencil" onPress={toggleEditing} />,
  });

  return (
    <ViewContainer>
      <TextInput
        disabled={!isEditing}
        label="Name"
        onChangeText={value => setEntry({ ...entry, name: value.toString() })}
        style={styles.input}
        value={entry.name ?? ''}
      />
      <TextInput
        disabled={!isEditing}
        label="ID"
        onChangeText={value => setEntry({ ...entry, id: value.toString() })}
        style={styles.input}
        value={entry.id}
      />
      {isEditing && <Button title="Save Changes" onPress={handleSaveChanges} />}

      <TextInput
        label="Add Comment"
        onChangeText={value =>
          setComment({ ...comment, input: value.toString() })}
        style={styles.input}
        value={comment.input}
      />

      <Button title="Add Comment" onPress={handleSaveComment} />
    </ViewContainer>
  );
}

TreeDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};
