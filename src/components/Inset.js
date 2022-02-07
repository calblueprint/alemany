import * as React from 'react';

import { node } from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';

const styles = StyleSheet.create({
  inset: {
    paddingHorizontal: 16,
    width: '100%',
  },
});

export default function Inset({ children, style }) {
  return <View style={[styles.inset, style]}>{children}</View>;
}

Inset.propTypes = {
  children: node,
  style: ViewPropTypes.style,
};
