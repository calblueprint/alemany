import * as React from 'react';

import { StyleSheet, View, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { useTheme, Title, TextInput, Button } from 'react-native-paper';
import { COLORS } from 'src/constants/Colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: '2%',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  button: {
    flex: 0,

    minWidth: '100%',
    color: COLORS.Spinach,
  },
  input: {
    width: '100%',
    margin: 5,
  },
  map: {
    height: '30%',
    width: '100%',
    borderRadius: 5,
    margin: 5,
  },
});

type ViewProps = {
  children?: React.ReactNode;
};

export function ViewContainer(props: ViewProps) {
  const { children } = props;
  return <View style={styles.container}>{children}</View>;
}

export function ScrollContainer(props: ViewProps) {
  const { children } = props;
  return <ScrollView style={styles.scroll}>{children}</ScrollView>;
}

ViewContainer.defaultProps = {
  children: null,
};

export function StyledInput(props: any) {
  return <TextInput mode={'outlined'} style={styles.input} {...props} />;
}

export function MapContainer(props: any) {
  return <MapView style={styles.map} />;
}
