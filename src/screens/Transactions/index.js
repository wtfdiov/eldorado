import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { fetchAllTransactions } from '../../store/actions';

import TransactionList from '../../components/Transactions/List';
import { COLORS } from '../../components/style';

class TransactionsAllScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TransactionList data={this.props.transactions} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.grayBg
  }
});

const mapStateToProps = state => {
  return {
    transactions: state.transactions.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsAllScreen);
