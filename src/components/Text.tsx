import React from 'react';

import { StyleSheet, Text } from 'react-native';
import { Colors } from 'src/constants/Colors';

const styles = StyleSheet.create({
  large: {
    fontSize: 34,
    fontFamily: 'Inter_800ExtraBold',
    color: Colors.BlueGrey600,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
  },
  caption: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  body: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: Colors.Grey400,
  },
  regular: {
    fontFamily: 'Inter_400Regular',
  },
  medium: {
    fontFamily: 'Inter_500Medium',
    color: Colors.BlueGrey200,
  },
  semibold: {
    fontFamily: 'Inter_600SemiBold',
  },
  bold: {
    fontFamily: 'Inter_700Bold',
  },
  extrabold: {
    fontFamily: 'Inter_800ExtraBold',
  },
});

export function LargeTitle(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} style={[styles.large, props.style]} />;
}

export function Title(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} style={[styles.title, props.style]} />;
}

export function Caption(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} style={[styles.caption, props.style]} />;
}

export function Body(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} style={[styles.body, props.style]} />;
}

export function Regular(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} style={[styles.regular, props.style]} />;
}

export function Medium(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} style={[styles.medium, props.style]} />;
}

export function SemiBold(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} style={[styles.semibold, props.style]} />;
}

export function Bold(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} style={[styles.bold, props.style]} />;
}

export function ExtraBold(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} style={[styles.extrabold, props.style]} />;
}
