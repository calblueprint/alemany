import React, {
  useCallback,
  useLayoutEffect,
  useEffect,
  useState,
} from 'react';

import PropTypes from 'prop-types';
import {
  StyleSheet,
  Button,
  Keyboard,
  SafeAreaView,
  Image,
} from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

import { RootStackScreenProps, Tree } from '@types';
import ViewContainer from 'components/ViewContainer';
import { getTree, setTree } from 'src/database/firebase';
import { PrimaryButton } from 'src/components/Buttons';
import {
  ScreenContainer,
  RowContainer,
  LinedContainer,
  Pill,
} from 'src/components/Components';
import { TitleInput, MultilineInput } from 'src/components/Inputs';
import { SemiBold, Medium } from 'src/components/Text';

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
  const toggleEditing = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  useEffect(() => {
    async function getEntry() {
      const data = await getTree(uuid);
      setEntry(data);
    }
    getEntry();
  }, [uuid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Tree' : 'View Tree',
      headerRight: () => <IconButton icon="pencil" onPress={toggleEditing} />,
    });
  }, [navigation, isEditing, toggleEditing]);

  const handleSaveChanges = () => {
    setTree(entry);
    toggleEditing();
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
            {isEditing && (
              <SemiBold style={{ fontSize: 17 }}>Edit tree</SemiBold>
            )}
            {isEditing && (
              <PrimaryButton
                style={{ minWidth: 80, maxWidth: 100, padding: 2, margin: 0 }}
                onPress={handleSaveChanges}
              >
                Save
              </PrimaryButton>
            )}
            {!isEditing && (
              <PrimaryButton
                style={{ minWidth: 80, maxWidth: 100, padding: 2, margin: 0 }}
                onPress={toggleEditing}
              >
                Edit
              </PrimaryButton>
            )}
          </RowContainer>
          <LinedContainer>
            <TitleInput
              disabled={!isEditing}
              style={{ fontSize: 34, padding: 15, paddingVertical: 20 }}
              onChangeText={name =>
                setEntry({
                  ...entry,
                  name: name.toString(),
                  id: name.toString(),
                })
              }
              value={entry.name ?? ''}
            />
          </LinedContainer>
          <Image
            style={{ maxWidth: '100%' }}
            source={require('../../assets/images/tree.png')}
          />
          <RowContainer style={{ paddingVertical: 25, paddingHorizontal: 15 }}>
            <Pill value="Not functional" icon="map-marker" />
            <Pill
              style={{ marginLeft: 10 }}
              value="Add date planted"
              icon="birthday-cake"
            />
          </RowContainer>
          <LinedContainer style={{ padding: 15, backgroundColor: 'white' }}>
            <MultilineInput
              disabled={!isEditing}
              placeholder="Not functional"
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
