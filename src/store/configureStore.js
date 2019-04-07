import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';

import authReducer from './reducers/auth';
import transactionsReducer from './reducers/transactions';
import walletsReducer from './reducers/wallets';
import configReducer from './reducers/config';

import { watchAuth, watchTransactions, watchWallets, watchData, watchConfig } from './sagas';

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
  wallets: walletsReducer,
  config: configReducer
});

const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware), Reactotron.createEnhancer()),
  );
  sagaMiddleware.run(watchAuth);
  sagaMiddleware.run(watchTransactions);
  sagaMiddleware.run(watchWallets);
  sagaMiddleware.run(watchData);
  sagaMiddleware.run(watchConfig);
  return store;
};

export default configureStore;
