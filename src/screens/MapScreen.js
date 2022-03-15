import React, { useRef } from 'react';

import { array, func, shape } from 'prop-types';
import {
  StyleSheet,
  ViewPropTypes,
  ScrollView,
  Dimensions,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import SearchCard from '../components/SearchCard';
import ViewContainer from '../components/ViewContainer';
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
// const scllView = React.useRef(null);
// const onMarkerPress = mapEventData => {
//   const markerID = mapEventData._targetInst.return.key;

//   const x = markerID * CARD_WIDTH + markerID * 20;
//   scllView.current.scrollTo({ x, y: 0, animated: true });
// };

// eslint-disable-next-line no-unused-vars
export default function MapScreen({ style, navigation, data }) {
  const CARD_WIDTH = Dimensions.get('window').width * 0.8;
  const renderItem = ({ item }) => (
    <SearchCard key={item.uuid} name={item.name} comments={item.comments} />
  );

  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);
  // General scroll to element function
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={DEFAULT_LOCATION}
        showsUserLocation
      >
        {data.map(tree => (
          <Marker
            ref={myRef}
            key={tree.uuid}
            coordinate={{
              latitude: tree.location.latitude,
              longitude: tree.location.longitude,
            }}
          >
            <Callout tooltip onPress={executeScroll}>
              {/* <SearchCard
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
              /> */}
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
  );
}
MapScreen.propTypes = {
  style: ViewPropTypes.style,
  // eslint-disable-next-line react/forbid-prop-types
  data: array,
  navigation: shape({
    navigate: func,
  }),
};
