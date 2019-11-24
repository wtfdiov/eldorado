import React, { useState, useEffect } from 'react';
import { Platform, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';

import SummaryScreen from './Summary';
import SendScreen from '../Send';
import ReceiveScreen from '../Receive';
import TransactionsScreen from '../Transactions';

import WalletPicker from '../../components/common/WalletPicker';

import { COLORS } from '../../components/style';

const routes = [
  { key: 'summary', title: 'First' },
  { key: 'send', title: 'Second' },
  { key: 'receive', title: 'Second' },
  { key: 'transactions', title: 'Second' }
];

function HomeScreen() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (url) handleOpenURL(url);
      });
    } else {
      Linking.addEventListener('url', handleOpenURL);
    }

    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  const [index, setIndex] = useState(0);

  function handleOpenURL(event) {
    return null;
  }

  function renderIcon({ route, focused }) {
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
    return <Icon name={name} color={focused ? 'white' : COLORS.primaryGreen} size={24} />;
  }

  return (
    <LinearGradient colors={[COLORS.secondaryGreen, COLORS.primaryGreen]} style={{ flex: 1 }}>
      <WalletPicker />
      <TabView
        navigationState={{ index, routes }}
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
            renderIcon={renderIcon}
            renderLabel={() => null}
          />
        )}
        onIndexChange={index => setIndex(index)}
      />
    </LinearGradient>
  );
}

export default HomeScreen;
