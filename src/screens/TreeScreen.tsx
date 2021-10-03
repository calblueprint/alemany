import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from 'components/Themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

// TODO: fix navigation
export default function TreeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tree Screen</Text>
      <Button title="Search" onPress={() => navigation.navigate('Search')} />
    </View>
  );
}
