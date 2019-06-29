import React, { Component } from 'react';
import { ToastAndroid, Clipboard, View, Text, Image } from 'react-native';
import { Button } from 'native-base';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from 'i18n-js';

import { connect } from 'react-redux';

import {
  selectWallet,
  createWallet,
  deleteWallet
} from '../../../store/actions';

import logo from '../../../assets/logo-nbr.png';

import WalletSelector from './WalletSelector';

class WalletPicker extends Component {
  constructor(props) {
    super(props);

    this.props.onSelect = this.props.onSelect.bind(this);
  }

  copyToClipboard = async () => {
    await Clipboard.setString(this.props.selected);
    ToastAndroid.show(
      i18n.t('common.components.walletPicker.addressCopied'),
      ToastAndroid.SHORT
    );
  };

  sendButtonHandler = async () => {
    Navigation.mergeOptions('mainTabs', {
      bottomTabs: {
        currentTabId: 'SEND_TAB'
      }
    });
  };

  render = () => {
    const primaryColor = '#006e6e';
    return (
      <View style={{ width: '100%' }}>
        <View
          style={[
            {
              flexDirection: 'row',
              backgroundColor: primaryColor,
              justifyContent: 'space-around',
              alignItems: 'center'
            }
          ]}
        >
          <Image source={logo} style={{ height: 38, width: 32, margin: 5 }} />
          <WalletSelector
            loading={this.props.loading}
            wallets={this.props.wallets}
            selected={this.props.selected}
            onSelect={this.props.onSelect}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 5
          }}
        >
          <Button transparent light onPress={() => this.props.onNewWallet()}>
            <Icon color={primaryColor} name="md-add" size={24} />
            <Text style={{ color: primaryColor }}>
              {' '}
              {i18n.t('common.components.walletPicker.newWalletBtnLabel')}
            </Text>
          </Button>

          {this.props.selected ? (
            <Button transparent light onPress={() => this.copyToClipboard()}>
              <Icon color={primaryColor} name="ios-copy" size={24} />
            </Button>
          ) : null}

          {this.props.selected ? (
            <Button transparent light onPress={() => this.sendButtonHandler()}>
              <Icon color={primaryColor} name="ios-send" size={24} />
            </Button>
          ) : null}

          {this.props.selected &&
          !this.props.wallets.find(
            wallet => wallet.address === this.props.selected
          ).balance.available &&
          !this.props.wallets.find(
            wallet => wallet.address === this.props.selected
          ).balance.locked ? (
            <Button
              transparent
              light
              onPress={() => this.props.onDeleteWallet(this.props.selected)}
            >
              <Icon color={primaryColor} name="ios-trash" size={24} />
            </Button>
          ) : null}
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {
    loading: state.wallets.loading,
    wallets: state.wallets.wallets,
    selected: state.wallets.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelect: wallet => dispatch(selectWallet(wallet)),
    onNewWallet: () => dispatch(createWallet()),
    onDeleteWallet: address => dispatch(deleteWallet(address))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletPicker);
