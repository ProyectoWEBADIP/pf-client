/* eslint-disable no-unused-vars */
import { GET_ALL_NOTICIAS } from './actions';
//LOGIN_REGISTER ACTION TYPES//
import {
  LOCAL_LOGIN,
  LOCAL_LOGIN_ERROR,
  LOGOUT,
  HISTORY,
  LOGGIN_IN,
  REGISTER_USER,
} from './login-registerActions/actionTypes';

const initialState = {
  //LOGIN_STATES//
  loggedIn: false,
  usuario: [],
  successLogin: '',
  actualPath: '',
  logginIn: false,
  //LOGIN_ERRORS//
  loginRegisterErrors: {},
  //NOTICIAS STATES//
  noticias: [],
  copiaNoticias: [],
  detalleNoticia: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_NOTICIAS:
      return {
        ...state,
        noticias: action.payload,
        copiaNoticias: action.payload,
      };
    //LOCAL_LOGIN CASES//
    case LOCAL_LOGIN:
      if (action.payload.statusCode !== 203) {
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('userLogin', true);
        return {
          ...state,
          logginIn: false,
          usuario: action.payload,
          loggedIn: true,
          loginRegisterErrors: {},
        };
      } else {
        return {
          ...state,
          logginIn: false,
          loginRegisterErrors: action.payload,
        };
      }
    case LOGGIN_IN:
      return {
        ...state,
        logginIn: true,
      };
    case HISTORY:
      return { ...state, actualPath: action.payload };
    case LOGOUT:
      localStorage.removeItem('access_token');
      localStorage.removeItem('userLogin');
      return {
        ...state,
        logginIn: false,
        usuario: [],
        loggedIn: false,
        actualPath: '',
        successLogin: '',
      };
    //REGISTER CASES//
    case REGISTER_USER:
      localStorage.setItem(
        'access_token',
        action.payload.access_token.access_token
      );
      localStorage.setItem('userLogin', true);
      return {
        ...state,
        successLogin: action.payload.message,
        logginIn: false,
        loggedIn: true,
        loginRegisterErrors: {},
      };

    default:
      return { ...state };
  }
}
