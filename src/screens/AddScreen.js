import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { func, shape } from 'prop-types';
import { StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Switch, TextInput, Button } from 'react-native-paper';

import ViewContainer from '../components/ViewContainer';
import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import { addTree } from '../database/firebase';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

const styles = StyleSheet.create({
  input: {
    width: '90%',
    backgroundColor: 'white',
  },
});

export default function AddScreen({ navigation }) {
  const clearName = useRef();
  const clearId = useRef();
  const clearLat = useRef();
  const clearLong = useRef();
  const clearDate = useRef();
  const getCurrentLocation = useCurrentLocation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [entry, setEntry] = React.useState({
    id: '',
    name: '',
    uuid: '',
    location: { latitude: '', longitude: '' },
    planted: null,
    comments: [],
  });
  const [newLocation, setNewLocation] = useState({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
  });
  const [checked, setChecked] = React.useState(false);

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

  async function addTreeAndNavigate(tree) {
    const newId = await addTree(tree);
    navigation.push('TreeDetails', { uuid: newId });
  }
  const onPress = () => {
    let result = entry;
    if (checked) {
      result = { ...result, location: newLocation };
    }
    setChecked(false);
    setEntry({
      id: '',
      name: '',
      uuid: '',
      location: { latitude: '', longitude: '' },
      planted: null,
      comments: [],
    });
    addTreeAndNavigate(result);
  };

  return (
    <ViewContainer>
      <TextInput
        label="Name"
        ref={clearName}
        value={entry.name}
        onChangeText={name => setEntry({ ...entry, name: name.toString() })}
        style={styles.input}
      />
      <TextInput
        label="ID"
        ref={clearId}
        value={entry.id}
        onChangeText={id => setEntry({ ...entry, id: id.toString() })}
        style={styles.input}
      />
      <TextInput
        label="Latitude"
        ref={clearLat}
        value={entry.location.latitude && entry.location.latitude.toString()}
        onChangeText={
          lat =>
            setEntry({
              ...entry,
              location: { ...entry.location, latitude: Number(lat) },
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        style={styles.input}
      />
      <TextInput
        label="Longitude"
        ref={clearLong}
        value={entry.location.longitude && entry.location.longitude.toString()}
        onChangeText={
          long =>
            setEntry({
              ...entry,
              location: { ...entry.location, longitude: Number(long) },
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        style={styles.input}
      />
      <TextInput
        label="Date Planted"
        ref={clearDate}
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
