import { config } from '../../../app.json';
import axios from 'axios';
import { put, select } from 'redux-saga/effects';

import * as actions from '../actions';

export function* fetchWalletsSaga() {
  const state = yield select();

  try {
    const response = yield axios.get(`${config.api}/addresses`, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`
      }
    });

    yield put(actions.storeWallets(response.data));
  } catch (error) {
    alert(`Problem fetching addresses ${error}`)
  }
}

export function* fetchWalletsBalanceSaga() {
  const state = yield select();

  try {
    const response = yield axios.get(`${config.api}/addresses/balance`, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`
      }
    });

    yield put(actions.fetchWalletsBalanceSuccess(response.data));
  } catch (error) {
    alert(`Problem fetching wallets ballance ${error}`)
  }
}
