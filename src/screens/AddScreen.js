import * as React from 'react';
import { useState, useEffect } from 'react';

import { StyleSheet } from 'react-native';
import { Switch, Title, TextInput, Button } from 'react-native-paper';

import ViewContainer from '../components/ViewContainer';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import { addTree } from '../database/firebase';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

const styles = StyleSheet.create({
  input: {
    width: '90%',
    backgroundColor: 'white',
  },
});

export default function AddScreen() {
  const getCurrentLocation = useCurrentLocation();
  const [entry, setEntry] = React.useState({
    id: '',
    name: '',
    uuid: '',
    location: { latitude: '', longitude: '' },
    planted: null,
    comment: null,
  });
  const [newLocation, setNewLocation] = useState({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
  });
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getCurrentLocation();
      setNewLocation(data);
    }
    getData();
  }, [getCurrentLocation]);

  const onPress = () => {
    let result = entry;
    if (checked) {
      result = { ...result, location: newLocation };
    }
    setChecked(false);
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
