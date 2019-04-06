import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

const reactotron = Reactotron
  .configure({
    host: 'localhost'
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect()
  .clear();

console.tron = Reactotron

export default reactotron;
