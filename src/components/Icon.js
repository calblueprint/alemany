import * as React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { StyleSheet, Pressable, ViewPropTypes } from 'react-native';

const styles = StyleSheet.create({
  default: {
    marginRight: -3,
  },
  opaque: {
    opacity: 1,
  },
  fade: {
    opacity: 0.5,
  },
});

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export default function Icon(
  { onPress, size, style, ...props } = {
    onPress: null,
    size: 24,
    style: styles.default,
    color: '#333333',
  },
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const icon = <FontAwesome size={size} style={style} {...props} />;

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress ?? null}
      style={({ pressed }) => (pressed ? styles.opaque : styles.fade)}
    >
      {icon}
    </Pressable>
  );
}

Icon.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  style: ViewPropTypes.style,
};
