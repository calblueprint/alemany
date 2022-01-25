import * as React from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { Colors } from 'src/constants/Colors';

const styles = StyleSheet.create({
  primary: {
    borderRadius: 8,
    minWidth: '100%',
    padding: 10,
    color: Colors.White,
    backgroundColor: Colors.Spinach,
  },
  rounded: {
    backgroundColor: Colors.Spinach,
  },
  toggle: {
    width: '50%',
    padding: 4,
    borderWidth: 0,
    borderRadius: 8,
    margin: 4,
    color: Colors.Spinach,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.Grey100,
    borderRadius: 8,
    backgroundColor: Colors.White,
    minWidth: '100%',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    borderRadius: 8,
  },
  active: {
    flexGrow: 100,
    backgroundColor: Colors.Spinach,
    margin: 4,
    borderRadius: 8,
  },
  inactive: {
    flexGrow: 100,
    backgroundColor: Colors.White,
    margin: 4,
    borderRadius: 8,
  },
});

export function PrimaryButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      style={[styles.primary, props.style]}
      labelStyle={{
        fontFamily: 'Inter_600SemiBold',
        color: Colors.White,
      }}
      mode="text"
      uppercase={false}
    />
  );
}

export function RoundedButton(props: React.ComponentProps<typeof IconButton>) {
  return (
    <IconButton
      {...props}
      style={[styles.rounded, props.style]}
      color={Colors.White}
      size={40}
    />
  );
}

type Callback = (args: any) => any;

type ToggleProps = {
  values: string[];
  setValue: Callback;
};

export function ToggleButtons(props: ToggleProps) {
  const values: string[] = props.values;
  const setValue: Callback = props.setValue;
  const [active, setActive] = React.useState(values[0]);

  const updateActive = (value: string) => {
    setValue(value);
    setActive(value);
  };

  return (
    <View style={styles.toggleContainer}>
      {values.map(value => (
        <Button
          key={value}
          style={value === active ? styles.active : styles.inactive}
          labelStyle={{
            fontFamily: 'Inter_600SemiBold',
            color: value === active ? Colors.White : Colors.BlueGrey,
          }}
          mode="text"
          uppercase={false}
          onPress={() => updateActive(value)}
        >
          {value}
        </Button>
      ))}
    </View>
  );
}
