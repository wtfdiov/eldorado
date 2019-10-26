import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth';
import Register from '../screens/Auth/register';
import Forgot from '../screens/Auth/forgot';

const Stack = createStackNavigator();

function Auth() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  );
}

export default createAppContainer(Auth);
