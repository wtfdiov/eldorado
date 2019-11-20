import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import i18n from 'i18n-js';

import TransactionItem from './Item';

class TransactionList extends Component {
  constructor(props) {
    super(props);
  }

  openDetails = transactionId => {
    // TODO: push details screen
  };

  _keyExtractor = item => item.id;

  render() {
    if (Object.keys(this.props.data).length === 0) {
      return (
        <Text style={{ alignSelf: 'center', textAlign: 'center', margin: 10 }}>
          {i18n.t('common.components.transactionsList.noTransactions')}
        </Text>
      );
    }

    return (
      <FlatList
        data={
          this.props.truncate
            ? this.props.data.slice(0, this.props.truncate)
            : this.props.data
        }
        keyExtractor={this._keyExtractor}
        renderItem={transactions => (
          <TransactionItem
            transaction={transactions.item}
            onTouch={this.openDetails}
          />
        )}
        style={{ ...this.props.customStyle }}
      />
    );
  }
}

export default TransactionList;
