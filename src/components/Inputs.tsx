import * as React from 'react';

import { StyleSheet, TextInput } from 'react-native';
import { COLORS } from 'src/constants/Colors';

const styles = StyleSheet.create({
  short: {
    borderWidth: 2,
    borderColor: COLORS.Grey100,
    borderRadius: 8,
    color: COLORS.Grey700,
    minWidth: '100%',
    padding: 10,
  },
});

export function ShortInput(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      style={styles.short}
      placeholderTextColor={COLORS.Grey300}
      {...props}
    />
  );
}
