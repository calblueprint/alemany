import * as React from 'react';

import { StyleSheet, TextInput } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Colors } from 'src/constants/Colors';

export const styles = StyleSheet.create({
  short: {
    borderWidth: 2,
    borderColor: Colors.Grey100,
    borderRadius: 8,
    color: Colors.Grey700,
    backgroundColor: Colors.White,
    minWidth: '100%',
    padding: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Inter_800ExtraBold',
    backgroundColor: Colors.White,
  },
  multiline: {
    minWidth: '100%',
    minHeight: 100,
    backgroundColor: Colors.White,
  },
  search: {
    borderRadius: 8,
    marginBottom: 10,
    minWidth: '100%',
    elevation: 0,
    backgroundColor: Colors.White,
    fontFamily: 'Inter_400Regular',
    color: Colors.Black,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.Grey100,
  },
});

export function ShortInput(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      {...props}
      style={[styles.short, props.style]}
      placeholderTextColor={Colors.Grey300}
    />
  );
}

export function TitleInput(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      {...props}
      style={[styles.title, props.style]}
      placeholderTextColor={Colors.Grey300}
    />
  );
}

export function MultilineInput(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      {...props}
      style={[styles.multiline, props.style]}
      multiline={true}
      numberOfLines={4}
    />
  );
}

export function SearchBar(props: React.ComponentProps<typeof Searchbar>) {
  return (
    <Searchbar
      {...props}
      style={[styles.search, styles.outline, props.style]}
      placeholderTextColor={Colors.Grey300}
    />
  );
}
