import React from 'react';

import { array, func, shape } from 'prop-types';
import {
  StyleSheet,
  ViewPropTypes,
  SafeAreaView,
  FlatList,
  View,
  Image
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import SearchCard from '../components/SearchCard';

import TreeIcon from '../../assets/images/tree.png';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';

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
});

export default function MapScreen({ data }) {
  const renderItem = ({ item }) => (
    <SearchCard key={item.uuid} name={item.name} comments={item.comments} />
  );

  return (
<<<<<<< HEAD
    <View>
      <MapView
        style={styles.map}
        initialRegion={DEFAULT_LOCATION}
        showsUserLocation
      >
        {data.map(tree => (
          <Marker
            key={tree.uuid}
            coordinate={{
              latitude: tree.location.latitude,
              longitude: tree.location.longitude,
            }}
          >
            <Callout tooltip>
              <SearchCard
                key={tree.uuid}
                name={tree.name}
                comments={tree.comments}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                }}
              />
            </Callout>
          </Marker>
        ))}
      </MapView>
      <SafeAreaView backgroundColor="black" style={{ zIndex: -5 }}>
        <FlatList
          data={data}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.uuid}
          contentContainerStyle={{ flexGrow: 1 }}
          ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
        />
      </SafeAreaView>
    </View>
=======
    <MapView
      style={styles.map}
      initialRegion={DEFAULT_LOCATION}
      mapType="satellite"
      maxZoomLevel={20}
      showsUserLocation
    >
      {data.map(tree => (
        <Marker
          key={tree.uuid}
          coordinate={{
            latitude: tree.location?.latitude,
            longitude: tree.location?.longitude,
          }}
        >
          <Image source={TreeIcon} />
        </Marker>
      ))}
    </MapView>
>>>>>>> main
  );
}
MapScreen.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: array,
};
