import { combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';

import authReducer from './reducers/auth';
import transactionsReducer from './reducers/transactions';

import { watchAuth, watchTransactions } from './sagas';

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer
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
  return store;
};

export default configureStore;
