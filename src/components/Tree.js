/* eslint-disable operator-linebreak */
import 'react-native-get-random-values';
import React, { useState, useLayoutEffect } from 'react';

import { formatRelative } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import * as MapLocation from 'expo-location';
import { isPointInPolygon } from 'geolib';
import { func, string } from 'prop-types';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { v4 as uuidv4 } from 'uuid';

import { FEATURE_POLYGONS } from '../constants/Features';
import {
  addComment,
  deleteComment,
  getTree,
  uploadImageAsync,
} from '../database/firebase';
import { Comment as CommentPropType } from '../prop-types';
import Icon from './Icon';
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
  nameInput: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 18,
    paddingBottom: 10,
    paddingLeft: 16,
    fontSize: 34,
    fontWeight: '800',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: IMAGE_ASPECT_RATIO_FLOAT,
    maxHeight: 700,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: undefined,
    aspectRatio: IMAGE_ASPECT_RATIO_FLOAT,
    backgroundColor: color('gray.300'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    color: color('gray.500'),
    fontSize: 18,
    fontWeight: '600',
  },
  heading: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: '500',
  },
});

async function takePicture() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (permission.granted) {
    const result = await ImagePicker.launchCameraAsync({
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
  return Alert.alert(
    'Cannot access camera',
    'Please grant permissions to use the camera in your phone settings.',
  );
}

async function pickImage() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permission.granted) {
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
  return Alert.alert(
    'Cannot access camera',
    'Please grant permissions to use the camera in your phone settings.',
  );
}

function getImage() {
  return new Promise(resolve => {
    Alert.alert(
      'Add an image',
      'Choose where to get the image from',
      [
        {
          text: 'Take photo',
          onPress: () => takePicture().then(resolve),
        },
        {
          text: 'Choose from gallery',
          onPress: () => pickImage().then(resolve),
        },
        {
          text: 'Cancel',
          onPress: () => resolve(null),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  });
}

function Comment({ comment, onDelete }) {
  return (
    <View style={{ flexDirection: 'row', marginTop: 20 }}>
      <View
        style={{
          marginRight: 10,
          height: 50,
          width: 50,
          backgroundColor: color('gray.200'),
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="chatbubble-outline" />
      </View>
      <View>
        <Text
          style={{
            marginTop: 7,
            marginBottom: 5,
          }}
        >
          {comment.input}
        </Text>
        <Pressable
          onPress={() => {
            Alert.alert('Are you sure?', 'This comment will be deleted.', [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: () => onDelete(comment),
                style: 'destructive',
              },
            ]);
          }}
        >
          <Text
            style={{
              color: color('gray.500'),
              fontWeight: '500',
              fontSize: 14,
            }}
          >
            Delete
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
Comment.propTypes = {
  comment: CommentPropType,
  onDelete: func,
};

async function getCurrentLocation() {
  const { status } = await MapLocation.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return Alert.alert(
      'Cannot access location',
      'Please grant permissions to use the location in your phone settings.',
    );
  }
  const currentLocation = await MapLocation.getCurrentPositionAsync({
    accuracy: MapLocation.Accuracy.Balanced,
  });
  return {
    latitude: currentLocation.coords.latitude,
    longitude: currentLocation.coords.longitude,
  };
}

export default function Tree({ uuid = null, onSave, onDelete = () => {} }) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
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
      setComments(tree.comments?.reverse());
      setImages(tree.images);
      setLocation(tree.location);
      setComments(tree.comments);
      setDescription(tree.description);
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
      description,
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
      setDescription('');
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

  const handleAddComment = async () => {
    if (commentText) {
      const comment = {
        uuid: uuidv4(),
        input: commentText,
      };
      await addComment(comment, uuid);
      setComments([comment, ...comments]);
      setCommentText('');
    }
  };

  const handleDeleteComment = async comment => {
    await deleteComment(comment, uuid);
    setComments(comments.filter(c => c.uuid !== comment.uuid));
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
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
        placeholderTextColor={color('gray.400')}
        value={name}
        onChangeText={newValue => setName(newValue)}
        style={styles.nameInput}
        editable={editing}
      />
      <Inset
        style={
          editing && {
            borderTopWidth: 1,
            borderColor: color('gray.200'),
            paddingTop: 18,
          }
        }
      >
        <TextInput
          placeholder="Address"
          value={id}
          placeholderTextColor={color('gray.400')}
          onChangeText={newValue => setID(newValue)}
          style={{
            fontSize: 18,
            color: color('gray.400'),
            marginBottom: 18,
          }}
          editable={editing}
        />
      </Inset>
      <Pressable
        onPress={async () => {
          if (editing) {
            const uri = await getImage();
            if (uri) {
              setImages([uri]);
            }
          }
        }}
      >
        {images?.length ? (
          <Inset>
            <Image style={styles.image} source={{ uri: images[0] }} />
          </Inset>
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
        <Text style={styles.heading}>Description</Text>
      </Inset>
      <Inset
        style={{
          marginTop: 10,
          marginBottom: 20,
          paddingTop: editing ? 16 : 0,
          paddingBottom: editing ? 18 : 0,
          borderTopWidth: editing ? 1 : 0,
          borderBottomWidth: editing ? 1 : 0,
          borderColor: color('gray.100'),
        }}
      >
        <TextInput
          placeholder={
            editing
              ? 'Add a description...'
              : 'This tree has no description. Use the edit button to add one.'
          }
          value={description}
          multiline
          onChangeText={newValue => setDescription(newValue)}
          style={{
            fontSize: 16,
          }}
          editable={editing}
        />
      </Inset>
      <Pressable
        style={{
          borderTopWidth: editing ? 1 : 0,
          borderBottomWidth: editing ? 1 : 0,
          borderColor: editing ? color('gray.100') : 'transparent',
          paddingVertical: editing ? 16 : 0,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => editing && setDatePickerVisible(true)}
      >
        <Icon
          style={{ marginRight: 5 }}
          name="leaf"
          color={color('green.600')}
        />
        <Text
          style={{
            fontSize: 16,
            color: color('green.600'),
            fontWeight: '500',
            marginRight: 5,
          }}
        >
          Planted
          {planted && ` ${formatRelative(planted, new Date())}`}
        </Text>
      </Pressable>
      <Inset>
        {location && !location.latitude && (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 20,
            }}
          >
            <ActivityIndicator />
            <Text style={{ marginLeft: 5 }}>Fetching your location...</Text>
          </View>
        )}
        {location && location.latitude && (
          <View style={{ marginTop: 20, flexDirection: 'row' }}>
            <Text style={{ fontWeight: '500' }}>LAT, LONG:&nbsp;</Text>
            <Text style={{ color: color('gray.500'), marginRight: 5 }}>
              {location.latitude?.toFixed(7)}
            </Text>
            <Text style={{ color: color('gray.500') }}>
              {location.longitude?.toFixed(7)}
            </Text>
          </View>
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
              paddingTop: 5,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: '500', color: color('blue.500') }}>
              {location ? 'Remove ' : 'Tag with '}
              location
            </Text>
          </Pressable>
        )}
        <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={date => {
            setPlanted(date);
            setDatePickerVisible(false);
          }}
          onCancel={() => setDatePickerVisible(false)}
        />
      </Inset>
      {canEdit && !editing && (
        <>
          <Inset>
            <Text style={styles.heading}>Comments</Text>
          </Inset>
          <View
            style={{
              marginVertical: 10,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: color('gray.200'),
              paddingTop: 16,
              paddingBottom: 20,
            }}
          >
            <Inset>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <TextInput
                  placeholder="Write a comment..."
                  multiline
                  onChangeText={newValue => setCommentText(newValue)}
                  style={{
                    fontSize: 16,
                    flex: 1,
                  }}
                  textAlignVertical="top"
                  value={commentText}
                />
                <Pressable onPress={handleAddComment}>
                  <Text
                    style={{
                      color: color('blue.500'),
                      fontWeight: '500',
                      fontSize: 16,
                    }}
                  >
                    Post
                  </Text>
                </Pressable>
              </View>
            </Inset>
          </View>
          <Inset>
            {comments?.map((comment, i) => (
              <Comment
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                comment={comment}
                onDelete={handleDeleteComment}
              />
            ))}
            {!comments?.length && (
              <Text
                style={{
                  marginTop: 20,
                  color: color('gray.500'),
                }}
              >
                No comments yet. Use the field above to add a comment.
              </Text>
            )}
          </Inset>
        </>
      )}
      <Inset>
        {canEdit && editing && (
          <View style={{ paddingVertical: 10 }}>
            <Button
              backgroundColor={color('rose.500')}
              color="#fff"
              title="Delete"
              onPress={handleDelete}
            />
          </View>
        )}
        {!canEdit && (
          <View style={{ paddingVertical: 10 }}>
            <Button
              backgroundColor="#52bd41"
              color="#fff"
              title="Save"
              onPress={handleSave}
            />
          </View>
        )}
      </Inset>
      <View style={{ paddingTop: 100 }} />
    </KeyboardAwareScrollView>
  );
}

Tree.propTypes = {
  onSave: func,
  onDelete: func,
  uuid: string,
};
