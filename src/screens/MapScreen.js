import React from 'react';

import { array, func, shape } from 'prop-types';
import { StyleSheet, ViewPropTypes } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { DEFAULT_LOCATION } from '../constants/DefaultLocation';

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

// eslint-disable-next-line no-unused-vars
export default function MapScreen({ style, navigation, data }) {
  return (
    <MapView style={[styles.map, style]} region={DEFAULT_LOCATION}>
      {data.map(tree => (
        <Marker
          key={tree.uuid}
          coordinate={{
            latitude: tree.location?.latitude,
            longitude: tree.location?.longitude,
          }}
        />
      ))}
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
