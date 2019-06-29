import React, { Component } from 'react';
import {
  Platform,
  Linking,
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from 'i18n-js';

import { connect } from 'react-redux';

import { fetchWalletsBalance, logout } from '../../store/actions';

import openModal from '../../navigation/openModal';

import WalletPicker from '../../components/common/WalletPicker';
import WalletStats from '../../components/Home/WalletStats';
import TransactionList from '../../components/Transactions/List';

class HomeScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        drawBehind: true
      }
    };
  }

  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (url) this.handleOpenURL(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentDidMount() {
    this.props.getBallance();
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
    this.navigationEventListener.remove();
  }

  handleOpenURL = event => {
    console.tron.log(event);
    return null;
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <WalletPicker />

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
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
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
)(HomeScreen);
