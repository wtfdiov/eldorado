import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Label, Input, Item, Button } from 'native-base';
import i18n from '../../../i18n';

import { connect } from 'react-redux';
import { signUp } from '../../store/actions/index';

import componentStyle from '../../components/style';

class RegisterScreen extends PureComponent {

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
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    }
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'closeModal') {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  registerHandler = () => {
    this.props.onRegister(this.state);
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
          <Text>{i18n.t('signUp.desc')}</Text>
          <Item regular>
            <Label style={styles.labels}>{i18n.t('signUp.nameInputLabel')}</Label>
            <Input onChangeText={(name) => this.setState({name})} value={this.state.name.toString()} />
          </Item>
          <Item regular>
            <Label style={styles.labels}>{i18n.t('signUp.emailInputLabel')}</Label>
            <Input onChangeText={(email) => this.setState({email})} value={this.state.email.toString()} />
          </Item>
          <Item regular>
            <Label style={styles.labels}>{i18n.t('signUp.passwordInputLabel')}</Label>
            <Input onChangeText={(password) => this.setState({password})} value={this.state.password.toString()} />
          </Item>
          <Item regular>
            <Label style={styles.labels}>{i18n.t('signUp.confirmPasswordInputLabel')}</Label>
            <Input onChangeText={(passwordConfirm) => this.setState({passwordConfirm})} value={this.state.passwordConfirm.toString()} />
          </Item>

          <Button
            success
            block
            onPress={this.registerHandler}
            disabled={!this.state.name || !this.state.email || !/\S+@\S+\.\S+/.test(this.state.email) || !this.state.password || !this.state.passwordConfirm}
          >
            {this.props.loading
            ?
            <ActivityIndicator color="white" />
            :
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16
            }}>{i18n.t('signUp.signUpBtnLabel')}</Text>
            }

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

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (formData) => dispatch(signUp(formData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);