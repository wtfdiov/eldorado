/**
 * @format
 */

import './reactotron';
import App from './App';
import { AppRegistry } from 'react-native'
import configureLanguage from './i18n';



configureLanguage();

AppRegistry.registerComponent('App', () => App)

