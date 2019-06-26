/* eslint-disable import/no-named-as-default */
import { Navigation } from 'react-native-navigation';

import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';

import LoadingScreen from './Loading';
import AuthScreen from './Auth';
import RegisterScreen from './Auth/register';
import ForgotScreen from './Auth/forgot';
import HomeScreen from './Home';
import SendScreen from './Send';
import ReceiveScreen from './Receive';
import AllTransactionsScreen from './Transactions/All';
import SentTransactionsScreen from './Transactions/Sent';
import ReceivedTransationsScreen from './Transactions/Received';
import TransactionDetailsScreen from './Transactions/Details';
import QRScanner from './QRScanner';
import ConfigScreen from './Config';

import paperProvider from '../components/common/paperProvider';

const store = configureStore();

export function registerScreens() {
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Loading',
    () => paperProvider(LoadingScreen),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Auth',
    () => paperProvider(AuthScreen),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Register',
    () => paperProvider(RegisterScreen),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Forgot',
    () => paperProvider(ForgotScreen),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Home',
    () => paperProvider(HomeScreen),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Send',
    () => paperProvider(SendScreen),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Receive',
    () => paperProvider(ReceiveScreen),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Transactions.All',
    () => paperProvider(AllTransactionsScreen),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Transactions.Sent',
    () => paperProvider(SentTransactionsScreen),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Transactions.Received',
    () => paperProvider(ReceivedTransationsScreen),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Transactions.Details',
    () => paperProvider(TransactionDetailsScreen),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.QRScanner',
    () => paperProvider(QRScanner),
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'eldorado.screens.Config',
    () => paperProvider(ConfigScreen),
    Provider,
    store
  );
}
