import * as React from 'react';
import { useEffect } from 'react';

import {
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifierModal,
} from 'expo-firebase-recaptcha';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Title } from 'react-native-paper';

import ViewContainer from 'components/ViewContainer';
import { config } from 'src/database/firebase';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

export default function Login({ navigation }) {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [verificationId, setVerificationId] = React.useState('');
  const [message, showMessage] = React.useState({
    text: '',
  });
  const attemptInvisibleVerification = false;

  useEffect(() => {
    if (verificationId) {
      showMessage({
        text: 'Verification code has been sent to your phone.',
      });
      navigation.navigate('Verify', {
        verificationId,
      });
    }
  }, [verificationId, navigation]);

  return (
    <ViewContainer>
      <Title>Login Screen</Title>
      <View style={styles.separator} />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={config}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={insertNumber => setPhoneNumber(insertNumber)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            // eslint-disable-next-line no-shadow
            const tempVerificationID = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current,
            );
            setVerificationId(tempVerificationID);
          } catch (err) {
            showMessage({ text: `Error: ${err.message}` });
          }
        }}
      />
      {message ? (
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
      ) : undefined}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      <Button title="BYPASS" onPress={() => navigation.navigate('Root')} />
    </ViewContainer>
  );
}
