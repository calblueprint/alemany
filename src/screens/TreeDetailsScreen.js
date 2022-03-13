import React, {
  useCallback,
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
} from 'react';

import { shape, func, string } from 'prop-types';
import { StyleSheet, Button } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

import ViewContainer from '../components/ViewContainer';
import { getTree, setTree, addComment } from '../database/firebase';

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
    location: { latitude: '', longitude: '' },
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
    if (comment) {
      addComment(comment, entry.uuid);
      setEntry({ ...entry, comments: [...entry.comments, comment] });
      addCommentText.current.clear();
      setComment('');
    }
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
      <TextInput
        disabled={!isEditing}
        label="Latitude"
        onChangeText={
          value =>
            setEntry({
              ...entry,
              location: { ...entry.location, latitude: Number(value) },
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        style={styles.input}
        value={entry.location.latitude.toString()}
      />
      <TextInput
        disabled={!isEditing}
        label="Longitude"
        onChangeText={
          value =>
            setEntry({
              ...entry,
              location: { ...entry.location, longitude: Number(value) },
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        style={styles.input}
        value={entry.location.longitude.toString()}
      />
      <TextInput
        disabled={!isEditing}
        label="Date Planted"
        style={styles.input}
        // eslint-disable-next-line react/jsx-no-bind
        value={entry.planted && entry.planted.toDate().toLocaleDateString()}
      />
      {isEditing && <Button title="Save Changes" onPress={handleSaveChanges} />}
      {entry.comments?.map((c, i) => (
        <TextInput
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          disabled="true"
          label="Comment"
          style={styles.input}
          value={c.input}
        />
      ))}
      <TextInput
        label="Add Comment"
        onChangeText={
          value => setComment({ ...comment, input: value.toString() })
          // eslint-disable-next-line react/jsx-curly-newline
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
