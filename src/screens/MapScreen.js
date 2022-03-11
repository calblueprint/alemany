import React, { useEffect, useState } from 'react';

import * as Location from 'expo-location';
import { array, func, shape } from 'prop-types';
import { StyleSheet, ViewPropTypes, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { DEFAULT_LOCATION } from '../constants/DefaultLocation';

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    backgroundColor: '#4285F4',
    padding: 8,
    borderRadius: 18,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
});

// eslint-disable-next-line no-unused-vars
export default function MapScreen({ style, navigation, data }) {
  const [personLocation, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // eslint-disable-next-line no-alert
        alert('Permission to access location was denied');
        return;
      }
      const newLoc = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setLocation(newLoc);
    })();
  }, []);

  return (
    <MapView style={styles.map} region={DEFAULT_LOCATION}>
      {data.map(tree => (
        <Marker
          key={tree.uuid}
          coordinate={{
            latitude: tree.location.latitude,
            longitude: tree.location.longitude,
          }}
        />
      ))}
      {personLocation && (
        <Marker
          coordinate={{
            latitude: personLocation.coords.latitude,
            longitude: personLocation.coords.longitude,
          }}
        >
          <View style={styles.marker} />
        </Marker>
      )}
    </MapView>
  );
}
MapScreen.propTypes = {
  style: ViewPropTypes.style,
  // eslint-disable-next-line react/forbid-prop-types
  data: array,
  navigation: shape({
    navigate: func,
  }),
};
