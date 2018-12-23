import React, { Component } from 'react';
import { Platform, Linking, StyleSheet, ScrollView, View } from 'react-native';

import { connect } from 'react-redux';

import { fetchWalletsBalance } from '../../store/actions';

import WalletStats from '../../components/Home/WalletStats';
import TransactionList from '../../components/Transactions/List';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getBallance();
    
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (url) {
          console.tron.log(url);
          Linking.openURL(url)
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
    console.tron.log(event);
  }

  render () {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <WalletStats ballance={this.props.ballance} />
        </View>

        <TransactionList 
          data={this.props.transactions}
          truncate={3}
          customStyle={{
            marginTop: 20
          }}
        />
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
    ballance: state.wallets.balance,
    transactions: state.transactions.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBallance: () => dispatch(fetchWalletsBalance())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);