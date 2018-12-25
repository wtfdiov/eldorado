import { config } from '../../../app.json';
import { Alert } from 'react-native';
import axios from 'axios';
import { put, select } from 'redux-saga/effects';

import * as actions from '../actions';

export function* fetchTransactionsSaga() {
  const state = yield select();

  try {
    const response = yield axios.get(`${config.api}/transactions`, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`
      }
    });

    yield put(actions.storeTransactions(response.data));
  } catch (error) {
    Alert.alert('Listar transações', `Problema ao buscar as transações ${error}`)
  }
}

export function* newTransactionSaga(action) {
  const state = yield select();

  try {
    const transaction = yield axios.post(`${config.api}/transactions`, 
    JSON.parse(JSON.stringify(action.transaction))
    ,
    {
      headers: {
        Authorization: `Bearer ${state.auth.token}`
      },
    });
    Alert.alert('Nova transação', 'Transação registrada com sucesso!')
  } catch (error) {
    switch (error.response.data.error) {
      case 'ADDRESS_NOT_FOUND':
        Alert.alert('Nova transação', `${error.response.data.message}`)
        break
      case 'ERROR_TRANSACTION_BAD_ADDRESS':
        Alert.alert('Nova transação', `${error.response.data.message}`)
        break
      case 'ERROR_TRANSACTION_WRONG_AMOUNT':
        Alert.alert('Nova transação', `${error.response.data.message}`)
        break
      case 'ERROR_TRANSACTION_SMALL_FEE':
        Alert.alert('Nova transação', `${error.response.data.message}`)
        break
      default:
        switch (error.response.status) {
          case 409:
          case 422:
            Alert.alert('Nova transação', `${error.response.data.message}`)
            break
          default:
            Alert.alert('Nova transação', `${error.response.data.message}`)
            break
        }
        break
    }
  }
}
