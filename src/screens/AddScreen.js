import 'react-native-get-random-values';
import * as React from 'react';
import { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { isPointInPolygon } from 'geolib';
import { func, shape } from 'prop-types';
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
import { v4 as uuidv4 } from 'uuid';

import Inset from '../components/Inset';
import Button from '../components/ui/Button';
import { color } from '../components/ui/colors';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import MAPBOX_COORDS from '../constants/Features';
import firebase, { addTree } from '../database/firebase';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

const styles = StyleSheet.create({
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
    marginBottom: 20,
    aspectRatio: 1,
    maxHeight: 700,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
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

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      // TODO: handle error
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const fileRef = firebase.storage().ref(uuidv4());
  await fileRef.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return fileRef.getDownloadURL();
}

export default function AddScreen({ navigation }) {
  const getCurrentLocation = useCurrentLocation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [entry, setEntry] = useState({
    id: '',
    name: '',
    uuid: '',
    location: { latitude: '', longitude: '' },
    planted: null,
    comments: [],
    region: null,
  });
  const [newLocation, setNewLocation] = useState({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
  });
  const [checked, setChecked] = React.useState(false);
  const [image, setImage] = useState(null);
  const [polygon, setPolygon] = useState({});

  useEffect(() => {
    async function getData() {
      const data = await getCurrentLocation();
      setNewLocation(data);
    }
    getData();
  }, [getCurrentLocation]);

  const handleConfirm = date => {
    let result = entry;
    result = { ...result, planted: date };
    setEntry(result);
    setDatePickerVisibility(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    const { features } = MAPBOX_COORDS;
    return features.forEach(feature => {
      const coordinates = feature.geometry.coordinates.map(coord => ({
        latitude: coord[1],
        longitude: coord[0],
      }));
      setPolygon(prevState => ({
        ...prevState,
        [feature.properties.Name]: coordinates,
      }));
    });
  }, []);

  async function addTreeAndNavigate(tree) {
    const newId = await addTree(tree);
    navigation.push('TreeDetails', { uuid: newId });
  }
  const handleSubmit = async () => {
    let result = entry;
    if (checked) {
      result = { ...result, location: newLocation };
    } else {
      if (
        // eslint-disable-next-line operator-linebreak
        Number.isNaN(Number(result.location.latitude)) ||
        Number.isNaN(Number(result.location.longitude))
      ) {
        // eslint-disable-next-line no-alert
        alert('Either the latitude or longitude value is not a valid number.');
        return;
      }
      result = {
        ...result,
        location: {
          latitude: Number(result.location.latitude),
          longitude: Number(result.location.longitude),
        },
      };
    }
    Object.entries(polygon).forEach(([key, value]) => {
      if (isPointInPolygon(result.location, value)) {
        result = { ...result, region: key };
      }
    });
    setChecked(false);
    setEntry({
      id: '',
      name: '',
      uuid: '',
      location: { latitude: '', longitude: '' },
      planted: null,
      comments: [],
      region: null,
    });
    let imageURL;
    try {
      imageURL = await uploadImageAsync(image);
    } catch (err) {
      imageURL = null;
    }
    setImage(null);
    addTreeAndNavigate({ ...result, images: [imageURL] });
  };

  return (
    <ScrollView>
      <TextInput
        placeholder="Name"
        value={entry.name}
        onChangeText={name => setEntry({ ...entry, name: name.toString() })}
        style={styles.nameInput}
      />
      <Pressable onPress={pickImage}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>Press to add image...</Text>
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
            value={checked}
            onValueChange={() => {
              setChecked(!checked);
            }}
          />
          <Text style={{ marginLeft: 5, fontWeight: '500' }}>
            Capture location
          </Text>
        </View>
        <TextInput
          placeholder="Address"
          value={entry.id}
          onChangeText={id => setEntry({ ...entry, id: id.toString() })}
          style={styles.input}
        />
        <Pressable
          style={styles.input}
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text style={{ fontSize: 16 }}>
            {entry.planted?.toLocaleDateString() || 'Date'}
          </Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
        <View style={{ marginTop: 10 }} />
        <Button
          backgroundColor="#52bd41"
          color="#fff"
          title="Add"
          onPress={handleSubmit}
        />
        <View style={{ marginTop: 20 }} />
      </Inset>
    </ScrollView>
  );
}

AddScreen.propTypes = {
  navigation: shape({
    push: func,
  }),
};
