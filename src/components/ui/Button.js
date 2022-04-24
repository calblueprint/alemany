import React from 'react';

import { func, string } from 'prop-types';
import { Pressable, Text, View } from 'react-native';

export default function Button({
  onPress,
  backgroundColor = '#eaeaef',
  color = '#000',
  borderColor = 'transparent',
  title = 'Button',
}) {
  return (
    <Pressable style={{ width: '100%' }} title={title} onPress={onPress}>
      <View
        style={{
          marginTop: 10,
          padding: 20,
          borderRadius: 8,
          backgroundColor,
          borderColor,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
            color,
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
Button.propTypes = {
  onPress: func,
  backgroundColor: string,
  color: string,
  borderColor: string,
  title: string,
};
