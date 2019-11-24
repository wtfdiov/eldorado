import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import i18n from 'i18n-js';
import { Text, Headline, Button, TextInput } from 'react-native-paper';

import { signUp } from '../../store/actions';
import { GAP } from '../../components/style';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);

  registerHandler = () => {
    const formData = {
      name,
      email,
      password,
      passwordConfirm
    };
    dispatch(signUp(formData));
    resetForm();
  };

  function resetForm() {
    setName('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          padding: GAP.default
        }}
      >
        <Text>{i18n.t('signUp.desc')}</Text>

        <TextInput
          mode="outlined"
          label={i18n.t('signUp.nameInputLabel')}
          onChangeText={name => setName(name)}
          value={name}
          style={{ marginTop: 12 }}
        />

        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          mode="outlined"
          label={i18n.t('signUp.emailInputLabel')}
          onChangeText={email => setEmail(email)}
          value={email}
          style={{ marginTop: 12 }}
        />

        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          mode="outlined"
          label={i18n.t('signUp.passwordInputLabel')}
          onChangeText={password => setPassword(password)}
          value={password}
          style={{ marginTop: 12 }}
        />

        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          mode="outlined"
          label={i18n.t('signUp.confirmPasswordInputLabel')}
          onChangeText={passwordConfirm => setPasswordConfirm(passwordConfirm)}
          value={passwordConfirm}
          style={{ marginVertical: 12 }}
        />

        <Button
          onPress={registerHandler}
          loading={isLoading}
          disabled={!name || !email || !/\S+@\S+\.\S+/.test(email) || !password || !passwordConfirm}
        >
          {i18n.t('signUp.signUpBtnLabel')}
        </Button>
      </ScrollView>
    </View>
  );
}

export default RegisterScreen;
