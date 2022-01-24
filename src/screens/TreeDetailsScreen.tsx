import React, {
  useCallback,
  useLayoutEffect,
  useEffect,
  useState,
} from 'react';

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
  const toggleEditing = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

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
        style={styles.input}
        value={comment.input}
      />

      <Button title="Add Comment" onPress={handleSaveComment} />
    </ViewContainer>
  );
}
