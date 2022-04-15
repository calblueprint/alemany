import * as React from 'react';
import { useState, useEffect } from 'react';

import { isPointInPolygon } from 'geolib';
import { func, shape } from 'prop-types';
import { StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Switch, TextInput, Button } from 'react-native-paper';

import ViewContainer from '../components/ViewContainer';
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
  const [checked, setChecked] = useState(false);
  const [polygon, setPolygon] = useState({});

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
  const onPress = async () => {
    let result = entry;
    if (checked) {
      const location = await getCurrentLocation();
      result = { ...result, location };
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
