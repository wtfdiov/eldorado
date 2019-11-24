import React from 'react';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// I18n
import i18n from 'i18n-js';

// Stack screens
import Login from '../screens/Auth';
import Register from '../screens/Auth/register';
import Forgot from '../screens/Auth/forgot';

import { basicHeader } from '../components/style';

const LoginStack = createStackNavigator();

const registerHeaderOptions = basicHeader(i18n.t('signUp.title'));
const forgotHeaderOptions = basicHeader(i18n.t('resetPassword.title'));

function AuthStack() {
  return (
    <LoginStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="Register" component={Register} options={{ ...registerHeaderOptions }} />
      <LoginStack.Screen name="Forgot" component={Forgot} options={{ ...forgotHeaderOptions }} />
    </LoginStack.Navigator>
  );
}

export default AuthStack;
