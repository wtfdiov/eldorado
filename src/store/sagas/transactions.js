import { config } from '../../../app.json';
import { Alert } from 'react-native';
import axios from 'axios';
import { put, select } from 'redux-saga/effects';
import i18n from '../../../i18n';

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
    Alert.alert(i18n.t('transactions.title'), `${i18n.t('transactions.requestMessages.error.generic')}: ${error}`)
  }
}

export function* newTransactionSaga(action) {
  const state = yield select();
  const title = i18n.t('send.title');
  try {
    const transaction = yield axios.post(`${config.api}/transactions`,
    JSON.parse(JSON.stringify(action.transaction))
    ,
    {
      headers: {
        Authorization: `Bearer ${state.auth.token}`
      },
    });
    Alert.alert(title, i18n.t('send.requestMessages.success'))
  } catch (error) {
    switch (error.response.data.error) {
      case 'ADDRESS_NOT_FOUND':
        Alert.alert(title, i18n.t('send.requestMessages.error.addressNotFound'))
        break
      case 'ERROR_TRANSACTION_BAD_ADDRESS':
        Alert.alert(title, i18n.t('send.requestMessages.error.badAddress'))
        break
      case 'ERROR_TRANSACTION_WRONG_AMOUNT':
        Alert.alert(title, i18n.t('send.requestMessages.error.wrongAmount'))
        break
      case 'ERROR_TRANSACTION_SMALL_FEE':
        Alert.alert(title, i18n.t('send.requestMessages.error.smallFee'))
        break
      case 'ECONNRESET':
        Alert.alert(title, i18n.t('send.requestMessages.error.critical'))
        break
      default:
        switch (error.response.status) {
          case 409:
          case 422:
            Alert.alert(title, i18n.t('send.requestMessages.error.conflict'))
            break
          default:
            Alert.alert(title, i18n.t('send.requestMessages.error.critical'))
            break
        }
        break
    }
  }
}
