import * as React from 'react';
import { useState, useEffect } from 'react';

import * as Location from 'expo-location';
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

export default function AddScreen() {

  const useCurrentLocation = async () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return 'error object, idk what that is rn';
        } else {
          const currentLocation = await Location.getCurrentPositionAsync({
            timeout: 3000,
          });
          setLocation(currentLocation);
        }
      }
    };
    
    useEffect(() => {
      getCurrentLocation();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
      return { text };
    } else if (location) {
      text = JSON.stringify(location);
      return { text };
    }
    /* return { location }; currently returning text of location, we will figure out 
    how to actually return location when we understand try, catch */
  }
  /*
  - getting a button that links you to settings if you didnt enable location
  - properly showing location
  Eventually:
  - subscribe to location updates with async expo-location function (annie knows)
  - getting more accurate location pinpoints
  - right now, location only asked for when you it AddScreen on navbar.
  when we move to location subscription this should be asked at app launch (for map)
  */

  return (
    <ViewContainer>
      <Title>Create Screen</Title>
      <Title>
        Location:
        {text}
      </Title>
      <View style={styles.separator} />
      <EditScreenInfo path="/screens/AddScreen.tsx" />
    </ViewContainer>
  );
}

/* Annie's get location function: MINE SHOULD RETURN location OR error
  (if they didnt enable location)

export function useCurrentLocation() {
  const [locationPermissions, setLocationPermissions] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const getCurrentLocation = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        Analytics.setUserProperty('location_permissions', 'denied');
        setLocationPermissions('denied');
      } else {
        const location = await Location.getCurrentPositionAsync({
          timeout: 3000,
        });
        const currentRegion = {
          latitude: location.coords.latitude - deltas.latitudeDelta / 3.5,
          longitude: location.coords.longitude,
          ...deltas,
        };
        setCurrentLocation(currentRegion);
        setLocationPermissions('granted');
        Analytics.setUserProperty('location_permissions', 'granted');
      }
    } catch (err) {
      Analytics.setUserProperty('location_permissions', 'error');
      logErrorToSentry({
        function: 'useCurrentLocation',
        error: err,
      });
      setLocationPermissions('error');
    }
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);
  return { locationPermissions, currentLocation };
}
*/