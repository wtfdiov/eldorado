import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/core';

import { useSelector, useDispatch } from 'react-redux';

import { fetchWalletsBalance, logout } from '../../store/actions';

import WalletStats from '../../components/Home/WalletStats';
import TransactionList from '../../components/Transactions/List';

import { COLORS } from '../../components/style';

function SummaryScreen() {
  useEffect(() => {
    dispatch(fetchWalletsBalance());
  }, []);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const balance = useSelector(state => state.wallets.balance);
  const selected = useSelector(state => state.wallets.selected);
  const selectedBalance = useSelector(state => state.wallets.selectedBalance);
  const transactions = useSelector(state => state.transactions.transactions);

  return (
    <ScrollView style={styles.container}>
      <WalletStats selected={selected} balance={selected ? selectedBalance : balance} />

      <TransactionList
        data={
          selected
            ? transactions.filter(
                transaction => transaction.from === selected.address || transaction.to.address === selected.address
              )
            : transactions
        }
        truncate={3}
        customStyle={{
          marginTop: 12,
          width: '100%',
          flexWrap: 'wrap'
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 10
        }}
      >
        <Button icon="settings" color={COLORS.primaryGreen} onPress={() => navigation.navigate('Config')}>
          {i18n.t('config.title')}
        </Button>

        <Button icon="exit-to-app" color={COLORS.primaryGreen} onPress={() => dispatch(logout())}>
          {i18n.t('home.logOutBtnLabel')}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.grayBg
  }
});

export default SummaryScreen;
