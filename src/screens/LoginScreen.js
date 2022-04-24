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
import {
  Pressable,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import LoginScreenIcon from '../components/LoginScreenIcon';
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
    marginRight: 12,
    marginLeft: 12,
    textAlign: 'center',
    fontSize: 17,
    color: '#777',
  },
  captionPhoneNumber: {
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'right',
    marginTop: 10,
    marginRight: 12,
    marginLeft: 12,
    fontSize: 17,
    color: 'black',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 15,
    padding: 15,
    fontSize: 18,
    position: 'relative',
    width: '94%',
    maxWidth: 800,
    borderWidth: 2,
    borderColor: '#52bd41',
    borderRadius: 8,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#52bd41',
    position: 'relative',
    width: '94%',
    bottom: 0,
    marginBottom: '3%',
    marginLeft: '3%',
  },
  startLeft: {
    width: '100%',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  backgroundWhite: {
    backgroundColor: 'white',
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
      if (phoneNumber.length === 9) {
        setMessage({ text: 'Invalid phone number' });
      }

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
    }
  };

  return (
    <View className={styles.padding}>
      <Pressable style={styles.button} onPress={onPress} title="buttonForPhone">
        <Text style={styles.text}>Next</Text>
      </Pressable>
    </View>
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
        phoneNumber,
        //ADD ALL ADDTIONAL METHODS HERE!
      });
    }
  }, [verificationId, phoneNumber, navigation]);

  const setFormattedPhoneNumber = input => {
    if (input.length < phoneNumber.length) {
      setPhoneNumber(input);
      return;
    }
    const formatted = new AsYouType('US').input(input);
    setPhoneNumber(formatted);
  };

  const onChange = (text) => {
    var cleaned = ("" + text).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "",
        number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      return number;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ViewContainer topPadding>
          <LoginScreenIcon login />
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
          <View style={styles.startLeft}>
            <View style={styles.textStart}>
              <Text style={styles.captionPhoneNumber}>Phone Number</Text>
            </View>
          </View>
          <TextInput
            inputType="tel"
            style={styles.input}
            placeholder="(123) 456-7890"
            placeholderTextColor="#777"
            onChangeText={setFormattedPhoneNumber}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChange={onChange}
          />

          {message ? (
            <Text
              style={{
                color: 'red',
                fontSize: 17,
                textAlign: 'center',
                margin: 20,
              }}
            >
              {message.text}
            </Text>
          ) : null}
        </ViewContainer>

        <VerifyButton
          phoneNumber={phoneNumber}
          setMessage={setMessage}
          setVerificationId={setVerificationId}
          recaptchaVerifier={recaptchaVerifier}
        />

        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </View>
    </TouchableWithoutFeedback>
  );
}

LoginScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }),
};
