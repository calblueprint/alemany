import * as React from 'react';

import { func, bool } from 'prop-types';
import { View, Text, Pressable } from 'react-native';

export default function ViewToggle({ onToggle, isListView }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        borderRadius: 5,
        height: 50,
      }}
    >
      <Pressable
        sytle={{
          borderRadius: 8,
          padding: 20,
          width: '100%',
          margin: 50,
        }}
        onPress={() => onToggle(false)}
      >
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            backgroundColor: isListView ? 'white' : 'green',
            width: 150,
            height: 38,
          }}
        >
          Map
        </Text>
      </Pressable>
      <Pressable
        sytle={{
          borderRadius: 8,
          padding: 20,
          width: '100%',
          margin: 50,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
        onPress={() => onToggle(true)}
      >
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            backgroundColor: isListView ? 'green' : 'red',
            width: 150,
            height: 38,
          }}
        >
          List
        </Text>
      </Pressable>
    </View>
  );
}

ViewToggle.propTypes = {
  onToggle: func,
  isListView: bool,
};
