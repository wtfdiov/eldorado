import React from 'react';
import { Text } from 'react-native';
import { Picker } from 'native-base';

import i18n from 'i18n-js';

import shortfyAddress from '../../../helpers/shortfyAddress';
import formatNBR from '../../../helpers/formatNBR';

function WalletSelector({ wallets, selected, onSelect }) {
  if (!Object.keys(wallets).length > 0) {
    return <Text style={{ color: 'white' }}>{i18n.t('common.components.walletPicker.noWallets')}</Text>;
  }

  return (
    <Picker
      note
      mode="dropdown"
      style={{ width: '80%', color: 'white' }}
      selectedValue={selected}
      onValueChange={address => onSelect(address)}
      itemStyle={{
        flex: 1
      }}
    >
      <Picker.Item key="9999" label={i18n.t('common.components.walletPicker.allWallets')} value={null} />
      {wallets.map(wallet => (
        <Picker.Item
          key={wallet.id}
          label={`${shortfyAddress(wallet.address, 6)} (${formatNBR(wallet.balance.available)})`}
          value={wallet.address}
        />
      ))}
    </Picker>
  );
}

export default WalletSelector;
