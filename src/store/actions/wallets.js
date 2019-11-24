import * as actionTypes from '../actionTypes';

export const toggleWalletsLoading = () => {
  return {
    type: actionTypes.WALLETS_TOGGLE_LOADING
  };
};

export const fetchWallets = () => {
  return {
    type: actionTypes.WALLETS_FETCH
  };
};

export const storeWallets = wallets => {
  return {
    type: actionTypes.WALLETS_STORE,
    wallets
  };
};

export const selectWallet = wallet => {
  let selectedWallet = null;
  if (wallet) selectedWallet = { ...wallet };
  return {
    type: actionTypes.WALLETS_SELECT,
    selectedWallet
  };
};

export const fetchWalletsBalance = () => {
  return {
    type: actionTypes.WALLETS_FETCH_BALLANCE
  };
};

export const fetchWalletsBalanceSuccess = balance => {
  return {
    type: actionTypes.WALLETS_FETCH_BALLANCE_SUCCESS,
    balance
  };
};

export const createWallet = () => {
  return {
    type: actionTypes.WALLETS_CREATE_NEW
  };
};

export const deleteWallet = wallet => {
  return {
    type: actionTypes.WALLETS_DELETE,
    wallet
  };
};
