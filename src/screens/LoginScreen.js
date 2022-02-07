import * as React from 'react';
import { useEffect } from 'react';

import {
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifierModal,
} from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AsYouType, parsePhoneNumber } from 'libphonenumber-js';
import { any, func, node, shape, string } from 'prop-types';
import { Button, StyleSheet, Text, TextInput } from 'react-native';

import ViewContainer from '../components/ViewContainer';
import { checkPhoneNumber, config } from '../database/firebase';

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 50,
  },
  caption: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 17,
    color: '#777',
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
    padding: 15,
    fontSize: 18,
    width: '100%',
    borderWidth: 2,
    borderColor: '#52bd41',
    borderRadius: 8,
  },
});

function Title({ children = null }) {
  return <Text style={styles.heading}>{children}</Text>;
}
Title.propTypes = {
  children: node,
};

function e164ify(number) {
  return parsePhoneNumber(number, 'US').format('E.164');
}

function VerifyButton({
  phoneNumber,
  setMessage,
  setVerificationId,
  recaptchaVerifier,
}) {
  const onPress = async () => {
    // FIXME: Bypass checking if the phone number is in the
    // Users table (entered via Retool dashboard).
    const FIXME_BYPASS_MODE = true;
    try {
      const normalizedNumber = e164ify(phoneNumber);

      const authorizedPhoneNumber = await checkPhoneNumber(
        e164ify(normalizedNumber),
      );
      if (authorizedPhoneNumber || FIXME_BYPASS_MODE) {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const tempVerificationID = await phoneProvider.verifyPhoneNumber(
          normalizedNumber,
          recaptchaVerifier.current,
        );
        setVerificationId(tempVerificationID);
      } else {
        setMessage({
          text: 'Error: the phone number entered is not authorized to create an account. Please contact an Alemany Farm administrator for authorization.',
        });
      }
    } catch (err) {
      setMessage({ text: `Error: ${err.message}` });
    }
  };

  return (
    <Button
      title="Send Verification Code"
      disabled={!phoneNumber}
      onPress={onPress}
    />
  );
}
VerifyButton.propTypes = {
  phoneNumber: string,
  setMessage: func,
  setVerificationId: func,
  recaptchaVerifier: shape({
    // eslint-disable-next-line react/forbid-prop-types
    current: any,
  }),
};

export default function LoginScreen({ navigation }) {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [verificationId, setVerificationId] = React.useState('');
  const [message, setMessage] = React.useState({
    text: '',
  });
  const attemptInvisibleVerification = false;

  useEffect(() => {
    if (verificationId) {
      setMessage({
        text: 'Verification code has been sent to your phone.',
      });
      navigation.navigate('Verify', {
        verificationId,
      });
    }
  }, [verificationId, navigation]);

  const setFormattedPhoneNumber = input => {
    if (input.length < phoneNumber.length) {
      setPhoneNumber(input);
      return;
    }
    const formatted = new AsYouType('US').input(input);
    setPhoneNumber(formatted);
  };

  return (
    <ViewContainer topPadding>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={config}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />

      <Title>Log in</Title>
      <Text style={styles.caption}>
        Enter your phone number. You will receive a login code which you can
        enter in the next step.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="(123) 456-7890"
        placeholderTextColor="#777"
        onChangeText={setFormattedPhoneNumber}
        keyboardType="phone-pad"
        value={phoneNumber}
      />
      <VerifyButton
        phoneNumber={phoneNumber}
        setMessage={setMessage}
        setVerificationId={setVerificationId}
        recaptchaVerifier={recaptchaVerifier}
      />

      {message ? (
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
      ) : null}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </ViewContainer>
  );
}

LoginScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }),
};
