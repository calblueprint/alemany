import React from 'react';

import { array, func, shape } from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import TreeIcon from '../../assets/images/defaultMarker.png';
import TreeIconBig from '../../assets/images/markerBig.png';
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
  card: {
    width: 428,
    height: 214,
    top: 660,
    position: 'absolute',
    zIndex: 500,
  },
});

export default function MapScreen({ data, navigation }) {
  const [test, setTest] = React.useState(<View />);
  const [active, setActive] = React.useState(null);
  const [prevValue, setPrevValue] = React.useState(null);

  return (
    <View>
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
              latitude: tree.location.latitude,
              longitude: tree.location.longitude,
            }}
            onPress={() => {
              setPrevValue(tree.uuid);
              if (active === tree.uuid) {
                setActive(null);
              } else {
                setActive(tree.uuid);
              }
              setTest(
                <SearchCard
                  key={tree.uuid}
                  name={tree.name}
                  comments={tree.comments}
                  onPress={() => {
                    navigation.push('TreeDetails', { uuid: tree.uuid });
                  }}
                />,
              );
              if (active !== null && tree.uuid === prevValue) {
                setTest(<View />);
              }
            }}
          >
            <Image source={tree.uuid === active ? TreeIconBig : TreeIcon} />
          </Marker>
        ))}
        <View style={styles.card}>{test}</View>
      </MapView>
    </View>
  );
}
MapScreen.propTypes = {
  navigation: shape({
    push: func,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  data: array,
};
