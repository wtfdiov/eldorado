import React from 'react';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Stack screens
import Home from '../screens/Home';
import Config from '../screens/Config';
import QRScanner from '../screens/QRScanner';
import TransactionDetails from '../screens/Transactions/Details';

import { basicHeader } from '../components/style';

import { LocalizationContext } from '../../App';

const MainStack = createNativeStackNavigator();

function HomeStack() {
  const { t } = React.useContext(LocalizationContext);
  const configHeaderOptions = basicHeader(t('config.title'));
  const qrHeaderOptions = basicHeader(t('qrScanner.title'));
  const transactionsDetailsHeaderOptions = basicHeader(t('transactions.details.title'));
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
