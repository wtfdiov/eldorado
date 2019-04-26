import React, { PureComponent } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { Picker } from 'native-base';

import i18n from '../../../../i18n';

import shortfyAddress from '../../../helpers/shortfyAddress';
import formatNBR from '../../../helpers/formatNBR';

class WalletSelector extends PureComponent {

  render() {
    if (this.props.loading) {
        return (<ActivityIndicator />)
    }

    if (!Object.keys(this.props.wallets).length > 0) {
        return (<Text style={{color: 'white'}}>{i18n.t('common.components.walletPicker.noWallets')}</Text>)
    }

    return (
        <Picker
          note
          mode="dropdown"
          style={{ width: '80%', color: 'white' }}
          selectedValue={this.props.selected}
          onValueChange={(address) => this.props.onSelect(address)}
          itemStyle={{
            flex: 1
          }}
        >
          <Picker.Item
            key="9999"
            label={`Todas as carteiras`} value={null}
          />
          {this.props.wallets.map(wallet => (
            <Picker.Item
              key={wallet.id}
              label={`${shortfyAddress(wallet.address, 6)} (${formatNBR(wallet.balance.available)})`} value={wallet.address}
            />
          ))}
        </Picker>
    );
  }
}

export default WalletSelector;