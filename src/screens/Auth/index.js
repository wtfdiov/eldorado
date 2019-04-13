import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Item } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import i18n from '../../../i18n';

import { tryAuth } from '../../store/actions/index';
import openModal from '../../navigation/openModal';

import Background from '../../assets/Background.png'
import NBRLogoLogin from '../../assets/NBRLogoLogin.png'

class AuthScreen extends Component {

  static navigatorStyle = {
    navBarHidden: true,
    backgroundColor: '#0be881'
  }

  state = {
    email: '',
    password: '',
    twoFactorAuthToken: ''
  }

  loginHandler = () => {
    const formData = {
      email: this.state.email,
      password: this.state.password,
      twoFactorAuthToken: this.state.twoFactorAuthToken
    }
    this.props.onLogin(formData);
  }

  render () {
    return (
      <ImageBackground source={Background} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

        <View style={{alignItems: 'center',}}>
          <Image style={styles.logo} source={NBRLogoLogin} />
        </View>

        <View style={styles.formContainer}>

          <Text style={styles.labelEmail}>{i18n.t('login.emailInputLabel')}</Text>
          <Item regular style={styles.textEmail}>
            <Input
              autoCorrect={false}
              onChangeText={email => this.setState({email})}
              value={this.state.email}
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid="transparent" />
          </Item>

          <Text style={styles.labelPassword}>{i18n.t('login.passwordInputLabel')}</Text>
          <Item regular style={styles.textPassword}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({password })}
              value={this.state.password}
              secureTextEntry />
          </Item>

          <Text style={styles.label2FA}>{i18n.t('login.2FAInputLabel')}</Text>
          <Item regular style={styles.text2FA}>
            <Input
              autoCorrect={false}
              onChangeText={twoFactorAuthToken => this.setState({twoFactorAuthToken})}
              value={this.state.twoFactorAuthToken}
              autoCapitalize="none"
              keyboardType="numeric"  />
          </Item>

          <Button
          success
            block
            onPress={this.loginHandler}
            disabled={!this.state.email || !/\S+@\S+\.\S+/.test(this.state.email) || !this.state.password || this.props.loading}
            style={{
              marginVertical: 20,
            }}
          >
            {this.props.loading
              ? (<ActivityIndicator color="white" />)
              : (<Text style={{ color: '#FFFFFF', fontSize: 16}}>{i18n.t('login.signInBtnLabel')}</Text>)
            }
          </Button>

        </View>

        <View style={styles.containerButtonsBottom}>
          <View>
            <Button transparent light onPress={() => openModal('eldorado.screens.Register')}>
              <Icon color="#FFFFFF" name="ios-person-add" size={18} />
              <Text style={{color: '#FFFFFF'}}  > {i18n.t('login.signUpBtnLabel')}</Text>
            </Button>
          </View>
          <View style={{borderRightWidth: 1, borderColor: '#FFFFFF', height: 40}}>
          </View>
          <View>
            <Button transparent light onPress={() => openModal('eldorado.screens.Forgot')}>
              <Icon color="#FFFFFF" name="ios-key" size={18} />
              <Text style={{color: '#FFFFFF' }}> {i18n.t('login.resetPasswordBtnLabel')}</Text>
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
    height: height * 0.3,
    width: width * 0.4,
    justifyContent: 'center',
  },

  formContainer: {
    width: '90%'
  },

  labelEmail: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },

  labelPassword: {
    marginTop: 15,
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },

  label2FA: {
    marginTop: 15,
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },

  textEmail: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#31711F'
  },

  textPassword: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#31711F'
  },

  text2FA: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#31711F'
  },

  containerButtonsBottom: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  }
});

const mapStateToProps = state => ({
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (formData) => dispatch(tryAuth(formData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);