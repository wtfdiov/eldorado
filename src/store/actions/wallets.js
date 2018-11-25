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