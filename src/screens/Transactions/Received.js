import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';

import TransactionItem from '../../components/Transactions/Item';

class ReceivedTransactionsScreen extends Component {

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
  }

  openModal = (transactionId) => {
    Navigation.push('main', {
      component: {
        name: 'eldorado.screens.Transactions.Details',
        passProps: {
          transactionId
        },
        options: {
          topBar: {
            background: {
              color: '#3ae374'
            },
            title: {
              text: 'Details'
            },
            backButton: {
              showTitle: false
            }
          },
        }
      }
    });
  }

  _keyExtractor = (item) => item.id;

  render () {
    if (!Object.keys(this.props.transactions).length > 0) {
      return (<Text>Você ainda não recebeu nenhuma transação.</Text>)
    }

    return (
      <ScrollView style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  }
});

const mapStateToProps = state => {
  return {
    transactions: state.transactions.transactions.filter(transaction => transaction.amount >= 0)
  }
}

export default connect(mapStateToProps, null)(ReceivedTransactionsScreen);