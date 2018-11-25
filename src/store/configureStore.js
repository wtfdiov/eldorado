import { combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';

import authReducer from './reducers/auth';
import transactionsReducer from './reducers/transactions';
import walletsReducer from './reducers/wallets';

import { watchAuth, watchTransactions, watchWallets } from './sagas';

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
  wallets: walletsReducer
});

const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const configureStore = () => {
  const store = Reactotron.createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(watchAuth);
  sagaMiddleware.run(watchTransactions);
  sagaMiddleware.run(watchWallets);
  return store;
};

export default configureStore;
