import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Label, Input, Item, Button } from 'native-base';
import axios from 'axios';

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
      .then(resp => alert('Password reset', `We have sent you an email with instructions to reset your password`))
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
          <Text>If you do not remember your password, here you can reset it typing your email in the field below.</Text>
          <Item regular>
            <Label style={styles.labels}>Email</Label>
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
            }}>RESET PASSWORD</Text> 
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