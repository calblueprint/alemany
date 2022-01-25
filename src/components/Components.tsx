import * as React from 'react';

import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Colors } from 'src/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.Background,
  },
  row: {
    flexDirection: 'row',
  },
  pill: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.Grey100,
    padding: 10,
    backgroundColor: Colors.White,
    alignItems: 'center',
  },
  top: {
    marginHorizontal: 20,
  },
  lined: {
    borderTopColor: Colors.Grey100,
    borderTopWidth: 1,
    borderBottomColor: Colors.Grey100,
    borderBottomWidth: 1,
  },
  scroll: {
    backgroundColor: Colors.Grey50,
  },
});

export function ScreenContainer(props: React.ComponentProps<typeof View>) {
  return <View {...props} style={[styles.screen, props.style]} />;
}

export function TopContainer(props: React.ComponentProps<typeof View>) {
  return <View {...props} style={styles.top} />;
}

export function ScrollContainer(
  props: React.ComponentProps<typeof ScrollView>,
) {
  return <ScrollView {...props} style={[styles.scroll, props.style]} />;
}

export function LinedContainer(props: React.ComponentProps<typeof View>) {
  return <View {...props} style={[styles.lined, props.style]} />;
}

export function RowContainer(props: React.ComponentProps<typeof View>) {
  return <View {...props} style={[styles.row, props.style]} />;
}

type PillProps = {
  value: string;
  icon: string;
};

const defaultPillProps = {
  value: '',
  icon: '',
};
export function Pill(props: PillProps & React.ComponentProps<typeof View>) {
  return (
    <RowContainer style={[styles.pill, props.style]}>
      {props.icon !== '' && (
        <FontAwesome
          name={props.icon}
          color={Colors.Grey300}
          style={{ marginRight: 4 }}
        />
      )}
      <Text>{props.value}</Text>
    </RowContainer>
  );
}

Pill.defaultProps = defaultPillProps;
