import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import { shape, func, string } from 'prop-types';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ViewContainer from '../components/ViewContainer';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

export default function VerificationScreen({ route, navigation }) {
  const [message, showMessage] = React.useState({
    text: '',
  });
  const { verificationId } = route.params;
  const [verificationCode, setVerificationCode] = React.useState('');
  return (
    <ViewContainer>
      <View style={styles.separator} />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode,
            );
            await AsyncStorage.setItem('userToken', credential.providerId);
            await firebase.auth().signInWithCredential(credential);
            showMessage({ text: 'Phone authentication successful' });
            navigation.navigate('Root');
          } catch (err) {
            showMessage({ text: `Error: ${err.message}` });
          }
        }}
      />
      {message && (
        <TouchableOpacity onPress={() => showMessage({ text: '' })}>
          <Text
            style={{
              color: 'blue',
              fontSize: 17,
              textAlign: 'center',
              margin: 20,
            }}
          >
            {message.text}
          </Text>
        </TouchableOpacity>
      )}
    </ViewContainer>
  );
}

VerificationScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }),
  route: shape({ params: shape({ verificationId: string }) }),
};
