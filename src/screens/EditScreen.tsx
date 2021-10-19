import * as React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, View, Button } from 'react-native';
import { Title } from 'react-native-paper';

import { RootStackScreenProps } from '@types';
import ViewContainer from 'components/ViewContainer';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

export default function EditScreen({
  navigation,
}: RootStackScreenProps<'Edit'>) {
  return (
    <ViewContainer>
      <Title>Edit Screen</Title>
      <View style={styles.separator} />
      <Button title="Add Field" />
      <Button
        title="Submit Tree"
        onPress={() => navigation.navigate('Trees')}
      />
    </ViewContainer>
  );
}

EditScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
