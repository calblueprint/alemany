import * as React from 'react';
import { useEffect } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import {
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifierModal,
} from 'expo-firebase-recaptcha';
import firebase from 'firebase';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { Title, withTheme } from 'react-native-paper';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/react-native-input';

import ViewContainer from 'components/ViewContainer';
import { config } from 'src/database/firebase';
import { Body, LargeTitle, Medium } from 'src/components/Text';
import { styles as inputStyles } from 'src/components/Inputs';
import { PrimaryButton } from 'src/components/Buttons';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

function Login({ theme, navigation }) {
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

  function checkNumber(num: string) {
    if (isPossiblePhoneNumber(num)) {
      setPhoneNumber(num);
    }
  }
  return (
    <ViewContainer topPadding>
      <View style={{ padding: 10, alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: '#e9f9d9',
            padding: 20,
            width: 100,
            height: 100,
            borderRadius: 20,
            marginVertical: 20,
          }}
        >
          <FontAwesome
            name="sign-in"
            size={60}
            style={{
              color: '#52BD41',
            }}
          />
        </View>
        <LargeTitle style={{ marginVertical: 10 }}>Log in</LargeTitle>
        <Body style={{ textAlign: 'center', marginBottom: 30 }}>
          Enter your phone number. You will receive a login code which you can
          enter in the next step.
        </Body>

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={config}
          attemptInvisibleVerification={attemptInvisibleVerification}
        />

        <Medium style={{ minWidth: '100%', marginVertical: 8 }}>
          Phone number
        </Medium>
        <PhoneInput
          defaultCountry="US"
          placeholder="(123) 456 - 7899"
          onChange={number => checkNumber(number)}
          style={inputStyles.short}
        />

        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}

        <PrimaryButton
          title="Send Verification Code"
          disabled={!phoneNumber}
          style={{ marginTop: 30 }}
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
        >
          Next
        </PrimaryButton>
      </View>
    </ViewContainer>
  );
}

export default withTheme(Login);
