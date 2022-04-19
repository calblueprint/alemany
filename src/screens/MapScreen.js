import React, { useState } from 'react';

import { arrayOf, func, shape } from 'prop-types';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';

import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import { MAPBOX_COORDS } from '../constants/Features';
import Tree from '../customprops';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

const getCoordinates = mapboxJSON => {
  const { features } = mapboxJSON;
  const alternateColors = ['rgb(255, 255, 0)'];
  return features.map((feature, index) => {
    const coordinates = feature.geometry.coordinates.map(coord => ({
      latitude: coord[1],
      longitude: coord[0],
    }));
    return (
      <Polygon
        id={mapboxJSON}
        key={feature.id}
        coordinates={coordinates}
        strokeColor={alternateColors[index % alternateColors.length]}
        strokeWidth={3}
        fillColor="transparent"
      />
    );
  });
};

// eslint-disable-next-line no-unused-vars
export default function MapScreen({ navigation, data }) {
  const [active, setActive] = useState(null);

  return <View style={styles.container}></View>;
}
MapScreen.propTypes = {
  data: arrayOf(Tree),
  navigation: shape({
    push: func,
  }),
};
