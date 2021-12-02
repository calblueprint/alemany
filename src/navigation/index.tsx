/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommentModal from 'screens/CommentModal';

import { RootStackParamList } from '@types';
import ModalScreen from 'screens/ModalScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import LoginScreen from 'src/screens/LoginScreen';
import TreeDetailsScreen from 'src/screens/TreeDetailsScreen';
import VerificationScreen from 'src/screens/VerificationScreen';

import LinkingConfiguration from './LinkingConfiguration';
import TabNavigator from './TabNavigator';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
function RootNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { Navigator, Screen, Group } = Stack;

  return (
    <Navigator>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Verify" component={VerificationScreen} />
      <Screen
        name="Root"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Screen
        name="TreeDetails"
        component={TreeDetailsScreen}
        options={{
          title: 'View Tree',
        }}
      />
      <Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Group screenOptions={{ presentation: 'modal' }}>
        <Screen name="Modal" component={ModalScreen} />
      </Group>
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
