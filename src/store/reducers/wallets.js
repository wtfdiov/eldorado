import * as actionTypes from '../actionTypes';

const initialState = {
  wallets: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WALLETS_STORE:
      return {
        ...state,
        wallets: action.wallets,
      }
    default:
      return state;
  }
}

export default reducer;
