import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from 'src/constants/Colors';

const styles = StyleSheet.create({
  large: {
    fontSize: 34,
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.BlueGrey600,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
  },
  caption: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.BlueGrey300,
  },
  body: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: COLORS.Grey400,
  },
  regular: {
    fontFamily: 'Inter_400Regular',
    color: COLORS.BlueGrey600,
  },
  medium: {
    fontFamily: 'Inter_500Medium',
    color: COLORS.BlueGrey200,
  },
  semibold: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.BlueGrey600,
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
