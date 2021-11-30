import React, { useState, useEffect } from 'react';

import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { RootTabScreenProps, Tree } from '@types';
import ViewContainer from 'components/ViewContainer';
import { DEFAULT_LOCATION } from 'constants/DefaultLocation';
import { getAllTrees } from 'database/firebase';

import { SearchBar, ShortInput } from 'src/components/Inputs';
import { ToggleButtons } from 'src/components/Buttons';
import { Card } from 'src/components/Cards';
import { ScreenContainer, TopContainer } from 'src/components/Components';

const styles = StyleSheet.create({
  map: {
    flex: 0,
    width: '100%',
    height: '100%',
  },
});

const isValidLocation = (tree: Tree) =>
  tree.location && tree.location.latitude && tree.location.longitude;

type HomeProps = {
  trees: Tree[];
  navigation: any;
};

const Map = (props: HomeProps) => {
  return (
    <MapView style={styles.map} region={DEFAULT_LOCATION} mapType="satellite">
      {props.trees
        .filter(tree => isValidLocation(tree))
        .map(tree => (
          <Marker
            key={tree.uuid}
            coordinate={{
              latitude: tree.location!.latitude,
              longitude: tree.location!.longitude,
            }}
          />
        ))}
    </MapView>
  );
};

const List = (props: HomeProps) => {
  return (
    <SafeAreaView style={{ marginTop: 180 }}>
      <ScrollView>
        {props.trees.map((tree: Tree) => {
          const uuid = tree.uuid;
          return (
            <Card
              tree={tree}
              onPress={() => props.navigation.push('TreeDetails', { uuid })}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [active, setActive] = useState<string>('Map');

  useEffect(() => {
    async function getData() {
      try {
        const data = await getAllTrees();
        setTrees(data);
      } catch (e) {
        console.warn(e);
      }
    }
    getData();
  }, []);

  return (
    <ScreenContainer>
      {active === 'Map' && <Map trees={trees} />}
      {active === 'List' && <List trees={trees} navigation={navigation} />}
      <SafeAreaView style={{ position: 'absolute' }}>
        <TopContainer>
          <SearchBar onPress={() => navigation.push('TreeDetails')} />
          <ToggleButtons values={['Map', 'List']} setValue={setActive} />
        </TopContainer>
      </SafeAreaView>
    </ScreenContainer>
  );
}
