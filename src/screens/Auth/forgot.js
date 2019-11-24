import React, { useState, useCallback } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import axios from 'axios';
import i18n from 'i18n-js';

import { Surface, Text, Headline, Button, TextInput } from 'react-native-paper';

import { config } from '../../../app.json';

const { height, width } = Dimensions.get('window');

function ForgotScreen() {
  const [email, setEmail] = useState('');

  const forgotHandler = useCallback(() => {
    axios
      .post(`${config.api}/notifications`, {
        email,
        type: 'reset-password'
      })
      .then(resp => alert(i18n.t('resetPassword.title'), i18n.t('resetPassword.requestMessages.resetPasswordSuccess')))
      .catch(error => alert(error.message));
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Surface style={styles.surface}>
        <Headline>{i18n.t('resetPassword.title').toUpperCase()}</Headline>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Text>{i18n.t('resetPassword.desc')}</Text>

          <TextInput
            mode="outlined"
            autoCapitalize="none"
            label={i18n.t('resetPassword.emailInputLabel')}
            onChangeText={email => setEmail(email)}
            value={email}
            style={{ marginVertical: 12 }}
          />

          <Button onPress={forgotHandler} disabled={!email || !/\S+@\S+\.\S+/.test(email)}>
            {i18n.t('resetPassword.resetPasswordBtnLabel')}
          </Button>
        </ScrollView>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 12,
    height: height * 0.8,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 9,
    borderRadius: 10
  }
});

export default ForgotScreen;
