import * as React from 'react';
import { useState, useEffect } from 'react';

import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { StyleSheet, View } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';

import { Tree } from '@types';
import ViewContainer from 'components/ViewContainer';
import { addTree } from 'database/firebase';

const styles = StyleSheet.create({
  input: {
    width: '90%',
  },
});

const getCurrentLocation = async (): Promise<LocationObject> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error(
        '[AddScreen] Error in getCurrentLocation:',
        'Permission to access location was denied',
      );
      throw new Error('Permission to access location was denied');
    } else {
      const currentLocation = await Location.getCurrentPositionAsync({
        timeout: 3000,
      });
      return currentLocation;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default function AddScreen() {
  /*
  - getting a button that links you to settings if you didnt enable location
  - properly showing location
  Eventually:
  - subscribe to location updates with async expo-location function (annie knows)
  - getting more accurate location pinpoints
  - right now, location only asked for when you it AddScreen on navbar.
  when we move to location subscription this should be asked at app launch (for map)
  */
  const [location, setLocation] = useState<LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  useEffect(() => {
    async function getData() {
      try {
        const data = await getCurrentLocation();
        setLocation(data);
      } catch (e) {
        console.warn(e);
        setErrorMsg(e);
      }
    }
    getData();
  }, []);

  const [entry, setEntry] = React.useState<Tree>({
    id: '',
    name: '',
    uuid: '',
    location: null,
    planted: null,
  });

  return (
    <ViewContainer>
      <Title>Create Screen</Title>
      <Title>
        Location:
        {location}
      </Title>
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
      <Button mode="contained" onPress={() => addTree(entry)}>
        Submit
      </Button>
    </ViewContainer>
  );
}
