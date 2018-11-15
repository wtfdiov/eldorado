import { AUTH_UPDATE_DATA, AUTH_LOGOUT, AUTH_TOGGLE_LOADING } from '../actionTypes';

const initialState = {
  email: '',
  id: '',
  name: '',
  role: '',
  token: '',
  expirationDate: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_UPDATE_DATA:
      return {
        email: action.authData.email,
        id: action.authData.id,
        name: action.authData.name,
        role: action.authData.role,
        token: action.authData.token,
        expirationDate: action.authData.expirationDate
      }
    case AUTH_TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case AUTH_LOGOUT:
      return {
        ...initialState
      }
    default:
      return state;
  }
}

export default reducer;
