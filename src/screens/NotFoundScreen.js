import * as React from 'react';

import { func, shape } from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Title } from 'react-native-paper';

import ViewContainer from '../components/ViewContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default function NotFoundScreen({ navigation }) {
  return (
    <ViewContainer>
      <Title>This screen does&pos;t exist.</Title>
      <TouchableOpacity
        onPress={() => navigation.replace('Root')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </ViewContainer>
  );
}

NotFoundScreen.propTypes = {
  navigation: shape({ replace: func }),
};
