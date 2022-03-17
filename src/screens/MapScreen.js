import React from 'react';

import { array, func, shape } from 'prop-types';
import { StyleSheet, ViewPropTypes, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import TreeIcon from '../../assets/images/tree.png';


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
  return (
    <MapView
      style={styles.map}
      initialRegion={DEFAULT_LOCATION}
      mapType={"satellite"}
      maxZoomLevel={20}
      showsUserLocation
    >
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
