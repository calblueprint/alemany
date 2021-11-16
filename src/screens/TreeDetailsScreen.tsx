import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, Button, Text, View } from 'react-native';
import { IconButton, TextInput, Title } from 'react-native-paper';

import { RootStackScreenProps, Tree } from '@types';
import MapView, { Marker } from 'react-native-maps';
import {
  ViewContainer,
  StyledButton,
  StyledInput,
  MapContainer,
} from 'components/Components';
import { useCurrentLocation } from 'src/hooks/useCurrentLocation';
import { getTree, setTree } from 'src/database/firebase';

const styles = StyleSheet.create({
  input: {
    width: '90%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

const DEFAULT_LOCATION = {
  latitude: 37.733053,
  longitude: -122.419756,
  latitudeDelta: 0.00275,
  longitudeDelta: 0.00275,
};

export default function TreeDetailsScreen({
  route,
  navigation,
}: RootStackScreenProps<'TreeDetails'>) {
  // @ts-ignore
  const { uuid } = route.params;
  const getCurrentLocation = useCurrentLocation();
  const [date, setDate] = React.useState(new Date());
  const [location, setLocation] = React.useState<Location>({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
  });
  const [entry, setEntry] = useState<Tree>({
    id: '',
    name: '',
    uuid: '',
    location: null,
    planted: null,
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    async function getEntry() {
      const data = await getTree(uuid);
      setEntry(data);
    }
    getEntry();
  }, [uuid]);

  const toggleEditing = () => {
    if (isEditing) {
      setIsEditing(false);
      navigation.setOptions({
        title: 'View Tree',
      });
    } else {
      setIsEditing(true);
      navigation.setOptions({
        title: 'Edit Tree',
      });
    }
  };

  const handleSaveChanges = () => {
    setTree(entry);
    toggleEditing();
  };

  navigation.setOptions({
    headerRight: () => <IconButton icon="pencil" onPress={toggleEditing} />,
  });

  return (
    <ViewContainer>
      {false && !isEditing && (
        <View>
          <Title>
            {entry.id}: {entry.name}
          </Title>
        </View>
      )}
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
        disabled={!isEditing}
        label="Name"
        value={entry.name ?? ''}
        onChangeText={name => setEntry({ ...entry, name: name.toString() })}
      />
      <StyledInput
        disabled={!isEditing}
        label="ID"
        value={entry.id ?? ''}
        onChangeText={id => setEntry({ ...entry, id: id.toString() })}
      />
      <StyledInput
        disabled={!isEditing}
        label="Date Planted"
        value={new Date().toDateString()}
        onChangeText={d => setDate(new Date(d))}
      />

      {isEditing && (
        <StyledButton
          style={{
            flex: 0,

            minWidth: '100%',
            color: 'green',
            position: 'absolute',
            bottom: 50,
            left: 0,
          }}
          onPress={handleSaveChanges}
        >
          Save Changes
        </StyledButton>
      )}
    </ViewContainer>
  );
}

TreeDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};
