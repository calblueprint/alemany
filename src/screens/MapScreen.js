import React from 'react';

import { array, func, shape } from 'prop-types';
import { StyleSheet, ViewPropTypes, Image } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';

import TreeIcon from '../../assets/images/tree.png';
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
  const alternateColors = [
    'rgba(128, 0, 0, 0.4)',
    'rgba(0, 0, 255, 0.4)',
    'rgba(128, 0, 128, 0.4)',
    'rgba(255, 255, 0, 0.4)',
    'rgba(0, 255, 255, 0.4)',
  ];
  return features.map((feature, index) => {
    const coordinates = feature.geometry.coordinates.map(coord => ({
      latitude: coord[1],
      longitude: coord[0],
    }));
    return (
      <Polygon
        id={mapboxJSON}
        key={feature.name}
        coordinates={coordinates}
        strokeColor={alternateColors[index % alternateColors.length]}
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
      mapType="satellite"
      maxZoomLevel={20}
      showsUserLocation
    >
      {getCoordinates(MAPBOX_COORDS)}
      {data.map(tree => (
        <Marker
          key={tree.uuid}
          coordinate={{
            latitude: tree.location?.latitude,
            longitude: tree.location?.longitude,
          }}
        >
          <Image source={TreeIcon} />
        </Marker>
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
