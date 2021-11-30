import * as React from 'react';
import { useState, useEffect } from 'react';

import { SafeAreaView, StyleSheet, View } from 'react-native';
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
  };

  return (
    <ScreenContainer>
      <SafeAreaView>
        <RowContainer
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 15,
          }}
        >
          <SemiBold>Add tree</SemiBold>
          <PrimaryButton
            style={{ minWidth: 100, maxWidth: 100 }}
            onPress={onPress}
          >
            Save
          </PrimaryButton>
        </RowContainer>
        <LinedContainer>
          <TitleInput
            style={{ fontSize: 34, padding: 30 }}
            onChangeText={name => setEntry({ ...entry, name: name.toString() })}
          />
        </LinedContainer>

        <View style={{ minHeight: 150, backgroundColor: 'coral' }}></View>
        <RowContainer>
          <Pill value="Add location" icon="map-marker" />
          <Pill value="Add date planted" icon="birthday-cake" />
        </RowContainer>
        <LinedContainer>
          <MultilineInput
            placeholder="Enter a description..."
            value={entry.id}
            onChangeText={id => setEntry({ ...entry, id: id.toString() })}
            style={styles.input}
          />
        </LinedContainer>
        <Medium>
          After you save this tree, you will be able to add comments.
        </Medium>
      </SafeAreaView>
    </ScreenContainer>
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
