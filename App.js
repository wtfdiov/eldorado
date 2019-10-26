import React from 'react';
import { Provider } from 'react-redux';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Auth';
import Register from './src/screens/Auth/register';
import Forgot from './src/screens/Auth/forgot';
import configureStore from './src/store/configureStore';

const store = configureStore();
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
    <NavigationNativeContainer>
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
    </NavigationNativeContainer>
    </Provider>
  );
}

export default App;
