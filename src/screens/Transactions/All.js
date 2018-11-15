import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { fetchAllTransactions } from '../../store/actions';

import TransactionItem from '../../components/Transactions/Item';

class TransactionsAllScreen extends Component {

  componentDidMount () {
    this.props.onLoad();
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
            <TransactionItem transaction={transactions.item}  />
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