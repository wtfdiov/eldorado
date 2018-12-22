import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Label, Input, Item, Button } from 'native-base';
import axios from 'axios';
import i18n from '../../../i18n';

import { config } from '../../../app.json';

import componentStyle from '../../components/style';

class ForgotScreen extends PureComponent {

  static options (passProps) {
    return {
      topBar: {
        drawBehind: true,
        elevation: 0,
        background: {
          color: 'transparent'
        },
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'closeModal') {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  forgotHandler = () => {
    axios.post(`${config.api}/notifications`, {
      email: this.state.email,
      type: 'reset-password'
    })
      .then(resp => alert(i18n.t('resetPassword.title'), i18n.t('resetPassword.requestMessages.resetPasswordSuccess')))
      .catch(error => alert(error.message));
  }

  render() {
      const { height, width } = Dimensions.get('window');
      return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={[{
          height: height * 0.8,
          width: width * 0.9,
          backgroundColor: 'white',
      },
      componentStyle.transactionCard, componentStyle.shadow]}>
        <ScrollView contentContainerStyle={{
          flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 20
        }}>
          <Text>{i18n.t('resetPassword.desc')}</Text>
          <Item regular>
            <Label style={styles.labels}>{i18n.t('resetPassword.emailInputLabel')}</Label>
            <Input onChangeText={(email) => this.setState({email})} value={this.state.email.toString()} />
          </Item>

          <Button
            success
            block
            onPress={this.forgotHandler}
            disabled={!this.state.email || !/\S+@\S+\.\S+/.test(this.state.email)}
          >
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16
            }}>{i18n.t('resetPassword.resetPasswordBtnLabel')}</Text> 
          </Button>
        </ScrollView>
      </View>
      </View>
  }

}

const styles = StyleSheet.create({
  labels: {
    marginLeft: 5,
    fontSize: 12
  }
});

const mapDispatchToProps = dispatch => {
    return {
        onForgot: () => null,
    }
}

export default ForgotScreen;