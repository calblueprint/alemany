import * as React from 'react';

import { StyleSheet, View, Platform } from 'react-native';
import { useCurrentLocation } from 'src/hooks/useCurrentLocation';
import { Title, Button } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

import { Planted, Tree, Location } from '@types';
import {
  ViewContainer,
  StyledButton,
  StyledInput,
  MapContainer,
} from 'components/Components';
import { addTree } from 'database/firebase';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
  },
});
// TODO: research date picker options (drop down, calender view, etc)

const DEFAULT_LOCATION = {
  latitude: 37.733053,
  longitude: -122.419756,
  latitudeDelta: 0.00275,
  longitudeDelta: 0.00275,
};

const dateToPlanted = (date: Date): Planted => {
  return {
    seconds: date.getSeconds(),
    nanoseconds: 0,
  } as Planted;
};

const plantedToDate = (planted: any): Date => {
  console.log(planted);
  return new Date(0, 0, 0, 0, 0, planted.seconds);
};

export default function AddScreen(props: any) {
  const getCurrentLocation = useCurrentLocation();
  const [date, setDate] = React.useState(new Date());
  const [location, setLocation] = React.useState<Location>({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
  });

  React.useEffect(() => {
    async function getData() {
      const data = await getCurrentLocation();
      await setLocation(data as Location);
      await setEntry({ ...entry, location: location });
      console.log(data);
    }
    getData();
  }, [getCurrentLocation]);

  const [entry, setEntry] = React.useState<Tree>({
    id: '',
    name: '',
    uuid: '',
    location: location,
    planted: dateToPlanted(new Date()),
  });

  const macro = (entry: Tree) => {
    console.log(entry);
    addTree(entry);
    alert('Successfully created tree!');
    props.navigation.navigate('Home');
  };

  return (
    <ViewContainer>
      <MapView
        style={{
          height: '30%',
          width: '100%',
          borderRadius: 5,
          margin: 5,
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.00275,
          longitudeDelta: 0.00275,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>

      <StyledInput
        label="Name"
        value={entry.name}
        onChangeText={name => setEntry({ ...entry, name: name.toString() })}
      />
      <StyledInput
        label="ID"
        value={entry.id}
        onChangeText={id => setEntry({ ...entry, id: id.toString() })}
      />
      <StyledInput
        label="Date Planted"
        value={new Date().toDateString()}
        onChangeText={d => setDate(new Date(d))}
      />
      <StyledInput
        label="Comments"
        value={'Hello'}
        onChangeText={d => setDate(new Date(d))}
      />

      <StyledButton onPress={() => macro(entry)}>Submit</StyledButton>
    </ViewContainer>
  );
}
