import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import * as Linking from 'expo-linking';

export default function AuthLoadingScreen({ navigation }) {
  useFocusEffect(() => {
    async function getUserToken() {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Root');
        Linking.getInitialURL().then(url => {
          if (url) {
            const { queryParams } = Linking.parse(url);
            if (queryParams.uuid) {
              navigation.push('TreeDetails', { uuid: queryParams.uuid });
            }
          }
        });
      }
    }
    getUserToken();
  });

  return null;
}
