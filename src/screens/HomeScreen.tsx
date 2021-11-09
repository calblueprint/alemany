import React, { useState, useEffect } from 'react';

import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Tree } from '@types';
import ViewContainer from 'components/ViewContainer';
import { DEFAULT_LOCATION } from 'constants/DefaultLocation';
import { getAllTrees } from 'database/firebase';

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

const isValidLocation = (tree: Tree) => {
  if (tree.location && tree.location.latitude && tree.location.longitude) {
    return tree;
  }
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
