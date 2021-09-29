import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from 'constants/Colors';
import useColorScheme from 'hooks/useColorScheme';
import TabOneScreen from 'screens/TabOneScreen';
import TabTwoScreen from 'screens/TabTwoScreen';
import HomeScreen from 'src/screens/HomeScreen';
import TreeScreen from 'src/screens/TreeScreen';
import LoginScreen from 'src/screens/LoginScreen';
import { RootTabParamList, RootTabScreenProps } from '@types';

import Icon from 'components/Icon';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

export default function TabNavigator() {
  const { Navigator, Screen } = createBottomTabNavigator<RootTabParamList>();
  const colorScheme = useColorScheme();

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home Screen',
          tabBarIcon: ({ color }) => <Icon name="code" color={color} />,
        }}
      />
      <Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login Screen',
          tabBarIcon: ({ color }) => <Icon name="code" color={color} />,
        }}
      />
      <Screen
        name="Tree"
        component={TreeScreen}
        options={{
          title: 'Tree Screen',
          tabBarIcon: ({ color }) => <Icon name="code" color={color} />,
        }}
      />
    </Navigator>
  );
}
