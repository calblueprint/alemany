import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from 'constants/Colors';
import useColorScheme from 'hooks/useColorScheme';
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
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
          headerRight: () => (
            <Icon
              name="info-circle"
              onPress={() => navigation.navigate('Modal')}
              size={25}
              color={Colors[colorScheme].text}
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
    </Navigator>
  );
}
