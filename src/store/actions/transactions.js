import * as actionTypes from '../actionTypes';

export const storeTransactions = (transactions) => {
  return {
    type: actionTypes.TRANSACTIONS_STORE_ALL,
    transactions
  };
}

export const fetchAllTransactions = () => {
  return {
    type: actionTypes.TRANSACTIONS_FETCH
  }
}

export const newTransaction = (transaction) => {
  return {
    type: actionTypes.TRANSACTIONS_NEW,
    transaction
  }
}