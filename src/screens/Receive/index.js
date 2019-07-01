import React, { Component, Fragment } from 'react';
import { Share, StyleSheet, ScrollView, Text } from 'react-native';
import { Button } from 'native-base';
import QRCode from 'react-qr-code';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from 'i18n-js';

import { connect } from 'react-redux';

class SendScreen extends Component {
  constructor(props) {
    super(props);
  }

  shareHandler = () => {
    Share.share(
      {
        message: `${this.props.selected.address}`,
        url: `${this.props.selected.address}`,
        title: i18n.t('receive.shareDialogTitle')
      },
      {
        dialogTitle: i18n.t('receive.shareDialogTitle')
      }
    );
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.props.selected ? (
          <QRCode value={this.props.selected.address} fgColor="#000" />
        ) : (
          <Fragment>
            <Icon name="ios-qr-scanner" size={120} color="#006e6e" />
          </Fragment>
        )}

        <Text style={{ textAlign: 'center' }}>
          {' '}
          {this.props.selected
            ? i18n.t('receive.walletQRDesc')
            : i18n.t('receive.noWalletMsg')}{' '}
        </Text>
        <Button
          iconLeft
          onPress={this.shareHandler}
          disabled={!this.props.selected}
          style={{
            padding: 10,
            alignSelf: 'center',
            backgroundColor: '#006e6e'
          }}
        >
          <Icon name="md-share" size={18} color="white" />
          <Text style={{ color: 'white', fontWeight: '600' }}>
            {' '}
            {i18n.t('receive.shareBtnLabel')}
          </Text>
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    wallets: state.wallets.wallets,
    selected: state.wallets.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendScreen);
