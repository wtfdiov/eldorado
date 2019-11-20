import React, { Component } from 'react';
import { Platform, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';

import { fetchWalletsBalance, logout } from '../../store/actions';

import SummaryScreen from './Summary';
import SendScreen from '../Send';
import ReceiveScreen from '../Receive';
import TransactionsScreen from '../Transactions';

import WalletPicker from '../../components/common/WalletPicker';

import { COLORS } from '../../components/style';

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
    this.routes = [
      { key: 'summary', title: 'First' },
      { key: 'send', title: 'Second' },
      { key: 'receive', title: 'Second' },
      { key: 'transactions', title: 'Second' }
    ];
    this.state = {
      index: 0,
      routes: this.routes
    };

    this.selectTab = this.selectTab.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (url) this.handleOpenURL(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = event => {
    console.tron.log(event);
    return null;
  };

  selectTab(key) {
    const index = this.routes.findIndex(tab => tab.key === key);
    this.setState({ index });
  }

  renderIcon({ route, focused }) {
    let name = '';
    switch (route.key) {
      case 'summary':
        name = 'ios-wallet';
        break;
      case 'send':
        name = 'ios-send';
        break;
      case 'receive':
        name = 'md-qr-scanner';
        break;
      case 'transactions':
        name = 'ios-repeat';
        break;
    }
    return (
      <Icon
        name={name}
        color={focused ? 'white' : COLORS.primaryGreen}
        size={24}
      />
    );
  }

  render() {
    return (
      <LinearGradient
        colors={[COLORS.secondaryGreen, COLORS.primaryGreen]}
        style={{ flex: 1 }}
      >
        <WalletPicker />
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            summary: SummaryScreen,
            send: SendScreen,
            receive: ReceiveScreen,
            transactions: TransactionsScreen
          })}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'white' }}
              style={{ backgroundColor: 'transparent' }}
              renderIcon={this.renderIcon}
              renderLabel={() => null}
            />
          )}
          onIndexChange={index => this.setState({ index })}
        />
      </LinearGradient>
    );
  }
}

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
