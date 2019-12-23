import React from 'react';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Stack screens
import Login from '../screens/Auth';
import Register from '../screens/Auth/register';
import Forgot from '../screens/Auth/forgot';

import { basicHeader } from '../components/style';

import { LocalizationContext } from '../../App';

const LoginStack = createStackNavigator();

function AuthStack() {
  const { t } = React.useContext(LocalizationContext);
  const signUpTitle = t('signUp.title');
  const registerTitle = t('resetPassword.title');
  const registerHeaderOptions = basicHeader(signUpTitle);
  const forgotHeaderOptions = basicHeader(registerTitle);
  return (
    <LoginStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="Register" component={Register} options={{ ...registerHeaderOptions }} />
      <LoginStack.Screen name="Forgot" component={Forgot} options={{ ...forgotHeaderOptions }} />
    </LoginStack.Navigator>
  );
}

export default AuthStack;
