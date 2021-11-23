/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';

import { StyleSheet, Text } from 'react-native';
import MapView, { Marker, Polygon, Callout } from 'react-native-maps';

import { Feature, Dictionary, Tree } from '@types';
import ViewContainer from 'components/ViewContainer';
import { DEFAULT_LOCATION } from 'constants/DefaultLocation';
import MAPBOX_COORDS from 'constants/Features';
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

  const getCoordinates = (mapboxJSON: Dictionary) => {
    const { features } = mapboxJSON;
    return features.map((feature: Feature) => {
      const coordinates = feature.geometry.coordinates.map(
        (coord: number[]) => ({
          latitude: coord[1],
          longitude: coord[0],
        }),
      );
      return (
        <Polygon
          coordinates={coordinates}
          fillColor="rgba(0,0,255,0.5)"
          strokeColor="rgba(0,0,255,0.5)"
          strokeWidth={2}
        />
      );
    });
  };

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
        <Polygon
          coordinates={[
            {
              latitude: 37.732937,
              longitude: -122.42002,
            },
            {
              latitude: 37.733048,
              longitude: -122.420035,
            },
            {
              latitude: 37.733098,
              longitude: -122.420051,
            },
            {
              latitude: 37.733076,
              longitude: -122.420177,
            },
            {
              latitude: 37.732894,
              longitude: -122.420154,
            },
            {
              latitude: 37.732937,
              longitude: -122.42002,
            },
          ]}
          fillColor="rgba(0,0,255,0.5)"
          strokeColor="rgba(0,0,255,0.5)"
          strokeWidth={2}
        >
          <Callout>
            <Text> Fruit Ally </Text>
          </Callout>
        </Polygon>

        {getCoordinates(MAPBOX_COORDS)}

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
