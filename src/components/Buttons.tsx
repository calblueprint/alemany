import * as React from 'react';

import { StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { COLORS } from 'src/constants/Colors';

const styles = StyleSheet.create({
  primary: {
    borderRadius: 8,
    minWidth: '100%',
    padding: 10,
    backgroundColor: COLORS.SPINACH,
  },
  rounded: {
    backgroundColor: COLORS.SPINACH,
  },
  text: {
    fontFamily: 'Inter',
    color: 'white',
  },
});

export function PrimaryButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      style={styles.primary}
      labelStyle={styles.text}
      mode="text"
      uppercase={false}
      {...props}
    />
  );
}

export function RoundedButton(props: React.ComponentProps<typeof IconButton>) {
  return (
    <IconButton
      style={styles.rounded}
      color={COLORS.WHITE}
      size={40}
      {...props}
    />
  );
}
