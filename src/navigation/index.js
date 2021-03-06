/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import RefineLocationScreen from '../screens/RefineLocationScreen';
import TreeScreen from '../screens/TreeScreen';
import VerificationScreen from '../screens/VerificationScreen';
import LinkingConfiguration from './LinkingConfiguration';
import TabNavigator from './TabNavigator';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
function RootNavigator() {
  const Stack = createNativeStackNavigator();
  const { Navigator, Screen } = Stack;
  const navigation = useNavigation();

  const handleDeepLinkingUrl = async event => {
    const { queryParams } = Linking.parse(event.url);
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      navigation.navigate('TreeScreen', { uuid: queryParams.uuid });
    } else {
      // TODO: remove this auth check once 'Guest Mode's is supported
      Alert.alert(
        'Authentication Requrired',
        'Log in/create an account to see this page.',
      );
    }
  };
  Linking.addEventListener('url', handleDeepLinkingUrl);

  return (
    <Navigator initialRouteName="AuthLoading">
      <Screen
        name="AuthLoading"
        component={AuthLoadingScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Screen
        name="RefineLocation"
        component={RefineLocationScreen}
        options={{
          title: 'Refine Location',
        }}
      />
      <Screen
        name="Login"
        options={{ headerShown: false, gestureEnabled: false }}
        component={LoginScreen}
      />
      <Screen name="Verify" component={VerificationScreen} />
      <Screen
        name="Root"
        component={TabNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Screen
        name="TreeScreen"
        component={TreeScreen}
        options={{
          title: 'View Tree',
        }}
      />
      <Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}
