import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootTabParamList, RootTabScreenProps } from '@types';
import Icon from 'components/Icon';
import AddScreen from 'src/screens/AddScreen';
import HomeScreen from 'src/screens/HomeScreen';
import SearchScreen from 'src/screens/SearchScreen';
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
              name="sign-out"
              onPress={async () => {
                await AsyncStorage.removeItem('userToken');
                navigation.navigate('AuthLoading');
              }}
              size={25}
              style={{ marginRight: 15 }}
            />
          ),
          headerShown: false,
          gestureEnabled: false,
        })}
      />
      <Screen
        name="Add"
        component={AddScreen}
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <Icon name="plus" color={color} />,
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Icon name="search" color={color} />,
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Navigator>
  );
}
