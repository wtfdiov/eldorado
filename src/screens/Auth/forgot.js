import React, { useState, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import axios from 'axios';
import i18n from 'i18n-js';

import { Text, Button, TextInput } from 'react-native-paper';

import { config } from '../../../app.json';

import { GAP } from '../../components/style';

function ForgotScreen() {
  const [email, setEmail] = useState('');

  const forgotHandler = useCallback(() => {
    axios
      .post(`${config.api}/notifications`, {
        email,
        type: 'reset-password'
      })
      .then(() => alert(i18n.t('resetPassword.title'), i18n.t('resetPassword.requestMessages.resetPasswordSuccess')))
      .catch(error => alert(error.message));
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: GAP.default }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          paddingTop: GAP.default
        }}
      >
        <Text>{i18n.t('resetPassword.desc')}</Text>

        <TextInput
          mode="outlined"
          autoCapitalize="none"
          label={i18n.t('resetPassword.emailInputLabel')}
          onChangeText={email => setEmail(email)}
          value={email}
          style={{ marginVertical: GAP.default }}
        />

        <Button onPress={forgotHandler} disabled={!email || !/\S+@\S+\.\S+/.test(email)}>
          {i18n.t('resetPassword.resetPasswordBtnLabel')}
        </Button>
      </ScrollView>
    </View>
  );
}

export default ForgotScreen;
