import * as React from 'react';
import { useState, useEffect } from 'react';

import { StyleSheet } from 'react-native';
import { Switch, Title, TextInput, Button } from 'react-native-paper';

import ImageUpload from '../components/ImageUpload';
import ViewContainer from '../components/ViewContainer';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import { addTree } from '../database/firebase';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

const styles = StyleSheet.create({
  input: {
    width: '90%',
  },
});
// TODO: research date picker options (drop down, calender view, etc)

export default function AddScreen() {
  const getCurrentLocation = useCurrentLocation();
  const [entry, setEntry] = React.useState({
    id: '',
    name: '',
    uuid: '',
    location: null,
    planted: null,
  });
  const [location, setLocation] = useState({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
  });
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getCurrentLocation();
      setLocation(data);
    }
    getData();
  }, [getCurrentLocation]);

  const onPress = () => {
    let result = entry;
    if (checked) {
      result = { ...result, location };
    }
    addTree(result);
  };

  return (
    <ViewContainer>
      <Title>Create Screen</Title>
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

      <ImageUpload />
    </ViewContainer>
  );
}
