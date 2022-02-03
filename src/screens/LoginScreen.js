import * as React from 'react';
import { useEffect } from 'react';

import {
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifierModal,
} from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Title } from 'react-native-paper';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/react-native-input';

import ViewContainer from '../components/ViewContainer';
import { checkPhoneNumber, config } from '../database/firebase';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

export default function LoginScreen({ navigation }) {
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

  function checkNumber(num) {
    if (isPossiblePhoneNumber(num)) {
      setPhoneNumber(num);
    }
  }
  return (
    <ViewContainer topPadding>
      <Title>Login Screen</Title>
      <View style={styles.separator} />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={config}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <PhoneInput
        defaultCountry="US"
        placeholder="(123) 456 - 7899"
        onChange={number => checkNumber(number)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          try {
            const authorizedPhoneNumber = await checkPhoneNumber(phoneNumber);
            if (authorizedPhoneNumber) {
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              const tempVerificationID = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current,
              );
              setVerificationId(tempVerificationID);
            } else {
              showMessage({
                text: 'Error: the phone number entered is not authorized to create an account. Please contact an Alemany Farm administrator for authorization.',
              });
            }
          } catch (err) {
            showMessage({ text: `Error: ${err.message}` });
          }
        }}
      />
      {/* FOR TESTING PURPOSES: Bypass checking if the phone number is in the
      Users table (entered via Retool dashboard) */}
      <Button
        title="Send Verification Code [authorization bypass]"
        disabled={!phoneNumber}
        onPress={async () => {
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
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
    </ViewContainer>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
  }),
};
