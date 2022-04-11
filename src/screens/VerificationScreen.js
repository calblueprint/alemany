import * as React from 'react';
import { useState, useRef } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import { shape, func, string } from 'prop-types';
import {
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Title } from 'react-native-paper';

import ViewContainer from '../components/ViewContainer';
import { Inter_200ExtraLight } from '@expo-google-fonts/inter';

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
    flexDirection: 'row'
  },
  input: {
    textAlign: 'center',
    marginBottom: 15,
    marginRight: 7,
    marginLeft: 7,
    width: '12.85%',
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
    width: 40,
    height: 50,
    fontSize: 18,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#ADB0B9',
    borderRadius: 8,
  },
  containerForVerficationInput: {
    padding: '2.3%',
    backgroundColor: "#ffffff",
    flexDirection: 'row'
  },
  codeResent: {
    padding: '2.3%',
    color: "#52bd41",
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
  }
});

export default function VerificationScreen({ route, navigation }) {
  const [message, showMessage] = React.useState({
    text: '',
  });

  const [verifCode, setVerifCode] = useState([])
  const [messageResent, setMessageResent] = useState(false)


  function VerficationFields({ inputRef, number, inputNextRef }) {
    const [focused, setFocused] = React.useState(false)
    const handleChange = (event) => {
      const inputNumber = event.target.value;
      verifCode[number] = inputNumber;
      setVerifCode(verifCode);
      inputNextRef.current.focus();
    };

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    return (
      <>
        <TextInput
          ref={inputRef}
          style={focused ? styles.input : styles.inputUnfocused}
          placeholder={number.toString()}
          value={verifCode[number]}
          placeholderTextColor="#777"
          keyboardType={'numeric'}
          maxLength={1}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </>
    )
  }

  function SubmitButton() {
    return (
      <Pressable
        style={styles.button}
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          const verifcationCode = verifCode.join();
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verifcationCode,
            );
            await AsyncStorage.setItem('userToken', credential.providerId);
            await firebase.auth().signInWithCredential(credential);
            showMessage({ text: 'Phone authentication successful' });
            navigation.navigate('Root');
          } catch (err) {
            setIsError(true);
            showMessage({ text: `Incorrect Code` });
          }
        }}
      ><Text style={styles.text}>Log in</Text></Pressable>

    );
  }
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);
  const input6 = useRef(null);
  const currentInput = useRef(null)

  const { verificationId } = true; // route.params;

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
              <Text style={styles.captionPhoneNumber}>
                Code
              </Text>
            </View>
          </View>
          <View style={styles.containerForVerficationInput}>
            <VerficationFields
              inputRef={input1}
              number={1}
              inputNextRef={input2}
            />
            <VerficationFields
              inputRef={input2}
              number={2}
              inputNextRef={input3}
            />
            <VerficationFields
              inputRef={input3}
              number={3}
              inputNextRef={input4}
            />
            <VerficationFields
              inputRef={input4}
              number={4}
              inputNextRef={input5}
            />
            <VerficationFields
              inputRef={input5}
              number={5}
              inputNextRef={input6}
            />
            <VerficationFields
              inputRef={input6}
              number={6}
              inputNextRef={input6}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text >
              {"\Didn't get a code? "}
            </Text>
            <Pressable>
              <Text onPress={() => {
                setMessageResent(true);


              }} style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
                Resend
              </Text>
            </Pressable>

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
      </View >
    </TouchableWithoutFeedback >
  );
}

VerificationScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }),
  route: shape({ params: shape({ verificationId: string }) }),
};
