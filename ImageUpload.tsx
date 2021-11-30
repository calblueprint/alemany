import React, { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View, Platform } from 'react-native';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { statusPicker } =
          await ImagePicker.requestMediaLibraryPermissionsAsync(); // keeps switching LINES!!!
        if (statusPicker !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
        const { statusCamera } = await ImagePicker.getCameraPermissionsAsync();
        if (statusCamera !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takeImage = async () => {
    const picture = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(picture);

    if (!picture.cancelled) {
      setImage(picture.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take image with camera" onPress={takeImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}

// https://docs.expo.dev/versions/latest/sdk/imagepicker/
