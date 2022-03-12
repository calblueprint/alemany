import React from 'react';

import { func, bool, node } from 'prop-types';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 4,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: {
      x: 0,
      y: 4,
    },
    shadowRadius: 7,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

function Button({ children, onPress, active }) {
  return (
    <Pressable
      style={StyleSheet.compose([
        styles.button,
        { backgroundColor: active ? '#52bd41' : '#fff' },
      ])}
      onPress={onPress}
    >
      <Text
        style={StyleSheet.compose([
          styles.text,
          { color: active ? '#fff' : null },
        ])}
      >
        {children}
      </Text>
    </Pressable>
  );
}
Button.propTypes = {
  children: node,
  onPress: func,
  active: bool,
};

export default function ViewToggle({ isListView, setIsListView }) {
  return (
    <View style={styles.wrapper}>
      <Button onPress={() => setIsListView(false)} active={!isListView}>
        Map
      </Button>
      <Button onPress={() => setIsListView(true)} active={isListView}>
        List
      </Button>
    </View>
  );
}

ViewToggle.propTypes = {
  setIsListView: func,
  isListView: bool,
};
