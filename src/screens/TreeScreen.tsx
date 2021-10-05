import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Title } from 'react-native-paper';
import ViewContainer from 'components/ViewContainer';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

// TODO: fix navigation
export default function TreeScreen({ navigation }) {
  return (
    <ViewContainer>
      <Title>Tree Screen</Title>
      <View style={styles.separator} />
      <Button title="Search" onPress={() => navigation.navigate('Search')} />
    </ViewContainer>
  );
}
