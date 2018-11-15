import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';

import TransactionItem from '../../components/Transactions/Item';

class ReceivedTransactionsScreen extends Component {

  openModal = (transactionId) => {
    this.props.navigator.showModal({
      screen: 'eldorado.screens.Transactions.Details',
      title: "Detalhes",
      passProps: {
        transactionId
      },
      animationType: 'slide-up'
    });
  }

  _keyExtractor = (item) => item.id;

  render () {
    if (!Object.keys(this.props.transactions).length > 0) {
      return null
    }

    return (
      <ScrollView>
        <FlatList 
          data={this.props.transactions}
          keyExtractor={this._keyExtractor}
          renderItem={transactions => (
            <TransactionItem transaction={transactions.item} onTouch={this.openModal} />
          )}
        />
      </ScrollView>
    );
  }

}

const mapStateToProps = state => {
  return {
    transactions: state.transactions.transactions.filter(transaction => transaction.to.amount >= 0)
  }
}

export default connect(mapStateToProps, null)(ReceivedTransactionsScreen);