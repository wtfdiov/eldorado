import { config } from '../../../app.json';
import axios from 'axios';
import { put, select } from 'redux-saga/effects';

import * as actions from '../actions';

export function* fetchWalletsSaga() {
  const state = yield select();

  yield put(actions.toggleWalletsLoading());
  try {
    const response = yield axios.get(`${config.api}/addresses`, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`
      }
    });

    yield put(actions.storeWallets(response.data));
  } catch (error) {
    alert(`Problem fetching addresses ${error}`)
  } finally {
    yield put(actions.toggleWalletsLoading());
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

export function* createWalletSaga() {
  const state = yield select();

  try {
    const response = yield axios.post(`${config.api}/addresses`, {},
    {
      headers: {
        Authorization: `Bearer ${state.auth.token}`
      }
    });

    yield put(actions.fetchWallets());
    yield put(actions.selectWallet(response.address));
  } catch (error) {
    alert(`Problem creating new wallet ${error}`)
  }
}

export function* deleteWalletSaga(action) {
  const state = yield select();

  try {
    const response = yield axios.delete(`${config.api}/addresses/${action.address}`,
    {
      headers: {
        Authorization: `Bearer ${state.auth.token}`
      }
    });
    yield put(actions.selectWallet(null));
    yield put(actions.fetchWallets());
  } catch (error) {
    alert(`Problem removing wallet ${error}`)
  }
}
