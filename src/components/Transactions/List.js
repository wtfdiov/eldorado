import React from 'react';
import { FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import i18n from 'i18n-js';

import TransactionItem from './Item';

function TransactionList({ data, truncate, customStyle }) {
  const navigation = useNavigation();

  function openDetails(transactionId) {
    navigation.navigate('TransactionDetails', { transactionId });
  }

  function _keyExtractor(item) {
    return item.id;
  }

  if (Object.keys(data).length === 0) {
    return (
      <Text style={{ alignSelf: 'center', textAlign: 'center', margin: 10 }}>
        {i18n.t('common.components.transactionsList.noTransactions')}
      </Text>
    );
  }

  return (
    <FlatList
      data={truncate ? data.slice(0, truncate) : data}
      keyExtractor={_keyExtractor}
      renderItem={transactions => <TransactionItem transaction={transactions.item} onTouch={openDetails} />}
      style={{ ...customStyle }}
    />
  );
}

export default TransactionList;
