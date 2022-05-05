import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { func, shape } from 'prop-types';
import { View, Pressable, Text, Image } from 'react-native';

import Inset from '../components/Inset';
import ViewContainer from '../components/ViewContainer';

import BeepLogo from '/Users/kenneth/Desktop/bp/alemany/assets/images/beep.png';

import { Linking } from 'react-native';

export default function SettingsScreen({ navigation }) {
  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('AuthLoading');
  };
  return (
    <ViewContainer>
      <Inset>
        <Pressable style={{ width: '100%' }} title="Sign out" onPress={signOut}>
          <View
            style={{
              marginTop: 10,
              padding: 20,
              borderRadius: 8,
              backgroundColor: '#eaeaef',
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: '600', textAlign: 'center' }}
            >
              Sign out
            </Text>
          </View>
        </Pressable>
        <Text
          style={{
            marginTop: 20,
            color: '#777',
          }}
        >
          Built by Cal Blueprint.
        </Text>
        <Image source={BeepLogo} />
        <View
          style={{ position: 'relative', width: '100%', height: '100%' }}
        ></View>
      </Inset>
    </ViewContainer>
  );
}

SettingsScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }),
};
