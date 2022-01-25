import * as React from 'react';
import { useState, useEffect } from 'react';

import { SafeAreaView, StyleSheet, View, Image, Keyboard } from 'react-native';
import { Switch, Title, TextInput, Button } from 'react-native-paper';

import { Tree, Location } from '@types';
import ViewContainer from 'components/ViewContainer';
import { addTree } from 'database/firebase';
import { DEFAULT_LOCATION } from 'src/constants/DefaultLocation';
import { useCurrentLocation } from 'src/hooks/useCurrentLocation';
import {
  LinedContainer,
  Pill,
  RowContainer,
  ScreenContainer,
} from 'src/components/Components';
import { MultilineInput, ShortInput, TitleInput } from 'src/components/Inputs';
import { LargeTitle, Medium, SemiBold } from 'src/components/Text';
import { PrimaryButton } from 'src/components/Buttons';
import Navigation from 'src/navigation';

const styles = StyleSheet.create({
  input: {
    padding: 10,
  },
});
// TODO: research date picker options (drop down, calender view, etc)

export default function AddScreen() {
  const getCurrentLocation = useCurrentLocation();
  const [entry, setEntry] = React.useState<Tree>({
    id: '',
    name: '',
    uuid: '',
    location: null,
    planted: null,
  });
  const [location, setLocation] = useState<Location>({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
  });
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getCurrentLocation();
      setLocation(data);
    }
    getData();
  }, [getCurrentLocation]);

  const onPress = (): void => {
    let result = entry;
    if (checked) {
      result = { ...result, location };
    }
    console.log(result);
    addTree(result);
    alert('Tree saved!');
  };

  const locationString = (): string => {
    return location.latitude.toFixed(2) + ', ' + location.longitude.toFixed(2);
  };

  return (
    <ViewContainer>
      <ScreenContainer style={{ height: '100%' }}>
        <SafeAreaView>
          <RowContainer
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 15,
            }}
          >
            <SemiBold style={{ fontSize: 17 }}>Add tree</SemiBold>
            <PrimaryButton
              style={{ minWidth: 80, maxWidth: 100, padding: 2, margin: 0 }}
              onPress={onPress}
            >
              Save
            </PrimaryButton>
          </RowContainer>
          <LinedContainer>
            <TitleInput
              style={{ fontSize: 34, padding: 15, paddingVertical: 20 }}
              onChangeText={name =>
                setEntry({
                  ...entry,
                  name: name.toString(),
                  id: name.toString(),
                })
              }
              placeholder={'Address'}
            />
          </LinedContainer>
          <Image
            style={{ maxWidth: '100%' }}
            source={require('../../assets/images/tree.png')}
          />
          <RowContainer style={{ paddingVertical: 25, paddingHorizontal: 15 }}>
            {!location && <Pill value="Add location" icon="map-marker" />}
            {location && <Pill value={locationString()} icon="map-marker" />}
            <Pill
              style={{ marginLeft: 10 }}
              value="Add date planted"
              icon="birthday-cake"
            />
          </RowContainer>
          <LinedContainer style={{ padding: 15, backgroundColor: 'white' }}>
            <MultilineInput
              placeholder="Enter a description..."
              value={entry.id}
              onChangeText={id => setEntry({ ...entry, id: id.toString() })}
              style={[styles.input, {}]}
              blurOnSubmit={true}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />
          </LinedContainer>
          <Medium style={{ margin: 15 }}>
            After you save this tree, you will be able to add comments.
          </Medium>
        </SafeAreaView>
      </ScreenContainer>
    </ViewContainer>
  );
}

/*
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
*/
