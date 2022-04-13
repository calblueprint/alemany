import React, { useCallback, useState, useEffect } from 'react';

import { TabRouter } from '@react-navigation/core';
import { bool, func, shape, string } from 'prop-types';
import { StyleSheet, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Switch, TextInput, Button } from 'react-native-paper';

import { DEFAULT_LOCATION } from '../constants/DefaultLocation';
import { addTree, getTree } from '../database/firebase';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import ViewContainer from './ViewContainer';

const styles = StyleSheet.create({
  input: {
    width: '90%',
    backgroundColor: 'white',
    zIndex: 0,
  },
});

export default function AddOrEdit({ route, navigation, editView }) {
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
  const { uuid } = editView ? route.params : '';

  useEffect(() => {
    async function getEntry() {
      const data = await getTree(uuid);
      setEntry(data);
    }
    getEntry();
  }, [uuid]);

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

      {editView ? null : (
        <View>
          <Switch
            value={checked}
            onValueChange={() => {
              setChecked(!checked);
            }}
          />
          <Button mode="contained" onPress={onPress}>
            Submit
          </Button>
        </View>
      )}
    </ViewContainer>
  );
}

AddOrEdit.propTypes = {
  route: shape({ params: shape({ uuid: string }) }),
  editView: bool,
  navigation: shape({
    push: func,
  }),
};
