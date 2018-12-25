import React, { Component } from 'react';
import { Platform, Linking, StyleSheet, ScrollView, View, Text } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import i18n from '../../../i18n';

import { connect } from 'react-redux';

import { fetchWalletsBalance, logout } from '../../store/actions';

import WalletPicker from '../../components/common/WalletPicker';
import WalletStats from '../../components/Home/WalletStats';
import TransactionList from '../../components/Transactions/List';

class HomeScreen extends Component {

  static options(passProps) {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      }
    }
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getBallance();
    
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (url) {
          this.handleOpenURL(url);
        }
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }
    
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  
  handleOpenURL = (event) => {
    return null
  }

  render () {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>

          <WalletPicker />

          <WalletStats balance={this.props.selected ? this.props.selectedBalance : this.props.balance} />

          <TransactionList 
            data={
              this.props.selected
              ?
                this.props.transactions.filter(transaction => transaction.from === this.props.selected || transaction.to.address === this.props.selected)
              :
                this.props.transactions
            }
            truncate={3}
            customStyle={{
              marginTop: 20
            }}
          />

          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end',paddingHorizontal: 10}}>
            <Button transparent light onPress={() => this.props.logOut()}>
              <Icon color="#e4e4e4" name="md-log-out" size={18} />
              <Text style={{color: '#e4e4e4' }}> {i18n.t('home.logOutBtnLabel')}</Text>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);