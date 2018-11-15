/* eslint-disable import/no-named-as-default */
import { Navigation } from 'react-native-navigation';

import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';

import LoadingScreen from './Loading';
import AuthScreen from './Auth';
import HomeScreen from './Home';
import SendScreen from './Send';
import AllTransactionsScreen from './Transactions/All';
import SentTransactionsScreen from './Transactions/Sent';
import ReceivedTransationsScreen from './Transactions/Received';
import TransactionDetailsScreen from './Transactions/Details';

const store = configureStore();

export function registerScreens() {
  Navigation.registerComponentWithRedux('eldorado.screens.Loading', () => LoadingScreen, Provider, store);
  Navigation.registerComponentWithRedux('eldorado.screens.Auth', () => AuthScreen, Provider, store);
  Navigation.registerComponentWithRedux('eldorado.screens.Home', () => HomeScreen, Provider, store);
  Navigation.registerComponentWithRedux('eldorado.screens.Send', () => SendScreen, Provider, store);
  Navigation.registerComponentWithRedux('eldorado.screens.Transactions.All', () => AllTransactionsScreen, Provider, store);
  Navigation.registerComponentWithRedux('eldorado.screens.Transactions.Sent', () => SentTransactionsScreen, Provider, store);
  Navigation.registerComponentWithRedux('eldorado.screens.Transactions.Received', () => ReceivedTransationsScreen, Provider, store);
  Navigation.registerComponentWithRedux('eldorado.screens.Transactions.Details', () => TransactionDetailsScreen, Provider, store);
}
