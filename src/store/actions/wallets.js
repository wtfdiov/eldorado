import * as actionTypes from '../actionTypes';

export const fetchWallets = () => {
  return {
    type: actionTypes.WALLETS_FETCH,
  };
}

export const storeWallets = (wallets) => {
  return {
    type: actionTypes.WALLETS_STORE,
    wallets
  }
}

export const fetchWalletsBalance = () => {
  return {
    type: actionTypes.WALLETS_FETCH_BALLANCE,
  }
}

export const fetchWalletsBalanceSuccess = (balance) => {
  return {
    type: actionTypes.WALLETS_FETCH_BALLANCE_SUCCESS,
    balance
  }
}