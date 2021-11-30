import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { RowContainer } from 'src/components/Components';
import { Button, IconButton, ToggleButton } from 'react-native-paper';
import { COLORS } from 'src/constants/Colors';

const styles = StyleSheet.create({
  primary: {
    borderRadius: 8,
    minWidth: '100%',
    padding: 10,
    backgroundColor: COLORS.Spinach,
  },
  rounded: {
    backgroundColor: COLORS.Spinach,
  },
  whiteText: {
    color: COLORS.White,
    fontFamily: 'Inter_600SemiBold',
  },
  text: {
    color: COLORS.BlueGrey,
    fontFamily: 'Inter_600SemiBold',
  },
  toggle: {
    width: '50%',
    padding: 4,
    borderWidth: 0,
    borderRadius: 8,
    margin: 4,
    color: COLORS.Spinach,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: COLORS.White,
    borderRadius: 8,
  },
  active: {
    flexGrow: 100,
    backgroundColor: COLORS.Spinach,
    margin: 4,
    borderRadius: 8,
  },
  inactive: {
    flexGrow: 100,
    backgroundColor: COLORS.White,
    margin: 4,
    borderRadius: 8,
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.Grey100,
  },
});

export function PrimaryButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      style={[styles.primary, props.style]}
      labelStyle={styles.whiteText}
      mode="text"
      uppercase={false}
    />
  );
}

export function RoundedButton(props: React.ComponentProps<typeof IconButton>) {
  return (
    <IconButton
      style={styles.rounded}
      color={COLORS.White}
      size={40}
      {...props}
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
    <RowContainer
      style={[
        { borderRadius: 8, backgroundColor: COLORS.White },
        styles.outline,
      ]}
    >
      {values.map(value => (
        <Button
          key={value}
          style={value === active ? styles.active : styles.inactive}
          labelStyle={value === active ? styles.whiteText : styles.text}
          mode="text"
          uppercase={false}
          onPress={() => updateActive(value)}
        >
          {value}
        </Button>
      ))}
    </RowContainer>
  );
}
