import * as React from 'react';
import { useState, useEffect } from 'react';

import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';

import { Tree } from '@types';
import ViewContainer from 'components/ViewContainer';
import { addTree } from 'database/firebase';

const styles = StyleSheet.create({
  input: {
    width: '90%',
  },
});

const getCurrentLocation = async (): Promise<Location> => {
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

      const locationObj = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      return locationObj;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default function AddScreen() {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    async function getData() {
      try {
        const data = await getCurrentLocation();
        setLocation(data);
        console.log('Data:', data);
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
        Location: Latitude:
        {String(location.latitude)}
, Longitude:
{String(location.longitude)}
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
