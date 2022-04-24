import * as React from 'react';
import { useState, useRef } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import { shape, func, string } from 'prop-types';
import {
  Pressable,
  TouchableWithoutFeedback,
  Text,
  View,
  TextInput,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Title } from 'react-native-paper';


import LoginScreenIcon from '../components/LoginScreenIcon';
import ViewContainer from '../components/ViewContainer';

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: '6%',
  },
  caption: {
    marginTop: '2.3%',
    marginRight: 12,
    marginLeft: 12,
    textAlign: 'center',
    fontSize: 17,
    color: '#777',
  },
  captionPhoneNumber: {
    width: '100%',
    display: 'flex',
    textAlign: 'right',
    marginRight: 12,
    marginLeft: 12,
    fontSize: 17,
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  input: {
    textAlign: 'center',
    marginBottom: 15,
    marginRight: 7,
    marginLeft: 7,
    width: '94%',
    height: 50,
    fontSize: 18,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#52bd41',
    borderRadius: 8,
  },
  inputUnfocused: {
    textAlign: 'center',
    marginBottom: 15,
    marginRight: 7,
    marginLeft: 7,
    width: '94%',
    height: 50,
    fontSize: 18,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#ADB0B9',
    borderRadius: 8,
  },
  containerForVerificationInput: {
    padding: '2.3%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  codeResent: {
    padding: '2.3%',
    color: '#52bd41',
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
  startLeft: {
    width: '100%',
    alignItems: 'flex-start',
  },
  resendButton: {
    color: 'black',
    margin: '0%',
    padding: '0%',
    fontSize: 20,
  },
});

export default function VerificationScreen({ route, navigation }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [message, showMessage] = React.useState({
    text: '',
  });

  const { verificationId, phoneNumber } = route.params;
  const [finalVerifId, setfinalVerifId] = useState(verificationId)
  const [messageResent, setMessageResent] = useState(false);
  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  function SubmitButton() {
    return (
      <Pressable
        style={styles.button}
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          setVerificationCode(verificationCode);
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
            showMessage({ text: ` ${err}}` });
          }
        }
        }
      >
        <Text style={styles.text}>{'Log in'}</Text>
      </Pressable>
    );
  }

  function e164ify(number) {
    return parsePhoneNumber(number, 'US').format('E.164');
  }

  const ResendButton = () => {

    return (
      <Pressable>
        <Text
          onPress={async () => {
            const normalizedNumber = e164ify(phoneNumber);
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const tempVerificationID = await phoneProvider.verifyPhoneNumber(
              normalizedNumber,
              recaptchaVerifier.current,
            );
            setfinalVerifId(tempVerificationID);
          }
          }
          style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}
        >
          Resend
        </Text>
      </Pressable>
    )

  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ViewContainer topPadding>
          <LoginScreenIcon login={false} />
          <Title style={styles.heading}>Verification Screen</Title>
          <View style={styles.separator} />
          <Text style={styles.caption}>
            We just texted you a login code. Enter it here to log in.
          </Text>
          <View style={styles.startLeft}>
            <View style={styles.textStart}>
              <Text style={styles.captionPhoneNumber}>Code</Text>
            </View>
          </View>
          <View style={styles.containerForVerificationInput}>
            <TextInput
              style={focused ? styles.input : styles.inputUnfocused}
              editable={!!verificationId}
              placeholder={'123456'}
              placeholderTextColor="#777"
              keyboardType="numeric"
              onChangeText={setVerificationCode}
              maxLength={6}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text>{"Didn't get a code? "}</Text>
            <ResendButton />
          </View>
          {message && (
            <TouchableOpacity onPress={() => showMessage({ text: '' })}>
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
            </TouchableOpacity>
          )}
          {messageResent && <Text style={styles.codeResent}>CODE RESENT</Text>}
        </ViewContainer>
        <SubmitButton />
      </View>
    </TouchableWithoutFeedback>
  );
}

VerificationScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }),
  route: shape({ params: shape({ verificationId: string }) }),
};
