import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { func, shape } from 'prop-types';
import { Text } from 'react-native';

import Inset from '../components/Inset';
import Button from '../components/ui/Button';
import ViewContainer from '../components/ViewContainer';

export default function SettingsScreen({ navigation }) {
  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('AuthLoading');
  };
  return (
    <ViewContainer>
      <Inset>
        <Button onPress={signOut} title="Sign out" />
        <Text
          style={{
            marginTop: 20,
            color: '#777',
          }}
        >
          Built by Blueprint.
        </Text>
      </Inset>
    </ViewContainer>
  );
}

SettingsScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }),
};
