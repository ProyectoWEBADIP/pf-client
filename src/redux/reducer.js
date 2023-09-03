/* eslint-disable no-unused-vars */
import {
  FILTER_NOTICIAS,
  GET_ALL_NOTICIAS,
  GET_NOTICIA_DETAIL,
  CLEAN_NOTICIA_DETAIL
} from './noticiasActions/noticiasActionTypes';
//LOGIN_REGISTER ACTION TYPES//
import {
  IS_LOADING,
  LOCAL_LOGIN,
  LOCAL_LOGIN_ERROR,
  LOGOUT,
  HISTORY,
  LOGGIN_IN,
  REGISTER_USER,
  GET_USER_BY_ID,
  CREATE_PROFILE_LOCAL,
  REGISTER_USER_LOCAL,
} from './login-registerActions/actionTypes';

const initialState = {
  isLoading: false,
  //LOGIN_STATES//
  loggedIn: false,
  successLogin: '',
  actualPath: '',
  logginIn: false,
  //LOGIN_ERRORS//
  loginRegisterErrors: {},
  //USUARIO_STATES
  usuario: {},
  perfilUsuario: [],
  //NOTICIAS STATES//
  noticias: [],
  detalleNoticia: {},
  loginRegisterLocal: ""
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_NOTICIAS:
      return {
        ...state,
        noticias: action.payload,
        isLoading: false,
      };
    case GET_NOTICIA_DETAIL:
      return {
        ...state,
        detalleNoticia: action.payload,
        isLoading: false,
      };
    case FILTER_NOTICIAS:
      return {
        noticias: action.payload,
        isLoading: false,
      };
    case CLEAN_NOTICIA_DETAIL:
      return{
        ...state,
        detalleNoticia:{}
      }
    //LOCAL_LOGIN CASES//
    case LOCAL_LOGIN:
      if (action.payload.statusCode !== 203) {
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('userLogin', true);
        localStorage.setItem('userId', action.payload.id);
        return {
          ...state,
          logginIn: false,
          usuario: action.payload,
          loggedIn: true,
          loginRegisterErrors: {},
          isLoading: false,
        };
      } else {
        return {
          ...state,
          isLoading: false,
          logginIn: false,
          loginRegisterErrors: action.payload,
        };
      }
    case LOGGIN_IN:
      return {
        ...state,
        isLoading: false,
        logginIn: true,
      };
    case HISTORY:
      return { ...state, actualPath: action.payload };
    case LOGOUT:
      localStorage.removeItem('access_token');
      localStorage.removeItem('userLogin');
      localStorage.removeItem('userId');
      return {
        ...state,
        isLoading: false,
        logginIn: false,
        usuario: [],
        loggedIn: false,
        actualPath: '',
        successLogin: '',
        perfilUsuario: [],
      };
    //REGISTER CASES//
    case REGISTER_USER: //REGISTRO CON GOOGLE
      localStorage.setItem(
        'access_token',
        action.payload.access_token.access_token
      );
      localStorage.setItem('userLogin', true);
      localStorage.setItem('userId', action.payload.id);

      return {
        ...state,
        isLoading: false,
        usuario: action.payload.access_token,
        successLogin: action.payload.message,
        logginIn: false,
        loggedIn: true,
        loginRegisterErrors: {},
      };
    //GET USUARIOS CASES
    case GET_USER_BY_ID:
      return {
        ...state,
        isLoading: false,
        perfilUsuario: action.payload,
      };
    //CREAR Y/O ACTUALIZAR PERFIL CASES
    case CREATE_PROFILE_LOCAL:
      return {
        ...state,
        isLoading: false,
        perfilUsuario: action.payload,
      };
      case REGISTER_USER_LOCAL:
        return {
          ...state,
          loginRegisterLocal: action.payload
        }
    default:
      return { ...state };
  }
}
