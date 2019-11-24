import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import TransactionList from '../../components/Transactions/List';
import { COLORS } from '../../components/style';

function TransactionsAllScreen() {
  const transactions = useSelector(state => state.transactions.transactions);
  return (
    <ScrollView style={styles.container}>
      <TransactionList data={transactions} />
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

export default TransactionsAllScreen;
