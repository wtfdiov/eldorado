import { config } from '../../../app.json';
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
    alert(`Problema ao buscar as transações ${error}`)
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
    alert('Transaction was successfull!')
  } catch (error) {
    switch (error.response.data.error) {
      case 'ADDRESS_NOT_FOUND':
        alert('addnotfound')
        break
      case 'ERROR_TRANSACTION_BAD_ADDRESS':
        alert('badaddress')
        break
      case 'ERROR_TRANSACTION_WRONG_AMOUNT':
        alert('wrongamount')
        break
      case 'ERROR_TRANSACTION_SMALL_FEE':
        alert('smallfee')
        break
      default:
        switch (error.response.status) {
          case 409:
          case 422:
            alert('invalid')
            break
          default:
            alert('crit')
            break
        }
        break
    }
  }
}
