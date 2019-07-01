import { config } from '../../../app.json';
import { Alert } from 'react-native';
import axios from 'axios';
import { put, select } from 'redux-saga/effects';
import i18n from 'i18n-js';

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

    const wallets = response.data.map(wallet => ({
      ...wallet,
      canDelete: !wallet.balance.available && !wallet.balance.locked
    }));

    yield put(actions.storeWallets(wallets));
    if (wallets.length && wallets.length === 1) {
      yield put(actions.selectWallet(wallets[0]));
    }
  } catch (error) {
    Alert.alert(
      i18n.t('wallets.title'),
      `${i18n.t('wallets.requestMessages.error.address')}: ${
        error.response.data.message
      }`
    );
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
    Alert.alert(
      i18n.t('wallets.title'),
      `${i18n.t('wallets.requestMessages.error.balance')}: ${
        error.response.data.message
      }`
    );
  }
}

export function* createWalletSaga() {
  const state = yield select();

  try {
    const response = yield axios.post(
      `${config.api}/addresses`,
      {},
      {
        headers: {
          Authorization: `Bearer ${state.auth.token}`
        }
      }
    );

    yield put(actions.fetchWallets());
    yield put(actions.selectWallet(response));
  } catch (error) {
    Alert.alert(
      i18n.t('wallets.title'),
      `${i18n.t('wallets.requestMessages.error.create')}: ${
        error.response.data.message
      }`
    );
  }
}

export function* deleteWalletSaga(action) {
  const state = yield select();

  try {
    const response = yield axios.delete(
      `${config.api}/addresses/${action.wallet.address}`,
      {
        headers: {
          Authorization: `Bearer ${state.auth.token}`
        }
      }
    );
    yield put(actions.selectWallet(null));
    yield put(actions.fetchWallets());
  } catch (error) {
    Alert.alert(
      i18n.t('wallets.title'),
      `${i18n.t('wallets.requestMessages.error.delete')}: ${
        error.response.data.message
      }`
    );
  }
}
