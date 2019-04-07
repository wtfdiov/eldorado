import { config } from '../../../app.json';
import { Alert } from 'react-native';
import axios from 'axios';
import { put, select } from 'redux-saga/effects';
import i18n from '../../../i18n';

import * as actions from '../actions';

export function* check2FASaga() {
  const state = yield select();

  yield put(actions.toggleConfigLoading());

  try {
    const response = yield axios.get(`${config.api}/users/me/2fa-token`, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`
      }
    });

    yield put(actions.set2FA(response.data));
  } catch (error) {
    Alert.alert(i18n.t('transactions.title'), `${i18n.t('transactions.requestMessages.error.generic')}: ${error}`)
  } finally {
    yield put(actions.toggleConfigLoading());
  }
}

export function* enable2FASaga({ twoFactorAuthToken }) {
  const state = yield select();

  yield put(actions.toggleConfigLoading());

  try {
    const response = yield axios.post(`${config.api}/users/me/2fa-token`, {
      action: 'enable',
      twoFactorAuthToken
    },
    {
      headers: {
        Authorization: `Bearer ${state.auth.token}`
      }
    });

    yield put(actions.set2FA(response.data));
  } catch (error) {
    yield put(actions.enable2FAError(error.data));
    Alert.alert(i18n.t('transactions.title'), `${i18n.t('transactions.requestMessages.error.generic')}: ${error}`)
  } finally {
    yield put(actions.toggleConfigLoading());
  }
}