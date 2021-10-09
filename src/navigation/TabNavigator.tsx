import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootTabParamList, RootTabScreenProps } from '@types';
import Icon from 'components/Icon';
import AddScreen from 'src/screens/AddScreen';
import HomeScreen from 'src/screens/HomeScreen';
import LoginScreen from 'src/screens/LoginScreen';
import TreeScreen from 'src/screens/TreeScreen';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

export default function TabNavigator() {
  const { Navigator, Screen } = createBottomTabNavigator<RootTabParamList>();

  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
          headerRight: () => (
            <Icon
              name="info-circle"
              onPress={() => navigation.navigate('Modal')}
              size={25}
              style={{ marginRight: 15 }}
            />
          ),
        })}
      />
      <Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <Icon name="user" color={color} />,
        }}
      />
      <Screen
        name="Trees"
        component={TreeScreen}
        options={{
          title: 'Trees',
          tabBarIcon: ({ color }) => <Icon name="tree" color={color} />,
        }}
      />
      <Screen
        name="Add"
        component={AddScreen}
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <Icon name="plus" color={color} />,
        }}
      />
    </Navigator>
  );
}
