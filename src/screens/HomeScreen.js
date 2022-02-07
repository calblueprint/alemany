import React, { useState, useEffect } from 'react';

import { func, shape } from 'prop-types';
import { Pressable, StyleSheet, Text } from 'react-native';
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
});

export default function HomeScreen({ navigation }) {
  const [trees, setTrees] = useState([]);

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
