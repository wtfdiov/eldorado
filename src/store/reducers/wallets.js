import * as actionTypes from '../actionTypes';

const initialState = {
  wallets: [],
  balance: {
    available: .0,
    locked: .0,
    total: .0
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WALLETS_STORE:
      return {
        ...state,
        wallets: action.wallets,
      }
    case actionTypes.WALLETS_FETCH_BALLANCE_SUCCESS:
      return {
        ...state,
        balance: action.balance
      }
    default:
      return state;
  }
}

export default reducer;
