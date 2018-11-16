import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { ScrollView, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import { fetchAllTransactions } from '../../store/actions';

import TransactionItem from '../../components/Transactions/Item';

class TransactionsAllScreen extends Component {

  componentDidMount () {
    this.props.onLoad();
  }

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
      return (<Text>Você inda não movimentou nenhuma de suas carteiras.</Text>)
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
    transactions: state.transactions.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(fetchAllTransactions())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsAllScreen);