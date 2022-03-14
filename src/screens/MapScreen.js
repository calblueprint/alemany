import React, { useState, useRef } from 'react';

import { array, func, shape } from 'prop-types';
import {
  StyleSheet,
  ViewPropTypes,
  View,
  Text,
  ScrollView,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import SearchCard from '../components/SearchCard';
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
  const viewRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref, setRef] = useState(null);
  return (
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
          onPress={() => console.log('Click')}
        >
          <Callout tooltip>
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
