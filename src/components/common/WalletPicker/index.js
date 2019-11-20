import React, { Component } from 'react';
import {
  ToastAndroid,
  Clipboard,
  View,
  Text,
  Image,
  ActivityIndicator
} from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from 'i18n-js';
import { IconButton } from 'react-native-paper';

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

    this.selectWallet = this.selectWallet.bind(this);
  }

  copyToClipboard = async () => {
    await Clipboard.setString(this.props.selected.address);
    ToastAndroid.show(
      i18n.t('common.components.walletPicker.addressCopied'),
      ToastAndroid.SHORT
    );
  };

  sendButtonHandler = async () => {
    //navigate to send tab
  };

  selectWallet(address) {
    const wallet = this.props.wallets.find(
      wallet => wallet.address === address
    );
    this.props.onSelect(wallet);
  }

  render = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 80,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {this.props.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Image source={logo} style={{ height: 48, width: 42 }} />
          )}
        </View>
        <View
          style={{
            width: '80%',
            justifyContent: 'space-around'
          }}
        >
          <WalletSelector
            loading={this.props.loading}
            wallets={this.props.wallets}
            selected={this.props.selected && this.props.selected.address}
            selectWallet={this.selectWallet}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 30
            }}
          >
            <Button transparent light onPress={() => this.props.onNewWallet()}>
              <Icon name="md-add" size={24} />
              <Text>
                {' '}
                {i18n.t('common.components.walletPicker.newWalletBtnLabel')}
              </Text>
            </Button>

            {this.props.selected ? (
              <IconButton
                icon="content-copy"
                color="white"
                size={24}
                onPress={() => this.copyToClipboard()}
              />
            ) : null}

            {this.props.selected && this.props.selected.canDelete && (
              <IconButton
                icon="delete-forever"
                color="white"
                size={24}
                onPress={() => this.props.onDeleteWallet(this.props.selected)}
              />
            )}
          </View>
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
    onDeleteWallet: wallet => dispatch(deleteWallet(wallet))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletPicker);
