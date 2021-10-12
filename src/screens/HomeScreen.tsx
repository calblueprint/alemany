import React, { useState, useEffect } from 'react';

import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Title } from 'react-native-paper';

import { Tree } from '@types';
import EditScreenInfo from 'components/EditScreenInfo';
import ViewContainer from 'components/ViewContainer';
import { getAllTrees } from 'database/firebase';

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

const DEFAULT_LOCATION = {
  latitude: 37.733053,
  longitude: -122.419756,
  latitudeDelta: 0.00275,
  longitudeDelta: 0.00275,
};

export default function HomeScreen() {
  const [trees, setTrees] = useState<Tree[]>([]);
  
  const isValidLocation = (tree: Tree) =>
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
              latitude: tree.location!.latitude,
              longitude: tree.location!.longitude,
            }}
          />
        ))}
      </MapView>
    </ViewContainer>
  );
}
