/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from 'expo-linking';

const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Login: {
            screens: {
              LoginScreen: 'login',
            },
          },
          Trees: {
            screens: {
              TreeScreen: 'tree',
            },
          },
          Add: {
            screens: {
              AddScreen: 'add',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
