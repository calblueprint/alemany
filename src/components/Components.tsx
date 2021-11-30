import * as React from 'react';

import { StyleSheet, View, ScrollView, Text } from 'react-native';
import MapView from 'react-native-maps';
import { useTheme, Title, TextInput, Button } from 'react-native-paper';
import { COLORS } from 'src/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.Grey50,
  },
  row: {
    flexDirection: 'row',
  },
  scroll: {
    backgroundColor: COLORS.Grey50,
  },
  pill: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.Grey100,
    padding: 10,
  },
  top: {
    marginHorizontal: 28,
  },
  lined: {
    borderTopColor: COLORS.Grey100,
    borderTopWidth: 1,
    borderBottomColor: COLORS.Grey100,
    borderBottomWidth: 1,
  },
});

export function ScreenContainer(props: React.ComponentProps<typeof View>) {
  return <View {...props} style={styles.screen} />;
}

export function TopContainer(props: React.ComponentProps<typeof View>) {
  return <View {...props} style={styles.top} />;
}

export function ScrollContainer(
  props: React.ComponentProps<typeof ScrollView>,
) {
  return <ScrollView {...props} style={[styles.scroll, props.style]} />;
}

export function RowContainer(props: React.ComponentProps<typeof View>) {
  return <View {...props} style={[styles.row, props.style]} />;
}

export function LinedContainer(props: React.ComponentProps<typeof View>) {
  return <View {...props} style={[styles.lined, props.style]} />;
}

type PillProps = {
  value: string;
  icon: string;
};

const defaultPillProps = {
  value: '',
  icon: '',
};
export function Pill(props: any) {
  return (
    <RowContainer style={[styles.pill, props.style, { alignItems: 'center' }]}>
      {props.icon !== '' && (
        <FontAwesome
          name={props.icon}
          color={COLORS.Grey300}
          style={{ marginRight: 4 }}
        />
      )}
      <Text>{props.value}</Text>
    </RowContainer>
  );
}

Pill.defaultProps = defaultPillProps;
