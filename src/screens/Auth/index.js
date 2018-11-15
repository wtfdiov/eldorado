import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Item } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'

import { tryAuth } from '../../store/actions/index';

import Background from '../../assets/Background.png'
import NBRLogoLogin from '../../assets/NBRLogoLogin.png'

class AuthScreen extends Component {

  static navigatorStyle = {
    navBarHidden: true,
    backgroundColor: '#0be881'
  }

  state = {
    loginForm: {
      email: '',
      password: '',
      twoFactorAuthToken: ''
    }
  }

  loginHandler = () => {
    const formData = {
      email: this.state.loginForm.email,
      password: this.state.loginForm.password,
      twoFactorAuthToken: this.state.loginForm.twoFactorAuthToken
    }
    this.props.onLogin(formData);
  }

  render () {
    return (
      <ImageBackground source={Background} style={{width: '100%', height: '100%'}}>

        <View style={{alignItems: 'center',}}>
          <Image style={styles.logo} source={NBRLogoLogin} />
        </View>

        <Text style={styles.labelEmail}>Enter your email</Text>
        <Item regular style={styles.textEmail}>
          <Input
            autoCorrect={false}
            onChangeText={email => this.setState({loginForm: { ...this.state.loginForm, email}})}
            value={this.state.loginForm.email}
            autoCapitalize="none"
            keyboardType="email-address"
            underlineColorAndroid="transparent" />
        </Item>

        <Text style={styles.labelPassword}>Enter your password</Text>
        <Item regular style={styles.textPassword}>
          <Input
            autoCorrect={false}
            onChangeText={password => this.setState({loginForm: { ...this.state.loginForm, password }})}
            value={this.state.loginForm.password}
            secureTextEntry />
        </Item>

        <Text style={styles.label2FA}>2FA</Text>
        <Item regular style={styles.text2FA}>
          <Input
            autoCorrect={false}
            onChangeText={twoFactorAuthToken => this.setState({loginForm: { ...this.state.loginForm, twoFactorAuthToken}})}
            value={this.state.loginForm.twoFactorAuthToken}
            autoCapitalize="none"
            keyboardType="numeric"  />
        </Item>

        <Button block style={styles.buttonSignIn} onPress={this.loginHandler}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 16
          }}>SIGN IN</Text>
        </Button>

        <View style={styles.cotainerButtonsBottom}>
          <View style={{flex: 1, borderRightWidth: 1, borderColor: '#FFFFFF'}}>
            <Button transparent light>
              <Icon color="#FFFFFF" name="ios-person-add" />
              <Text style={{color: '#FFFFFF'}}  > Create an account</Text>
            </Button>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button transparent light>
              <Icon color="#FFFFFF" name="ios-key" />
              <Text style={{color: '#FFFFFF' }}> Reset password</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    margin: 20,
    height: 250 * 0.7,
    width: 219 * 0.7,
    justifyContent: 'center',
  },

  labelEmail: {
    marginLeft: 12,
    fontSize: 14,
    marginRight: 15,
    marginBottom: 5,
    color: 'white',
  },

  labelPassword: {
    marginTop: 15,
    marginLeft: 12,
    fontSize: 14,
    marginRight: 15,
    marginBottom: 5,
    color: 'white',
  },

  label2FA: {
    marginTop: 15,
    marginLeft: 12,
    fontSize: 14,
    marginRight: 15,
    marginBottom: 5,
    color: 'white',
  },

  textEmail: {
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#31711F'
  },

  textPassword: {
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#31711F'
  },

  text2FA: {
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#31711F'
  },

  buttonSignIn: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#5B8A4E',
    backgroundColor: '#6FBE25',
  },

  cotainerButtonsBottom: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15
  }
});

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (formData) => dispatch(tryAuth(formData)),
    }
}

export default connect(null, mapDispatchToProps)(AuthScreen);