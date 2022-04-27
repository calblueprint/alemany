import React, { useState } from 'react';

import { arrayOf, bool, func, shape } from 'prop-types';
import { Platform, StyleSheet, ViewPropTypes, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import SearchCard from '../components/SearchCard';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import Tree from '../customprops';

const check = {
  isAndroid: () => Platform.OS === 'android',
};

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
    bottom: check.isAndroid ? -20 : 60,
    position: 'absolute',
    zIndex: 500,
  },
});

// eslint-disable-next-line no-unused-vars
export default function MapScreen({ style, navigation, data, isList }) {
  const [active, setActive] = useState(null);

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={DEFAULT_LOCATION}
        provider={PROVIDER_GOOGLE}
        mapType="satellite"
        maxZoomLevel={25}
        showsUserLocation
        toolbarEnabled={false}
      >
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
      </MapView>
      <View style={styles.card}>
        {active && !isList && (
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
    </View>
  );
}

MapScreen.propTypes = {
  style: ViewPropTypes.style,
  data: arrayOf(Tree),
  navigation: shape({
    push: func,
  }),
  isList: bool,
};
