import React, { PureComponent } from 'react';
import { Picker, Text, ActivityIndicator } from 'react-native';

import i18n from 'i18n-js';

import shortfyAddress from '../../../helpers/shortfyAddress';
import formatNBR from '../../../helpers/formatNBR';

class WalletSelector extends PureComponent {
  render() {
    if (this.props.loading) {
      return <ActivityIndicator />;
    }

    if (!Object.keys(this.props.wallets).length > 0) {
      return (
        <Text style={{ color: 'white' }}>
          {i18n.t('common.components.walletPicker.noWallets')}
        </Text>
      );
    }

    return (
      <Picker
        style={{ width: '80%', color: '#FFF' }}
        selectedValue={this.props.selected}
        onValueChange={address => this.props.onSelect(address)}
        itemStyle={{
          flex: 1
        }}
        iosHeader={i18n.t('common.select')}
        headerBackButtonText={i18n.t('common.cancel')}
      >
        <Picker.Item
          key="9999"
          label={i18n.t('common.components.walletPicker.allWallets')}
          value={null}
        />
        {this.props.wallets.map(wallet => (
          <Picker.Item
            key={wallet.id}
            label={`${shortfyAddress(wallet.address, 6)} (${formatNBR(
              wallet.balance.available
            )})`}
            value={wallet.address}
          />
        ))}
      </Picker>
    );
  }
}

export default WalletSelector;
