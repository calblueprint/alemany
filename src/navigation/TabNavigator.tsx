import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from 'constants/Colors';
import useColorScheme from 'hooks/useColorScheme';
import TabOneScreen from 'screens/TabOneScreen';
import TabTwoScreen from 'screens/TabTwoScreen';
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
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'hello < 3',
          tabBarIcon: ({ color }) => <Icon name="code" color={color} />,
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
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <Icon name="code" color={color} />,
        }}
      />
    </Navigator>
  );
}
