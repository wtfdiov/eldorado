import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Button } from 'react-native-paper';
import i18n from 'i18n-js';

import { connect } from 'react-redux';

import { fetchWalletsBalance, logout } from '../../store/actions';

import openModal from '../../navigation/openModal';

import WalletStats from '../../components/Home/WalletStats';
import TransactionList from '../../components/Transactions/List';

class SummaryScreen extends Component {
  componentDidMount() {
    this.props.getBallance();
  }

  render() {
    return (
      <>
        <ScrollView contentContainerStyle={styles.container}>
          <WalletStats
            selected={this.props.selected}
            balance={
              this.props.selected
                ? this.props.selectedBalance
                : this.props.balance
            }
          />

          <TransactionList
            data={
              this.props.selected
                ? this.props.transactions.filter(
                    transaction =>
                      transaction.from === this.props.selected ||
                      transaction.to.address === this.props.selected
                  )
                : this.props.transactions
            }
            truncate={3}
            customStyle={{
              marginTop: 20,
              width: '100%'
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 10
            }}
          >
            <Button
              icon="settings"
              onPress={() => openModal('eldorado.screens.Config')}
            >
              {i18n.t('config.title')}
            </Button>

            <Button icon="exit-to-app" onPress={() => this.props.logOut()}>
              {i18n.t('home.logOutBtnLabel')}
            </Button>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  scene: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    wallets: state.wallets.wallets,
    balance: state.wallets.balance,
    selected: state.wallets.selected,
    selectedBalance: state.wallets.selectedBalance,
    transactions: state.transactions.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBallance: () => dispatch(fetchWalletsBalance()),
    logOut: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryScreen);
