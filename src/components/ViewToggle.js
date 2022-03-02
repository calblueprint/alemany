import React from 'react';

import { func, bool } from 'prop-types';
import { View, Text, Keyboard } from 'react-native';
import Toggle from 'react-native-toggle-element';

export default function ViewToggle({ value, onToggle }) {
  return (
    <View
      style={{
        position: 'aboslute',
        width: 364,
        height: 49,
        margin: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <Toggle
        value={value}
        onPress={newState => onToggle(newState)}
        leftComponent={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Text
            style={{
              fontWeight: '600',
              fontSize: 17,
              color: value ? 'black' : 'white',
            }}
          >
            Map
          </Text>
        }
        rightComponent={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Text
            style={{
              fontWeight: '600',
              fontSize: 17,
              color: value ? 'white' : 'black',
            }}
          >
            List
          </Text>
        }
        trackBar={{ width: 380, height: 49, radius: 8 }}
        thumbButton={{
          width: 190,
          height: 41,
          radius: 13,
          activeBackgroundColor: '#52BD41',
          inActiveBackgroundColor: '#52BD41',
        }}
        thumbStyle={{ margin: 5 }}
        trackBarStyle={{ backgroundColor: 'white' }}
      />
    </View>
  );
}

ViewToggle.propTypes = {
  onToggle: func,
  value: bool,
};
