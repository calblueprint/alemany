import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { isPointInPolygon } from 'geolib';
import { func, shape } from 'prop-types';
import { StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Switch, TextInput, Button } from 'react-native-paper';

import ViewContainer from '../components/ViewContainer';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import MAPBOX_COORDS from '../constants/Features';
import { addTree } from '../database/firebase';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

const styles = StyleSheet.create({
  input: {
    width: '90%',
    backgroundColor: 'white',
  },
});

export default function AddScreen({ navigation }) {
  const getCurrentLocation = useCurrentLocation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [entry, setEntry] = useState({
    id: '',
    name: '',
    uuid: '',
    location: { latitude: '', longitude: '' },
    planted: null,
    comments: [],
    region: null,
  });
  const [newLocation, setNewLocation] = useState({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
  });
  const [checked, setChecked] = useState(false);
  const [polygon, setPolygon] = useState({});
  const latRef = useRef('');
  const longRef = useRef('');

  useEffect(() => {
    async function getData() {
      const data = await getCurrentLocation();
      setNewLocation(data);
    }
    getData();
  }, [getCurrentLocation]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    let result = entry;
    result = { ...result, planted: date };
    setEntry(result);
    hideDatePicker();
  };

  useEffect(() => {
    const { features } = MAPBOX_COORDS;
    return features.forEach(feature => {
      const coordinates = feature.geometry.coordinates.map(coord => ({
        latitude: coord[1],
        longitude: coord[0],
      }));
      setPolygon(prevState => ({
        ...prevState,
        [feature.properties.Name]: coordinates,
      }));
    });
  }, []);

  async function addTreeAndNavigate(tree) {
    const newId = await addTree(tree);
    navigation.push('TreeDetails', { uuid: newId });
  }
  const onPress = () => {
    let result = entry;
    if (checked) {
      result = { ...result, location: newLocation };
    } else {
      if (
        // eslint-disable-next-line operator-linebreak
        Number.isNaN(Number(result.location.latitude)) ||
        Number.isNaN(Number(result.location.longitude))
      ) {
        // eslint-disable-next-line no-alert
        alert('Either the latitude or longitude value is not a valid number.');
        return;
      }
      result = {
        ...result,
        location: {
          latitude: Number(result.location.latitude),
          longitude: Number(result.location.longitude),
        },
      };
    }
    Object.entries(polygon).forEach(([key, value]) => {
      if (isPointInPolygon(result.location, value)) {
        result = { ...result, region: key };
      }
    });
    setChecked(false);
    setEntry({
      id: '',
      name: '',
      uuid: '',
      location: { latitude: '', longitude: '' },
      planted: null,
      comments: [],
      region: null,
    });
    addTreeAndNavigate(result);
  };

  return (
    <ViewContainer>
      <TextInput
        label="Name"
        value={entry.name}
        onChangeText={name => setEntry({ ...entry, name: name.toString() })}
        style={styles.input}
      />
      <TextInput
        label="ID"
        value={entry.id}
        onChangeText={id => setEntry({ ...entry, id: id.toString() })}
        style={styles.input}
      />
      <TextInput
        label="Latitude"
        value={entry.location.latitude && entry.location.latitude.toString()}
        ref={latRef}
        editable={!checked}
        onChangeText={
          lat =>
            setEntry({
              ...entry,
              location: { ...entry.location, latitude: lat },
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        style={styles.input}
      />
      <TextInput
        label="Longitude"
        value={entry.location.longitude && entry.location.longitude.toString()}
        ref={longRef}
        editable={!checked}
        onChangeText={
          long =>
            setEntry({
              ...entry,
              location: { ...entry.location, longitude: long },
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        style={styles.input}
      />
      <TextInput
        label="Date Planted"
        onFocus={showDatePicker}
        placeholder="MM/DD/YYYY"
        value={entry.planted && entry.planted.toLocaleDateString()}
        style={styles.input}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {/* TODO: Add Switch label that shows location */}
      <Switch
        value={checked}
        onValueChange={() => {
          setChecked(!checked);
          longRef.current.clear();
          latRef.current.clear();
        }}
      />
      <Button mode="contained" onPress={onPress}>
        Submit
      </Button>
    </ViewContainer>
  );
}

AddScreen.propTypes = {
  navigation: shape({
    push: func,
  }),
};
