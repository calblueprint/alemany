import React, { useState, useLayoutEffect, useMemo, useRef } from 'react';

import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { func, shape, string } from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Icon from '../components/Icon';
import Inset from '../components/Inset';
import SearchCard from '../components/SearchCard';
import { color } from '../components/ui/colors';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import { getAllTrees, checkID } from '../database/firebase';

const isValidLocation = tree =>
  tree.location && tree.location.latitude && tree.location.longitude;

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
      <BottomSheetTextInput
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

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [trees, setTrees] = useState([]);
  const [active, setActive] = useState(null);
  const mapRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const goToFarm = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(DEFAULT_LOCATION, 1000);
    }
  };

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
    return navigation.addListener('focus', () => getTrees());
  }, [navigation]);

  const filtered = trees
    .filter(tree => tree !== null && tree.name && tree.id && checkID(tree.uuid))
    .filter(tree => {
      const query = searchQuery.toLowerCase();
      return (
        tree.name?.toLowerCase().includes(query) || tree.id.includes(query)
      );
    });

  const resultOrResults = filtered.length === 1 ? 'result' : 'results';
  const resultCountText = `${active ? 1 : filtered.length} ${
    active ? 'selected' : resultOrResults
  }`;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={[
          StyleSheet.absoluteFillObject,
          {
            zIndex: -10000,
          },
        ]}
        provider={PROVIDER_GOOGLE}
        initialRegion={DEFAULT_LOCATION}
        mapType="satellite"
        maxZoomLevel={25}
        showsUserLocation
        ref={mapRef}
        toolbarEnabled={false}
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
                return;
              }
              setActive(tree);
            }}
            pinColor={tree.uuid === active?.uuid ? '#f00' : '#0f0'}
          />
        ))}
      </MapView>
      <View
        style={{
          position: 'absolute',
          top: 50,
          right: 20,
          alignSelf: 'flex-end',
          borderRadius: 50,
          overflow: 'hidden',
        }}
      >
        <Icon
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 100,
          }}
          color={color('blue.500')}
          size={24}
          name="navigate"
          onPress={goToFarm}
        />
      </View>
      <BottomSheet
        snapPoints={snapPoints}
        onChange={() => {}}
        keyboardBehavior="extend"
      >
        <Inset>
          <Search query={searchQuery} onQueryChange={setSearchQuery} />
        </Inset>
        <BottomSheetScrollView>
          <Inset>
            <Text
              style={{
                marginTop: 20,
                fontSize: 11,
                color: '#3b3f51',
                textAlign: 'right',
              }}
            >
              {resultCountText}
            </Text>
          </Inset>
          <View style={{ marginTop: 10 }}>
            {filtered
              .filter(tree => {
                if (active) {
                  return tree.uuid === active.uuid;
                }
                return true;
              })
              .map(tree => {
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
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
HomeScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }),
};
