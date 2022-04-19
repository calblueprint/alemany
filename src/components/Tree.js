import 'react-native-get-random-values';
import React, { useState, useLayoutEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { isPointInPolygon } from 'geolib';
import { func, string } from 'prop-types';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { FEATURE_POLYGONS } from '../constants/Features';
import { getTree, uploadImageAsync } from '../database/firebase';
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
    marginTop: 15,
    fontSize: 16,
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

export default function Tree({ uuid = null, onSave }) {
  const getCurrentLocation = useCurrentLocation();
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [planted, setPlanted] = useState(null);
  const [comments, setComments] = useState([]);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [editing, setEditing] = useState(uuid === null);
  const canEdit = uuid !== null;

  useLayoutEffect(() => {
    async function fetchData() {
      const tree = await getTree(uuid);

      setName(tree.name);
      setPlanted(tree.planted?.toDate());
      setAddress(tree.address);
      setComments(tree.comments);
      setImages(tree.images);
      setLocation(tree.location);
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
      address,
      name,
      location,
      planted,
      comments,
      region,
      images,
    };

    if (editing) {
      setEditing(false);
    } else {
      setLocation(null);
      setName('');
      setAddress('');
      setPlanted(null);
      setComments([]);
      setImages([]);
    }

    onSave(tree);
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Switch
            value={!!location}
            onValueChange={async () => {
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
          />
          <Text style={{ marginLeft: 5, fontWeight: '500' }}>
            Capture location
          </Text>
        </View>
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={newValue => setAddress(newValue)}
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
        {!canEdit && (
          <View style={{ paddingVertical: 10 }}>
            <Button
              backgroundColor="#52bd41"
              color="#fff"
              title="Add"
              onPress={handleSave}
            />
          </View>
        )}
      </Inset>
    </ScrollView>
  );
}

Tree.propTypes = {
  onSave: func,
  uuid: string,
};
