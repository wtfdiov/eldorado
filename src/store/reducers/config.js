import * as actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  twoFactor: null,
  twoFactorError: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONFIG_TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case actionTypes.CONFIG_SET_2FA:
      return {
        ...state,
        twoFactor: action.twoFactorData,
        twoFactorError: null
      }
    case actionTypes.CONFIG_2FA_ENABLE_ERROR:
      return {
        ...state,
        twoFactorError: action.error
      }
    default:
      return state;
  }
}

export default reducer;
