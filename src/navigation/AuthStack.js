import React from 'react';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Stack screens
import Login from '../screens/Auth';
import Register from '../screens/Auth/register';
import Forgot from '../screens/Auth/forgot';
import Home from '../screens/Home';

const LoginStack = createStackNavigator();

function AuthStack() {
  return (
    <LoginStack.Navigator initialRouteName="Login" headerMode="none">
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="Register" component={Register} />
      <LoginStack.Screen name="Forgot" component={Forgot} />
      <LoginStack.Screen name="Home" component={Home} />
    </LoginStack.Navigator>
  );
}

export default AuthStack;
