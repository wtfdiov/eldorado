import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import i18n from '../../../i18n';

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
      }
    });
  }

  _keyExtractor = (item) => item.id;

  render() {
    if (Object.keys(this.props.data).length === 0) {
      return (
        <Text style={{alignSelf: 'center', textAlign: 'center', margin: 10}}>{i18n.t('common.components.transactionsList.noTransactions')}</Text>
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

