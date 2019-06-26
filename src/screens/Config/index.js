import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Text, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import i18n from '../../../i18n';

import * as actions from '../../store/actions';

import componentStyle from '../../components/style';

import Title from '../../components/common/Title';
import TwoFactor from './TwoFactor';
import ChooseLanguage from './ChooseLanguage';

class ConfigScreen extends Component {

  static options(passProps) {
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

  componentDidMount() {
    this.props.check2fa();
  }

  render() {
    const { height, width } = Dimensions.get('window');
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={[{
        height: height * 0.8,
        width: width * 0.9,
        backgroundColor: 'white',
      },
      componentStyle.transactionCard, componentStyle.shadow]}>
        <ScrollView contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 10
        }}>
          <Title title={i18n.t('config.2FA.title')} />
          <TwoFactor
            isLoading={this.props.isLoading}
            twoFactorData={this.props.twoFactor}
            enable={this.props.enable2FA}
          />
          <Title title={i18n.t('config.language.title')} />
          <ChooseLanguage />
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

const mapStateToProps = state => ({
  isLoading: state.config.isLoading,
  twoFactor: state.config.twoFactor
});

const mapDispatchToProps = dispatch => {
  return {
    check2fa: () => dispatch(actions.check2FA()),
    enable2FA: (twoFactorAuthToken) => dispatch(actions.enable2FA(twoFactorAuthToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigScreen);