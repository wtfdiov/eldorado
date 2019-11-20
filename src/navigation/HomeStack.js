import React from 'react';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Stack screens
import Home from '../screens/Home';
import Config from '../screens/Config';
import QRScanner from '../screens/QRScanner';
import TransactionDetails from '../screens/Transactions/Details';

const MainStack = createNativeStackNavigator();

function HomeStack() {
  return (
    <MainStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Config" component={Config} />
      <MainStack.Screen name="QRScanner" component={QRScanner} />
      <MainStack.Screen name="TransactionDetails" component={TransactionDetails} />
    </MainStack.Navigator>
  );
}

export default HomeStack;
