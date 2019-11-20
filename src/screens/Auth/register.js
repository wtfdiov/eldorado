import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import i18n from 'i18n-js';

import { connect } from 'react-redux';
import { signUp } from '../../store/actions/index';

import { Surface, Text, Headline, Button, TextInput } from 'react-native-paper';

const { height, width } = Dimensions.get('window');

class RegisterScreen extends PureComponent {
  static options() {
    return {
      topBar: {
        drawBehind: true,
        elevation: 0,
        background: {
          color: 'transparent'
        }
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };
    this.initialState = this.state;
  }

  registerHandler = () => {
    this.props.onRegister(this.state);
    this.resetForm();
  };

  resetForm() {
    this.setState(this.initialState);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Surface style={styles.surface}>
          <Headline>{i18n.t('signUp.title').toUpperCase()}</Headline>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <Text>{i18n.t('signUp.desc')}</Text>

            <TextInput
              mode="outlined"
              label={i18n.t('signUp.nameInputLabel')}
              onChangeText={name => this.setState({ name })}
              value={this.state.name.toString()}
              style={{ marginTop: 12 }}
            />

            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              mode="outlined"
              label={i18n.t('signUp.emailInputLabel')}
              onChangeText={email => this.setState({ email })}
              value={this.state.email.toString()}
              style={{ marginTop: 12 }}
            />

            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry
              mode="outlined"
              label={i18n.t('signUp.passwordInputLabel')}
              onChangeText={password => this.setState({ password })}
              value={this.state.password.toString()}
              style={{ marginTop: 12 }}
            />

            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry
              mode="outlined"
              label={i18n.t('signUp.confirmPasswordInputLabel')}
              onChangeText={passwordConfirm =>
                this.setState({ passwordConfirm })
              }
              value={this.state.passwordConfirm.toString()}
              style={{ marginVertical: 12 }}
            />

            <Button
              onPress={this.registerHandler}
              loading={this.props.loading}
              disabled={
                !this.state.name ||
                !this.state.email ||
                !/\S+@\S+\.\S+/.test(this.state.email) ||
                !this.state.password ||
                !this.state.passwordConfirm
              }
            >
              {i18n.t('signUp.signUpBtnLabel')}
            </Button>
          </ScrollView>
        </Surface>
      </View>
    );
  }
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

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: formData => dispatch(signUp(formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
