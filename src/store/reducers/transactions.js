import { TRANSACTIONS_STORE_ALL } from '../actionTypes';

const initialState = {
  transactions: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTIONS_STORE_ALL:
      return {
        ...state,
        transactions: action.transactions,
      }
    default:
      return state;
  }
}

export default reducer;
