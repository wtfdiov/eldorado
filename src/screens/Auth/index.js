import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import { TextInput, Button } from 'react-native-paper';

import { tryAuth } from '../../store/actions/index';

import Background from '../../assets/Background.png';
import NBRLogoLogin from '../../assets/NBRLogoLogin.png';

import { COLORS } from '../../components/style';

class AuthScreen extends Component {

  state = {
    email: '',
    password: '',
    twoFactorAuthToken: ''
  };

  loginHandler = async () => {
    const formData = {
      email: this.state.email,
      password: this.state.password,
      twoFactorAuthToken: this.state.twoFactorAuthToken
    };
    await this.props.onLogin(formData);
  };

  render() {
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
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            label={i18n.t('login.passwordInputLabel')}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={{ marginTop: 12 }}
          />

          <TextInput
            autoCorrect={false}
            label={i18n.t('login.2FAInputLabel')}
            value={this.state.twoFactorAuthToken}
            onChangeText={twoFactorAuthToken =>
              this.setState({ twoFactorAuthToken })
            }
            keyboardType="numeric"
            style={{ marginTop: 12 }}
          />

          <Button
            icon="login"
            mode="contained"
            style={{ marginVertical: 12 }}
            onPress={this.loginHandler}
            loading={this.props.loading}
            contentStyle={{ height: 48 }}
            color={COLORS.secondaryGreen}
            disabled={
              !this.state.email ||
              !/\S+@\S+\.\S+/.test(this.state.email) ||
              !this.state.password ||
              this.props.loading
            }
          >
            {i18n.t('login.signInBtnLabel')}
          </Button>

          <View style={styles.containerButtonsBottom}>
            <Button
              mode="text"
              icon="account-plus"
              color="white"
              onPress={() => this.props.navigation.navigate('Register')}
            >
              {i18n.t('login.signUpBtnLabel')}
            </Button>

            <Button
              mode="text"
              icon="lock-reset"
              color="white"
              onPress={() => this.props.navigation.navigate('Forgot')}
            >
              {i18n.t('login.resetPasswordBtnLabel')}
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
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

const mapStateToProps = state => ({
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (formData, successCallback, errorCallback) => dispatch(tryAuth(formData, successCallback, errorCallback))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
