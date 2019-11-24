import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';

import IconWithInfo from '../common/IconWithInfo';
import NBR from '../common/DisplayValue/NBR';
import ConvertNBR from '../common/DisplayValue/ConvertNBR';

import componentStyles from '../style';

function WalletStats({ balance, selected }) {
  const { available, locked, total } = balance;

  const selectedTotal = available + locked;
  return (
    <View style={componentStyles.profileMetricsContainer}>
      <IconWithInfo
        title={i18n.t('common.components.walletStats.balance')}
        titleColor="#3E863D"
        displayIcon="ios-wallet"
        iconColor="#adb5bd"
        size={48}
        info={<NBR value={available} />}
      />

      <IconWithInfo
        title={i18n.t('common.components.walletStats.locked')}
        titleColor="#dc3545"
        iconColor="#adb5bd"
        displayIcon="md-lock"
        size={48}
        info={<NBR value={locked} />}
      />

      <IconWithInfo
        title={i18n.t('common.components.walletStats.valueUSD')}
        titleColor="#23BF08"
        displayIcon="logo-usd"
        iconColor="#adb5bd"
        size={48}
        info={<ConvertNBR to="USD" amount={selected ? selectedTotal : total} />}
      />

      <IconWithInfo
        title={i18n.t('common.components.walletStats.valueBTC')}
        titleColor="#6f42c1"
        displayIcon="logo-bitcoin"
        iconColor="#adb5bd"
        size={48}
        info={<ConvertNBR to="BTC" amount={selected ? selectedTotal : total} />}
      />
    </View>
  );
}

export default WalletStats;
