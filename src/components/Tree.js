/* eslint-disable operator-linebreak */
import 'react-native-get-random-values';
import React, { useState, useLayoutEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { isPointInPolygon } from 'geolib';
import { func, string } from 'prop-types';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { v4 as uuidv4 } from 'uuid';

import { FEATURE_POLYGONS } from '../constants/Features';
import { addComment, getTree, uploadImageAsync } from '../database/firebase';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import Inset from './Inset';
import Button from './ui/Button';
import { color } from './ui/colors';

const IMAGE_ASPECT_RATIO = [4, 3];
const IMAGE_ASPECT_RATIO_FLOAT = IMAGE_ASPECT_RATIO[0] / IMAGE_ASPECT_RATIO[1];

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: color('gray.200'),
  },
  toolbarText: {
    color: color('blue.500'),
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  locationText: {
    display: 'flex',
    flexDirection: 'row',
  },
  nameInput: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingLeft: 16,
    fontSize: 34,
    fontWeight: '800',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: IMAGE_ASPECT_RATIO_FLOAT,
    marginBottom: 20,
    maxHeight: 700,
  },
  imagePlaceholder: {
    width: '100%',
    height: undefined,
    aspectRatio: IMAGE_ASPECT_RATIO_FLOAT,
    backgroundColor: color('gray.300'),
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    color: color('gray.500'),
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 15,
    fontSize: 16,
  },
  heading: {
    marginTop: 30,
    fontSize: 20,
  },
});

async function pickImage() {
  // No permissions request is necessary for launching the image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: IMAGE_ASPECT_RATIO,
    quality: 0.05,
  });

  if (!result.cancelled) {
    const { uri } = result;
    return uploadImageAsync(uri);
  }
  return null;
}

export default function Tree({ uuid = null, onSave, onDelete = () => {} }) {
  const getCurrentLocation = useCurrentLocation();
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [planted, setPlanted] = useState(null);
  const [comments, setComments] = useState([]);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [editing, setEditing] = useState(uuid === null);
  const [commentText, setCommentText] = useState('');
  const canEdit = uuid !== null;

  useLayoutEffect(() => {
    async function fetchData() {
      const tree = await getTree(uuid);

      setName(tree.name);
      setPlanted(tree.planted?.toDate());
      setID(tree.id);
      setComments(tree.comments);
      setImages(tree.images);
      setLocation(tree.location);
      setComments(tree.comments);
    }
    if (uuid) {
      fetchData();
    }
  }, [uuid]);

  const handleSave = async () => {
    let region = null;
    Object.entries(FEATURE_POLYGONS).forEach(([key, value]) => {
      if (isPointInPolygon(location, value)) {
        region = key;
      }
    });

    const tree = {
      uuid,
      id,
      name,
      location,
      planted,
      comments,
      region,
      images,
    };

    if (editing && canEdit) {
      setEditing(false);
    }
    if (!canEdit) {
      setLocation(null);
      setName('');
      setID('');
      setPlanted(null);
      setComments([]);
      setImages([]);
    }

    onSave(tree);
  };

  const handleDelete = async () => {
    Alert.alert('Are you sure?', 'This tree will be deleted.', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: onDelete,
        style: 'destructive',
      },
    ]);
  };

  const handleSaveComment = async () => {
    if (commentText) {
      const comment = {
        uuid: uuidv4(),
        input: commentText,
      };
      await addComment(comment, uuid);
      setComments([...comments, comment]);
      setCommentText('');
    }
  };

  return (
    <ScrollView>
      {canEdit && (
        <Pressable
          onPress={() => {
            if (editing) {
              handleSave();
            } else {
              setEditing(true);
            }
          }}
          style={styles.toolbar}
        >
          <Inset>
            <Text style={styles.toolbarText}>{editing ? 'Save' : 'Edit'}</Text>
          </Inset>
        </Pressable>
      )}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={newValue => setName(newValue)}
        style={styles.nameInput}
        editable={editing}
      />
      <Pressable
        onPress={async () => {
          if (editing) {
            const uri = await pickImage();
            if (uri) {
              setImages([uri]);
            }
          }
        }}
      >
        {images?.length ? (
          <Image style={styles.image} source={{ uri: images[0] }} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>
              {editing
                ? 'Press to add image...'
                : 'Press edit to add an image.'}
            </Text>
          </View>
        )}
      </Pressable>
      <Inset>
        {location && !location.latitude && (
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <ActivityIndicator />
            <Text style={{ marginLeft: 5 }}>Fetching your location...</Text>
          </View>
        )}
        {location && location.latitude && (
          <>
            <Text>
              Latitude:&nbsp;
              {location.latitude}
            </Text>
            <Text style={{ marginTop: 2 }}>
              Longitude:&nbsp;
              {location.longitude}
            </Text>
          </>
        )}
        {editing && (
          <Pressable
            onPress={async () => {
              if (location) {
                setLocation(null);
                return;
              }
              setLocation({
                latitude: null,
                longitude: null,
              });
              const currentLocation = await getCurrentLocation();
              setLocation(currentLocation);
            }}
            style={{
              backgroundColor: '#fff',
              padding: 14,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: '500' }}>
              {location ? 'Remove ' : 'Tag with current '}
              location
            </Text>
          </Pressable>
        )}
        <TextInput
          placeholder="Address"
          value={id}
          onChangeText={newValue => setID(newValue)}
          style={styles.input}
          editable={editing}
        />
        <Pressable
          style={styles.input}
          onPress={() => editing && setDatePickerVisible(true)}
        >
          <Text style={{ fontSize: 16 }}>
            {planted?.toLocaleDateString() || 'Date planted'}
          </Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={date => {
            setPlanted(date);
            setDatePickerVisible(false);
          }}
          onCancel={() => setDatePickerVisible(false)}
        />
        {canEdit && !editing && (
          <>
            <Text style={styles.heading}>Comments</Text>
            {comments?.map((c, i) => (
              <Text
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                editable={false}
                style={styles.input}
              >
                {c.input}
              </Text>
            ))}
            <TextInput
              placeholder="Add Comment"
              onChangeText={newValue => setCommentText(newValue)}
              style={styles.input}
              value={commentText}
            />
            <Button title="Add Comment" onPress={handleSaveComment} />
          </>
        )}
        <View style={{ paddingVertical: 10 }}>
          <Button
            backgroundColor={canEdit ? color('rose.500') : '#52bd41'}
            color="#fff"
            title={canEdit ? 'Delete' : 'Save'}
            onPress={canEdit ? handleDelete : handleSave}
          />
        </View>
      </Inset>
    </ScrollView>
  );
}

Tree.propTypes = {
  onSave: func,
  onDelete: func,
  uuid: string,
};
