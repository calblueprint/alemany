import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { View, StyleSheet, Button, SafeAreaView } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

import Carousel from 'react-native-snap-carousel';
import { RootStackScreenProps, Tree } from '@types';
import ViewContainer from 'components/ViewContainer';
import { getTree, setTree } from 'src/database/firebase';
import { Pill, RowContainer, ScreenContainer } from 'src/components/Components';
import { Body, LargeTitle } from 'src/components/Text';

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

export default function TreeDetailsScreen({
  route,
  navigation,
}: RootStackScreenProps<'TreeDetails'>) {
  // @ts-ignore
  const { uuid } = route.params;
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
    <ScreenContainer>
      <SafeAreaView>
        <LargeTitle>{entry.name}</LargeTitle>
        <RowContainer style={[{ marginTop: 9 }]}>
          <Body>#{entry.id} </Body>
          <Pill value="Peach" style={{ backgroundColor: '#ABCDEF' }} />
        </RowContainer>
        <View style={{ minHeight: 150, backgroundColor: 'coral' }}></View>

        <RowContainer>
          <Pill value="Add location" icon="map-marker" />
          <Pill value="Add date planted" icon="birthday-cake" />
        </RowContainer>
        <TextInput
          disabled={!isEditing}
          label="Name"
          onChangeText={value => setEntry({ ...entry, name: value.toString() })}
          style={styles.input}
          value={entry.name ?? ''}
        />
        <TextInput
          disabled={!isEditing}
          label="ID"
          onChangeText={value => setEntry({ ...entry, id: value.toString() })}
          style={styles.input}
          value={entry.id}
        />
        {isEditing && (
          <Button title="Save Changes" onPress={handleSaveChanges} />
        )}
      </SafeAreaView>
    </ScreenContainer>
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
