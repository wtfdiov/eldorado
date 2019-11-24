import React from 'react';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// I18n
import i18n from 'i18n-js';

// Stack screens
import Home from '../screens/Home';
import Config from '../screens/Config';
import QRScanner from '../screens/QRScanner';
import TransactionDetails from '../screens/Transactions/Details';

import { basicHeader } from '../components/style';

const MainStack = createNativeStackNavigator();

const configHeaderOptions = basicHeader(i18n.t('config.title'));
const qrHeaderOptions = basicHeader(i18n.t('qrScanner.title'));
const transactionsDetailsHeaderOptions = basicHeader(i18n.t('transactions.details.title'));

function HomeStack() {
  return (
    <MainStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Config" component={Config} options={{ ...configHeaderOptions }} />
      <MainStack.Screen name="QRScanner" component={QRScanner} options={{ ...qrHeaderOptions }} />
      <MainStack.Screen
        name="TransactionDetails"
        component={TransactionDetails}
        options={{ ...transactionsDetailsHeaderOptions }}
      />
    </MainStack.Navigator>
  );
}

export default HomeStack;
