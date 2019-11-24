import { config } from '../../../app.json';
import { Alert } from 'react-native';
import axios from 'axios';
import { put, call, delay } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import i18n from 'i18n-js';

import * as actions from '../actions';

export function* signUpSaga(action) {
  yield put(actions.toggleAuthLoading());

  try {
    const response = yield axios.post(`${config.api}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      name: action.formData.name,
      email: action.formData.email,
      password: action.formData.password,
      passwordConfirm: action.formData.passwordConfirm
    });

    return Alert.alert(i18n.t('signUp.title'), i18n.t('signUp.requestMessages.success.created'));
  } catch (error) {
    return Alert.alert(
      i18n.t('signUp.title'),
      `${i18n.t('signUp.requestMessages.error.generic')}: ${error.response.data.message}`
    );
  } finally {
    yield put(actions.toggleAuthLoading());
  }
}

export function* tryAuthSaga(action) {
  yield put(actions.toggleAuthLoading());

  try {
    const response = yield axios.post(`${config.api}/users/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      email: action.formData.email,
      password: action.formData.password,
      twoFactorAuthToken: action.formData.twoFactorAuthToken
    });

    yield put(actions.updateAuthData(response.data));
    yield put(actions.updateTokenOnStorage(response.data));

    yield put(actions.startDataSync());
  } catch (error) {
    yield put(actions.logout());

    Alert.alert(
      i18n.t('login.title'),
      `${i18n.t('login.requestMessages.error.generic')}: ${error.response.data.message}`
    );
  } finally {
    yield put(actions.toggleAuthLoading());
  }
}

export function* updateTokenSaga(action) {
  try {
    const updateToken = yield axios.post(
      `${config.api}/users/auth/tokens`,
      {
        currentUser: action.oldToken
      },
      {
        headers: {
          Authorization: `Bearer ${action.oldToken}`
        }
      }
    );

    yield put(actions.updateTokenOnStorage(updateToken.data));
    yield put(actions.updateAuthData(updateToken.data));
    yield put(actions.startDataSync());
  } catch (error) {
    yield put(actions.clearAuthData());
  }
}

export function* updateTokenOnStorageSaga(action) {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 3600 * 1000);
  yield AsyncStorage.setItem('@eldorado:auth:token', action.authData.token.toString());
  yield AsyncStorage.setItem('@eldorado:auth:expirationDate', expirationDate.toString());
}

export function* clearAuthDataSaga() {
  AsyncStorage.removeItem('@eldorado:auth:token');
  AsyncStorage.removeItem('@eldorado:auth:expirationDate');
}

export function* tryAutoLoginSaga() {
  try {
    const tokenFromStorage = yield AsyncStorage.multiGet(['@eldorado:auth:token', '@eldorado:auth:expirationDate']);

    const now = new Date();

    if (!tokenFromStorage[0][1]) {
      return;
    } else if (tokenFromStorage[0][1] && now >= Date.parse(tokenFromStorage[1][1])) {
      yield put(actions.logout());
    } else {
      yield put(actions.updateToken(tokenFromStorage[0][1]));
    }
  } catch (error) {
  } finally {
    yield put(actions.toggleAutoLoginLoading());
  }
}

export function* getData() {
  try {
    while (true) {
      yield put(actions.fetchWallets());
      yield put(actions.fetchAllTransactions());
      yield delay(config.updateMs);
    }
  } finally {
  }
}

export function* logoutSaga() {
  yield put(actions.clearAuthData());
  yield put(actions.stopDataSync());
  // TODO: ABRIR AUTH
}
