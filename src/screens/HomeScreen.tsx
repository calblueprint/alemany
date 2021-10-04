import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Title } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { getAllTrees } from 'database/firebase';
import EditScreenInfo from 'components/EditScreenInfo';
import ViewContainer from 'components/ViewContainer';
import { ThemeProvider } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const isValidLocation = (tree: Tree) => {
  if (tree.location && tree.location.latitude && tree.location.longitude) {
    return tree;
  }
};

export default function HomeScreen() {
  const [trees, setTrees] = React.useState<Tree[]>([]);

  React.useEffect(() => {
    async function getData() {
      try {
        const data = await getAllTrees();
        const validTrees = data.filter((tree) => isValidLocation(tree));
        setTrees(validTrees);
      } catch (e) {
        console.warn(e);
      }
    }
    getData();
  }, [setTrees]);

  return (
    <ViewContainer>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.733053,
            longitude: -122.419756,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {trees.map((tree) => (
            <Marker
              coordinate={{
                latitude: tree.location.latitude,
                longitude: tree.location.longitude,
              }}
            />
          ))}
        </MapView>
      </View>
    </ViewContainer>
  );
}
