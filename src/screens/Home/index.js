import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import { fetchWalletsBalance } from '../../store/actions';

import WalletStats from '../../components/Home/WalletStats';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getBallance();
  }

  render () {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <WalletStats ballance={this.props.ballance} />
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
    ballance: state.wallets.balance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBallance: () => dispatch(fetchWalletsBalance())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);