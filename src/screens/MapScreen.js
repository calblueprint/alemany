import React, { useState } from 'react';

import { arrayOf, func, shape } from 'prop-types';
import { StyleSheet, ViewPropTypes, View } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';

import SearchCard from '../components/SearchCard';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import { FEATURE_POLYGONS } from '../constants/Features';
import Tree from '../customprops';

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
  card: {
    width: '100%',
    bottom: 60,
    position: 'absolute',
    zIndex: 500,
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
  const [active, setActive] = useState(null);

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={DEFAULT_LOCATION}
        mapType="satellite"
        maxZoomLevel={20}
        showsUserLocation
      >
        {Object.entries(FEATURE_POLYGONS).map(([name, coords]) => (
          <Polygon
            // eslint-disable-next-line react/no-array-index-key
            key={name}
            coordinates={coords}
            strokeColor="rgba(255, 255, 0, 1)"
            strokeWidth={2}
            fillColor="rgba(0, 0, 0, 0)"
          />
        ))}
        {data.map(tree => (
          <Marker
            key={tree.uuid}
            coordinate={{
              latitude: tree.location?.latitude,
              longitude: tree.location?.longitude,
            }}
            onPress={() => {
              if (active?.uuid === tree.uuid) {
                setActive(null);
              } else {
                setActive(tree);
              }
            }}
            pinColor={tree.uuid === active?.uuid ? '#f00' : '#0f0'}
          />
        ))}
        <View style={styles.card}>
          {active && (
            <SearchCard
              key={active.uuid}
              name={active.name}
              comments={active.comments}
              onPress={() => {
                navigation.push('TreeScreen', { uuid: active.uuid });
              }}
            />
          )}
        </View>
      </MapView>
    </View>
  );
}
MapScreen.propTypes = {
  style: ViewPropTypes.style,
  data: arrayOf(Tree),
  navigation: shape({
    push: func,
  }),
};
