import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

Reactotron
  .configure({
    host: 'localhost'
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reduxPlugin())
  .use(sagaPlugin())
  .connect()
  .clear();

console.tron = Reactotron
