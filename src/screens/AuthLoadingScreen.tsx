import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/core';

export default function AuthLoadingScreen({ navigation }) {
  useFocusEffect(() => {
    async function getUserToken() {
      const userToken = await AsyncStorage.getItem('userToken');
      navigation.navigate(userToken ? 'Root' : 'Login');
    }
    getUserToken();
  });

  return null;
}
