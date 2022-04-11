import 'react-native-get-random-values';
import * as React from 'react';
import { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { func, shape } from 'prop-types';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Switch, TextInput, Button } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';

import ViewContainer from '../components/ViewContainer';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import firebase, { addTree } from '../database/firebase';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

const styles = StyleSheet.create({
  input: {
    width: '90%',
    backgroundColor: 'white',
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
  const [entry, setEntry] = React.useState({
    id: '',
    name: '',
    uuid: '',
    location: { latitude: '', longitude: '' },
    planted: null,
    comments: [],
  });
  const [newLocation, setNewLocation] = useState({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
  });
  const [checked, setChecked] = React.useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await getCurrentLocation();
      setNewLocation(data);
    }
    getData();
  }, [getCurrentLocation]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    let result = entry;
    result = { ...result, planted: date };
    setEntry(result);
    hideDatePicker();
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

  async function addTreeAndNavigate(tree) {
    const newId = await addTree(tree);
    navigation.push('TreeDetails', { uuid: newId });
  }
  const onPress = async () => {
    let result = entry;
    if (checked) {
      result = { ...result, location: newLocation };
    }
    setChecked(false);
    setEntry({
      id: '',
      name: '',
      uuid: '',
      location: { latitude: '', longitude: '' },
      planted: null,
      comments: [],
    });
    const imageURL = await uploadImageAsync(image);
    setImage(null);
    addTreeAndNavigate({ ...result, image: imageURL });
  };

  return (
    <ViewContainer>
      <Pressable onPress={pickImage}>
        <Text>Pick an image</Text>
      </Pressable>
      {image && (
        <Image style={{ width: 200, height: 200 }} source={{ uri: image }} />
      )}
      <TextInput
        label="Name"
        value={entry.name}
        onChangeText={name => setEntry({ ...entry, name: name.toString() })}
        style={styles.input}
      />
      <TextInput
        label="ID"
        value={entry.id}
        onChangeText={id => setEntry({ ...entry, id: id.toString() })}
        style={styles.input}
      />
      <TextInput
        label="Latitude"
        value={entry.location.latitude && entry.location.latitude.toString()}
        onChangeText={
          lat =>
            setEntry({
              ...entry,
              location: { ...entry.location, latitude: Number(lat) },
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        style={styles.input}
      />
      <TextInput
        label="Longitude"
        value={entry.location.longitude && entry.location.longitude.toString()}
        onChangeText={
          long =>
            setEntry({
              ...entry,
              location: { ...entry.location, longitude: Number(long) },
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        style={styles.input}
      />
      <TextInput
        label="Date Planted"
        onFocus={showDatePicker}
        placeholder="MM/DD/YYYY"
        value={entry.planted && entry.planted.toLocaleDateString()}
        style={styles.input}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {/* TODO: Add Switch label that shows location */}
      <Switch
        value={checked}
        onValueChange={() => {
          setChecked(!checked);
        }}
      />
      <Button mode="contained" onPress={onPress}>
        Submit
      </Button>
    </ViewContainer>
  );
}

AddScreen.propTypes = {
  navigation: shape({
    push: func,
  }),
};
