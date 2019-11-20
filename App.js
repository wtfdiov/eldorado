import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

import SplashScreen from './src/navigation/SplashScreen';

enableScreens();
const store = configureStore();

function App() {

  return (
    <Provider store={store}>
      <NavigationNativeContainer>
        <SplashScreen />
      </NavigationNativeContainer>
    </Provider>
  );
}

export default App;
