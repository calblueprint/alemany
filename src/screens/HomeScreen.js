import React, { useState, useEffect } from 'react';

import * as Location from 'expo-location';
import { func, shape } from 'prop-types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Inset from '../components/Inset';
import ViewContainer from '../components/ViewContainer';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import { getAllTrees } from '../database/firebase';

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    backgroundColor: '#000FFF',
    padding: 5,
    borderRadius: 10,
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
});

export default function HomeScreen({ navigation }) {
  const [trees, setTrees] = useState([]);
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

  const isValidLocation = tree =>
    tree.location && tree.location.latitude && tree.location.longitude;

  useEffect(() => {
    async function getData() {
      try {
        const data = await getAllTrees();
        const validTrees = data.filter(tree => isValidLocation(tree));
        setTrees(validTrees);
      } catch (e) {
        console.warn(e);
      }
    }
    getData();
  }, []);
  // eslint-disable-next-line no-lone-blocks
  {
    /* {personLocation && (
          <Marker
            coordinate={{
              latitude: personLocation.coords.latitude,
              longitude: personLocation.coords.longitude,
            }}
          />
        )} */
  }

  return (
    <ViewContainer>
      <MapView style={styles.map} region={DEFAULT_LOCATION}>
        {trees.map(tree => (
          <Marker
            key={tree.uuid}
            coordinate={{
              latitude: tree.location?.latitude,
              longitude: tree.location?.longitude,
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
      <Inset
        style={{
          position: 'absolute',
          top: 48,
          right: 0,
          left: 0,
        }}
      >
        <Pressable
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 20,
            width: '100%',
          }}
          onPress={() => {
            navigation.navigate('Search');
          }}
        >
          <Text
            style={{
              fontSize: 17,
            }}
          >
            Search
          </Text>
        </Pressable>
      </Inset>
    </ViewContainer>
  );
}
HomeScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }),
};
