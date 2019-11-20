import * as actionTypes from '../actionTypes';

const initialState = {
  email: '',
  id: '',
  name: '',
  role: '',
  token: '',
  expirationDate: '',
  loading: false,
  autoLoginLoading: true,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_UPDATE_DATA:
      return {
        email: action.authData.email,
        id: action.authData.id,
        name: action.authData.name,
        role: action.authData.role,
        token: action.authData.token,
        expirationDate: action.authData.expirationDate
      }
    case actionTypes.AUTH_TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...initialState
      }
    case actionTypes.AUTH_TOGGLE_AUTOLOGIN_LOADING:
      return {
        ...state,
        autoLoginLoading: !state.loading
      }
    default:
      return state;
  }
}

export default reducer;
