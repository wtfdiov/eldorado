/**
 * @format
 */

import './reactotron';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';
import configureLanguage from './i18n';

registerScreens();
configureLanguage();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'eldorado.screens.Loading'
      }
    }
  });
});
