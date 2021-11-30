import * as React from 'react';

import { StyleSheet, TextInput } from 'react-native';
import { Searchbar, Title } from 'react-native-paper';
import { COLORS } from 'src/constants/Colors';

const styles = StyleSheet.create({
  short: {
    borderWidth: 2,
    borderColor: COLORS.Grey100,
    borderRadius: 8,
    color: COLORS.Grey700,
    backgroundColor: COLORS.White,
    minWidth: '100%',
    padding: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Inter_800ExtraBold',
  },
  multiline: {
    minWidth: '100%',
    minHeight: 100,
    backgroundColor: COLORS.White,
  },
  search: {
    borderRadius: 8,
    marginBottom: 10,
    minWidth: '100%',
    elevation: 0,
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.Grey100,
  },
});

export function ShortInput(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      {...props}
      style={styles.short}
      placeholderTextColor={COLORS.Grey300}
    />
  );
}

export function TitleInput(props: React.ComponentProps<typeof TextInput>) {
  return <TextInput {...props} style={[styles.title, props.style]} />;
}

export function MultilineInput(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      {...props}
      style={[styles.multiline, props.style]}
      multiline
      numberOfLines={4}
    />
  );
}

export function SearchBar(props: React.ComponentProps<typeof Searchbar>) {
  return (
    <Searchbar
      {...props}
      style={[styles.search, styles.outline, props.style]}
    />
  );
}
