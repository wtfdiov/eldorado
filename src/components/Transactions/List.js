import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';

import TransactionItem from './Item';

class TransactionList extends Component {

  constructor(props) {
    super(props);
  }

  openDetails = (transactionId) => {
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

  render() {
    if (Object.keys(this.props.data).length === 0) {
      return (
        <Text>There is no transactions to be seen here.</Text>
      );
    }

    return (
      <FlatList
        data={this.props.truncate ? this.props.data.slice(0, this.props.truncate) : this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={transactions => (
          <TransactionItem transaction={transactions.item} onTouch={this.openDetails} />
        )}
        style={{...this.props.customStyle}}
      />
    );
  }
}

export default TransactionList;

