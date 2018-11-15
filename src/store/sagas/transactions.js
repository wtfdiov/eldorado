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
