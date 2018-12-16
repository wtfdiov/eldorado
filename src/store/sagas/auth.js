import { config } from '../../../app.json';
import axios from 'axios';
import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import startAuth from '../../navigation/startAuth';
import startHome from '../../navigation/startHome';

import * as actions from '../actions';

export function* signUpSaga(action) {
  yield put(actions.toggleAuthLoading());

  try {
    const response = yield axios.post(`${config.api}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      name: action.formData.name,
      email: action.formData.email,
      password: action.formData.password,
      passwordConfirm: action.formData.passwordConfirm
    });

  } catch (error) {
    return alert(`${error}`)
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
        'Content-Type': 'application/json',
      },
      email: action.formData.email,
      password: action.formData.password,
      twoFactorAuthToken: action.formData.twoFactorAuthToken
    });

    yield put(actions.updateAuthData(response.data));
    yield put(actions.updateTokenOnStorage(response.data));

    yield put(actions.toggleAuthLoading());
    yield put(actions.startDataSync());
    yield call(startHome);

  } catch (error) {
    yield put(actions.toggleAuthLoading());
    yield put(actions.logout());

    if (!action.formData.login) {
      yield call(startAuth);
    }

    return alert(`Ocorreu um problema ao autenticar: ${error}`)
  }
}

export function* updateTokenSaga(action) {

  try {
    const updateToken = yield axios.post(`${config.api}/users/auth/tokens`, {
      currentUser: action.oldToken
    }, {
      headers: {
        Authorization: `Bearer ${action.oldToken}`
      },
    });

    yield put(actions.updateTokenOnStorage(updateToken.data));
    yield put(actions.updateAuthData(updateToken.data));
    yield put(actions.startDataSync());
    yield call(startHome);

  } catch(error) {
    yield put(actions.clearAuthData());
    alert(`Falha ao buscar sua sessão, faça login novamente. ${error}`);
  }

}

export function* updateTokenOnStorageSaga(action) {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 3600 * 1000);
  yield AsyncStorage.setItem('@eldorado:auth:token', action.authData.token);
  yield AsyncStorage.setItem('@eldorado:auth:expirationDate', expirationDate);
}

export function* clearAuthDataSaga() {
  AsyncStorage.removeItem('@nbr:auth:token');
  AsyncStorage.removeItem('@nbr:auth:expirationDate');
}

export function* tryAutoLoginSaga() {
  try {
    const tokenFromStorage = yield AsyncStorage.multiGet([
      '@eldorado:auth:token',
      '@eldorado:auth:expirationDate'
    ]);

    if (!tokenFromStorage[0][1]) {
      yield call(startAuth);
    } else {
      const now = new Date();
      if (now >= Date.parse(tokenFromStorage[1][1])) {
        yield put(actions.logout());
        call(startAuth);
      } else {
        yield put(actions.updateToken(tokenFromStorage[0][1]));
      }
    }
  } catch (error) {
  }
}

export function* getData() {
  try {
    while (true) {
      yield put(actions.fetchWallets());
      yield put(actions.fetchAllTransactions());
      yield call(delay, config.updateMs)
    }
  } finally {}
}

export function* logoutSaga() {
  yield put(actions.clearAuthData());
  yield put(actions.stopDataSync());
  yield call(startAuth);
}
