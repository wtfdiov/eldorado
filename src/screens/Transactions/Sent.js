import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { Text, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';

import TransactionItem from '../../components/Transactions/Item';

class TransactionsSentScreen extends Component {

  openModal = (transactionId) => {
    Navigation.push(this.props.componentId, {
      screen: 'eldorado.screens.Transactions.Details',
      title: "Detalhes",
      passProps: {
        transactionId
      },
    });
  }

  _keyExtractor = (item) => item.id;

  render () {
    if (!Object.keys(this.props.transactions).length > 0) {
      return (<Text>Você ainda não enviou nenhuma transação.</Text>)
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
    transactions: state.transactions.transactions.filter(transaction => transaction.to.amount < 0)
  }
}

export default connect(mapStateToProps, null)(TransactionsSentScreen);