import React, {
  useCallback,
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
} from 'react';

import { shape, func, string } from 'prop-types';
import { StyleSheet, Button, Alert } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

import ViewContainer from '../components/ViewContainer';
import {
  getTree,
  setTree,
  addComment,
  saveComment,
} from '../database/firebase';

const styles = StyleSheet.create({
  input: {
    width: '90%',
    marginBottom: 5,
    backgroundColor: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

export default function TreeDetailsScreen({ route, navigation }) {
  const addCommentText = useRef();
  const { uuid } = route.params;
  const [entry, setEntry] = useState({
    id: '',
    name: '',
    uuid: '',
    location: null,
    planted: null,
    comments: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const [comment, setComment] = useState({ uuid: '', input: '' });

  useEffect(() => {
    async function getEntry() {
      const data = await getTree(uuid);
      setEntry(data);
    }
    getEntry();
  }, [uuid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Tree' : 'View Tree',
      headerRight: () => <IconButton icon="pencil" onPress={toggleEditing} />,
    });
  }, [navigation, isEditing, toggleEditing]);

  const handleSaveChanges = () => {
    setTree(entry);
    toggleEditing();
  };

  const handleSaveComment = () => {
    saveComment(comment);
    addComment(comment, entry.uuid);
    Alert.alert(
      null,
      `Comment "${comment.input}" has been saved under ${entry.name}`,
    );
    addCommentText.current.clear();
  };

  return (
    <ViewContainer>
      <TextInput
        disabled={!isEditing}
        label="Name"
        onChangeText={value => setEntry({ ...entry, name: value.toString() })}
        style={styles.input}
        value={entry.name}
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
          setComment({ ...comment, input: value.toString() })
        }
        ref={addCommentText}
        style={styles.input}
        value={comment.input}
      />

      <Button title="Add Comment" onPress={handleSaveComment} />
    </ViewContainer>
  );
}

TreeDetailsScreen.propTypes = {
  navigation: shape({
    setOptions: func,
  }),
  route: shape({
    params: shape({
      uuid: string,
    }),
  }),
};
