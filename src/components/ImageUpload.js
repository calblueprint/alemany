/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View, Platform } from 'react-native';

import { uploadImageAsync } from '../database/firebase';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(Boolean);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: statusPicker } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (statusPicker !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
        const { status: statusCamera } =
          await ImagePicker.getCameraPermissionsAsync();
        if (statusCamera !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  /* TODO: Define pickResult type. Possibly: ExpandImagePickerResult */
  const handleImagePicked = async pickerResult => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        /* TODO: A Tree's uuid should be passed w/ uploadImageAsync */
        const uploadUrl = await uploadImageAsync(pickerResult.uri, 'test_uuid');
        setImage(uploadUrl);
      }
    } catch (e) {
      alert('Upload failed, sorry :(');
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(pickerResult);
  };

  const takePhoto = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(pickerResult);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {/* TODO: Implement takePhoto and fix Camera Permissions */}
      {/* <Button title="Take image with camera" onPress={takePhoto} /> */}
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
