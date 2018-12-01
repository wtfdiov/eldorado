import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes';
import { tryAuthSaga, logoutSaga, tryAutoLoginSaga, clearAuthDataSaga, updateTokenOnStorageSaga, updateTokenSaga } from './auth';
import { fetchTransactionsSaga, newTransactionSaga } from './transactions';
import { fetchWalletsSaga, fetchWalletsBalanceSaga } from './wallets';

export function* watchAuth() {
  yield takeLatest(actionTypes.AUTH_TRY_AUTO, tryAutoLoginSaga);
  yield takeLatest(actionTypes.AUTH_TRY, tryAuthSaga);
  yield takeLatest(actionTypes.AUTH_UPDATE_TOKEN, updateTokenSaga);
  yield takeLatest(actionTypes.AUTH_UPDATE_TOKEN_STORAGE, updateTokenOnStorageSaga);
  yield takeLatest(actionTypes.AUTH_LOGOUT, logoutSaga);
  yield takeLatest(actionTypes.AUTH_CLEAR_DATA, clearAuthDataSaga);
}

export function* watchTransactions() {
  yield takeLatest(actionTypes.TRANSACTIONS_FETCH, fetchTransactionsSaga);
  yield takeLatest(actionTypes.TRANSACTIONS_NEW, newTransactionSaga)
}

export function* watchWallets() {
  yield takeLatest(actionTypes.WALLETS_FETCH, fetchWalletsSaga);
  yield takeLatest(actionTypes.WALLETS_FETCH_BALLANCE, fetchWalletsBalanceSaga);
}
