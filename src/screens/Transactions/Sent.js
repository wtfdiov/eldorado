import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import TransactionList from '../../components/Transactions/List';

class TransactionsSentScreen extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <TransactionList 
          data={this.props.transactions}
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
    transactions: state.transactions.transactions.filter(transaction => transaction.amount < 0)
  }
}

export default connect(mapStateToProps, null)(TransactionsSentScreen);