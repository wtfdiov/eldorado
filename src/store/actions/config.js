import * as actionTypes from '../actionTypes';

export const toggleConfigLoading = () => {
  return {
    type: actionTypes.CONFIG_TOGGLE_LOADING
  };
}

export const check2FA = () => {
  return {
    type: actionTypes.CONFIG_CHECK_2FA,
  }
}

export const set2FA = (twoFactorData) => {
  return {
    type: actionTypes.CONFIG_SET_2FA,
    twoFactorData
  }
}

export const enable2FA = (twoFactorAuthToken) => {
  return {
    type: actionTypes.CONFIG_2FA_ENABLE,
    twoFactorAuthToken
  }
}

export const enable2FASuccess = (data) => {
  return {
    type: actionTypes.CONFIG_2FA_ENABLE_SUCCESS,
    data
  }
}

export const enable2FAError = (error) => {
  return {
    type: actionTypes.CONFIG_2FA_ENABLE_SUCCESS,
    error
  }
}