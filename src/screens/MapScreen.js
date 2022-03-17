import React from 'react';

import { array, func, shape } from 'prop-types';
import { StyleSheet, ViewPropTypes } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';

import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import MAPBOX_COORDS from '../constants/Features';

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

const getCoordinates = mapboxJSON => {
  const { features } = mapboxJSON;
  return features.map(feature => {
    const coordinates = feature.geometry.coordinates.map(coord => ({
      latitude: coord[1],
      longitude: coord[0],
    }));
    return (
      <Polygon
        id={mapboxJSON}
        coordinates={coordinates}
        fillColor="rgba(0,0,255,0.5)"
        strokeColor="rgba(0,0,255,0.5)"
        strokeWidth={2}
      />
    );
  });
};

// eslint-disable-next-line no-unused-vars
export default function MapScreen({ style, navigation, data }) {
  return (
    <MapView
      style={styles.map}
      initialRegion={DEFAULT_LOCATION}
      showsUserLocation
    >
      {getCoordinates(MAPBOX_COORDS)}
      {data.map(tree => (
        <Marker
          key={tree.uuid}
          coordinate={{
            latitude: tree.location.latitude,
            longitude: tree.location.longitude,
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
