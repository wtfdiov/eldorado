import * as actionTypes from '../actionTypes';

export const tryAuth = (formData) => {
  return {
    type: actionTypes.AUTH_TRY,
    formData
  }
}

export const signUp = (formData) => {
  return {
    type: actionTypes.AUTH_SIGN_UP,
    formData
  }
}

export const updateToken = (oldToken) => {
  return {
    type: actionTypes.AUTH_UPDATE_TOKEN,
    oldToken
  }
}

export const updateTokenOnStorage = (authData) => {
  return {
    type: actionTypes.AUTH_UPDATE_TOKEN_STORAGE,
    authData
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const tryAutoLogin = () => {
  return {
    type: actionTypes.AUTH_TRY_AUTO
  }
}

export const toggleAuthLoading = () => {
  return {
    type: actionTypes.AUTH_TOGGLE_LOADING
  };
}

export const updateAuthData = (authData) => {
  return {
    type: actionTypes.AUTH_UPDATE_DATA,
    authData,
  };
}

export const clearAuthData = () => {
  return {
    type: actionTypes.AUTH_CLEAR_DATA
  }
}

export const startDataSync = () => {
  return {
    type: actionTypes.START_DATA_SYNC
  }
}

export const stopDataSync = () => {
  return {
    type: actionTypes.STOP_DATA_SYNC
  }
}

export const toggleAutoLoginLoading = () => {
  return {
    type: actionTypes.AUTH_TOGGLE_AUTOLOGIN_LOADING
  };
}
