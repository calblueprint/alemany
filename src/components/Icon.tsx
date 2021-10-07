import * as React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Pressable } from 'react-native';

interface IconProps {
  onPress?: () => void;
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color?: string;
  size?: number;
  style?: object;
}

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
export default function Icon(props: IconProps) {
  const { onPress, size, style } = props;
  const icon = <FontAwesome size={size} style={style} {...props} />;

  return (
    <Pressable
      onPress={onPress ?? null}
      style={({ pressed }) => (pressed ? styles.opaque : styles.fade)}
    >
      {icon}
    </Pressable>
  );
}

Icon.defaultProps = {
  onPress: null,
  size: 24,
  style: styles.default,
  color: '#333333',
};
