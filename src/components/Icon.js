import * as React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { func, number, string } from 'prop-types';
import { StyleSheet, Pressable, ViewPropTypes } from 'react-native';

const styles = StyleSheet.create({
  default: {},
});

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export default function Icon({
  onPress = null,
  size = 25,
  style = styles.default,
  color = '#333333',
  ...props
}) {
  const icon = (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Ionicons size={size} style={style} color={color} {...props} />
  );

  return (
    <Pressable disabled={!onPress} onPress={onPress ?? null}>
      {icon}
    </Pressable>
  );
}

Icon.propTypes = {
  onPress: func,
  size: number,
  style: ViewPropTypes.style,
  color: string,
};
