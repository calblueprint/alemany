import React, { useState } from 'react';

import { func, number, shape } from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import markerPng from '../../assets/images/marker.png';
import Button from '../components/ui/Button';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';

export default function RefineLocationScreen({ route, navigation }) {
  const { location: initialLocation } = route.params;
  const [location, setLocation] = useState(initialLocation);
  const handleDone = () => {
    navigation.navigate({
      name: 'Add',
      params: {
        location,
      },
      merge: true,
    });
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MapView
        style={[
          StyleSheet.absoluteFillObject,
          {
            zIndex: -10000,
          },
        ]}
        provider={PROVIDER_GOOGLE}
        initialRegion={DEFAULT_LOCATION}
        onRegionChangeComplete={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        mapType="satellite"
        maxZoomLevel={25}
        showsUserLocation
        toolbarEnabled={false}
      />
      <View style={{ zIndex: 3, position: 'absolute', paddingBottom: 40 }}>
        <Image
          source={markerPng}
          style={{ height: 40, width: undefined, aspectRatio: 585 / 1024 }}
        />
      </View>
      <View
        style={{
          zIndex: 3,
          position: 'absolute',
          bottom: 40,
          right: 40,
          left: 40,
        }}
      >
        <Button
          backgroundColor="#52bd41"
          color="white"
          title="Done"
          onPress={handleDone}
        />
      </View>
    </View>
  );
}

RefineLocationScreen.propTypes = {
  route: shape({
    params: shape({
      location: shape({
        latitude: number,
        longitude: number,
      }),
    }),
  }),
  navigation: shape({
    navigate: func,
  }),
};
