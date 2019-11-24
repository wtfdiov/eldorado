import * as actionTypes from '../actionTypes';

const initialState = {
  loading: false,
  wallets: [],
  balance: {
    available: 0.0,
    locked: 0.0,
    total: 0.0
  },
  selectedBalance: {
    available: 0.0,
    locked: 0.0,
    total: 0.0
  },
  selected: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WALLETS_TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case actionTypes.WALLETS_STORE:
      return {
        ...state,
        wallets: action.wallets
      };
    case actionTypes.WALLETS_FETCH_BALLANCE_SUCCESS:
      return {
        ...state,
        balance: action.balance
      };
    case actionTypes.WALLETS_SELECT:
      return {
        ...state,
        selected: action.selectedWallet
      };
    default:
      return state;
  }
};

export default reducer;
