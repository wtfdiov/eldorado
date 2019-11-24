import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, ImageBackground, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import i18n from 'i18n-js';
import { TextInput, Button } from 'react-native-paper';

import { tryAuth } from '../../store/actions';

import Background from '../../assets/Background.png';
import NBRLogoLogin from '../../assets/NBRLogoLogin.png';

import { COLORS, GAP } from '../../components/style';

function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorAuthToken, setTwoFactorAuthToken] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);

  async function loginHandler() {
    const formData = {
      email,
      password,
      twoFactorAuthToken
    };
    await dispatch(tryAuth(formData));
  }

  return (
    <ImageBackground
      source={Background}
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <Image style={styles.logo} source={NBRLogoLogin} />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          autoCorrect={false}
          label={i18n.t('login.emailInputLabel')}
          value={email}
          onChangeText={email => setEmail(email)}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          label={i18n.t('login.passwordInputLabel')}
          value={password}
          onChangeText={password => setPassword(password)}
          style={{ marginTop: GAP.default }}
        />

        <TextInput
          autoCorrect={false}
          label={i18n.t('login.2FAInputLabel')}
          value={twoFactorAuthToken}
          onChangeText={twoFactorAuthToken => setTwoFactorAuthToken(twoFactorAuthToken)}
          keyboardType="numeric"
          style={{ marginTop: GAP.default }}
        />

        <Button
          icon="login"
          mode="contained"
          style={{ marginVertical: GAP.default }}
          onPress={loginHandler}
          loading={isLoading}
          contentStyle={{ height: 48 }}
          color={COLORS.primaryGreen}
          disabled={!email || !/\S+@\S+\.\S+/.test(email) || !password || isLoading}
        >
          {i18n.t('login.signInBtnLabel')}
        </Button>

        <View style={styles.containerButtonsBottom}>
          <Button mode="text" icon="account-plus" color="white" onPress={() => navigation.navigate('Register')}>
            {i18n.t('login.signUpBtnLabel')}
          </Button>

          <Button mode="text" icon="lock-reset" color="white" onPress={() => navigation.navigate('Forgot')}>
            {i18n.t('login.resetPasswordBtnLabel')}
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  logo: {
    height: height * 0.24,
    width: width * 0.4,
    justifyContent: 'center'
  },

  formContainer: {
    width: '80%'
  },

  containerButtonsBottom: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  }
});

export default AuthScreen;
