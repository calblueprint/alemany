import * as React from 'react';
import { useState, useEffect } from 'react';

import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

import EditScreenInfo from 'components/EditScreenInfo';
import ViewContainer from 'components/ViewContainer';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

const useCurrentLocation = async (): Promise<LocationObject> => {
  const [location, setLocation] = useState<LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.error(
          '[AddScreen] Error in getCurrentLocation:',
          'Permission to access location was denied',
        );
      } else {
        const currentLocation = await Location.getCurrentPositionAsync({
          timeout: 3000,
        });
        setLocation(currentLocation);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  if (errorMsg) {
    throw new Error(errorMsg);
  }
  if (location) {
    console.log(location);
    return location;
  }

  /* return location object/error; currently returning text of location, (): LocationObject | Error */
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
  const locationString = useCurrentLocation();

  return (
    <ViewContainer>
      <Title>Create Screen</Title>
      <Title>
        Location:
        {locationString}
      </Title>
      <View style={styles.separator} />
      <EditScreenInfo path="/screens/AddScreen.tsx" />
    </ViewContainer>
  );
}
