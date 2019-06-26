import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import axios from 'axios';
import i18n from '../../../i18n';

import { Surface, Text, Headline, Button, TextInput } from 'react-native-paper';

import { config } from '../../../app.json';

const { height, width } = Dimensions.get('window');

class ForgotScreen extends PureComponent {
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
      email: ''
    };
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'closeModal') {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  forgotHandler = () => {
    axios
      .post(`${config.api}/notifications`, {
        email: this.state.email,
        type: 'reset-password'
      })
      .then(resp =>
        alert(
          i18n.t('resetPassword.title'),
          i18n.t('resetPassword.requestMessages.resetPasswordSuccess')
        )
      )
      .catch(error => alert(error.message));
  };

  render() {
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
              onChangeText={email => this.setState({ email })}
              value={this.state.email.toString()}
              style={{ marginVertical: 12 }}
            />

            <Button
              onPress={this.forgotHandler}
              disabled={
                !this.state.email || !/\S+@\S+\.\S+/.test(this.state.email)
              }
            >
              {i18n.t('resetPassword.resetPasswordBtnLabel')}
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

const mapDispatchToProps = dispatch => {
  return {
    onForgot: () => null
  };
};

export default ForgotScreen;
