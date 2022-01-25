import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
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
import { FontAwesome } from '@expo/vector-icons';
import { LargeTitle, Body, Medium } from 'src/components/Text';
import { ShortInput } from 'src/components/Inputs';
import { PrimaryButton } from 'src/components/Buttons';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

export default function Verify({ route, navigation }) {
  const [message, showMessage] = React.useState({
    text: '',
  });
  const { verificationId } = route.params;
  const [verificationCode, setVerificationCode] = React.useState('');
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
            name="unlock"
            size={60}
            style={{
              color: '#52BD41',
            }}
          />
        </View>
        <LargeTitle style={{ marginVertical: 10 }}>Enter code</LargeTitle>
        <Body style={{ textAlign: 'center', marginBottom: 30 }}>
          We just texted you a login code. Enter it here to log in.
        </Body>
        <Medium style={{ minWidth: '100%', marginVertical: 8 }}>Code</Medium>
        <ShortInput
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={setVerificationCode}
        />
        <PrimaryButton
          title="Confirm Verification Code"
          disabled={!verificationId}
          style={{ marginTop: 30 }}
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
        >
          Log in
        </PrimaryButton>
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
      </View>
    </ViewContainer>
  );
}
