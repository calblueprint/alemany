import React, { useState, useLayoutEffect, useRef } from 'react';

import { func, shape, string } from 'prop-types';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Icon from '../components/Icon';
import Inset from '../components/Inset';
import SearchCard from '../components/SearchCard';
import Sheet from '../components/Sheet';
import { color } from '../components/ui/colors';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import { getAllTrees, checkID } from '../database/firebase';

function Search({ onQueryChange, query }) {
  return (
    <View
      style={{
        backgroundColor: color('gray.100'),
        padding: 15,
        borderRadius: 16,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Icon style={{ marginRight: 5 }} size={20} name="search" />
      <TextInput
        style={{
          flex: 1,
          fontSize: 18,
        }}
        placeholderTextColor={color('gray.500')}
        placeholder="Search"
        value={query}
        onChangeText={onQueryChange}
      />
    </View>
  );
}
Search.propTypes = {
  onQueryChange: func,
  query: string,
};

const isValidLocation = tree =>
  tree.location && tree.location.latitude && tree.location.longitude;

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [trees, setTrees] = useState([]);
  const [active, setActive] = useState(null);
  const rbSheetRef = useRef();

  useLayoutEffect(() => {
    async function getTrees() {
      try {
        const data = await getAllTrees();
        const validTrees = data.filter(tree => isValidLocation(tree));
        setTrees(validTrees);
      } catch (e) {
        console.warn(e);
      }
    }
    getTrees();
  }, []);

  const filtered = trees
    .filter(tree => tree !== null && tree.name && tree.id && checkID(tree.uuid))
    .filter(tree => {
      const query = searchQuery.toLowerCase();
      return (
        tree.name?.toLowerCase().includes(query) || tree.address.includes(query)
      );
    });

  useLayoutEffect(() => {
    rbSheetRef.current?.open();
  }, [rbSheetRef]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={[StyleSheet.absoluteFillObject, { zIndex: -10000 }]}
        provider={PROVIDER_GOOGLE}
        initialRegion={DEFAULT_LOCATION}
        mapType="satellite"
        maxZoomLevel={25}
        showsUserLocation
      >
        {filtered.map(tree => (
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
      <Sheet ref={rbSheetRef} closeOnDragDown={false} closeOnPressMask={false}>
        <Inset>
          <Search
            onQueryChange={query => setSearchQuery(query)}
            query={searchQuery}
          />
        </Inset>
        <ScrollView>
          <Inset>
            <Text
              style={{
                fontSize: 11,
                color: '#3b3f51',
                textAlign: 'right',
              }}
            >
              {`${filtered.length} ${
                filtered.length === 1 ? 'result' : 'results'
              }`}
            </Text>
          </Inset>
          <View style={{ marginTop: 10, marginBottom: 248 }}>
            {filtered.map(tree => {
              const { uuid, name, comments, images } = tree;
              return (
                <SearchCard
                  key={uuid}
                  uuid={uuid}
                  previewImage={images && images[0]}
                  name={name}
                  comments={comments}
                  onPress={() => navigation.push('TreeScreen', { uuid })}
                />
              );
            })}
          </View>
        </ScrollView>
      </Sheet>
    </View>
  );
}
HomeScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }),
};
