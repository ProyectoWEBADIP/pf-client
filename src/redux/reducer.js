/* eslint-disable no-unused-vars */
import {
  FILTER_NOTICIAS,
  GET_ALL_NOTICIAS,
  GET_NOTICIA_DETAIL,
  CLEAN_NOTICIA_DETAIL,
  GET_NOTICIAS_BY_TITLE,
  CLEAN_FILTERS_NOTICIAS,
  NOT_FOUND_NOTICIAS
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
  noticiasBackUp: [],
  detalleNoticia: {},
  notFoundNoticias:false,
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
        noticiasBackUp:action.payload,
        notFoundNoticias:false
      };
      case GET_NOTICIAS_BY_TITLE:
        return{
          ...state,
          noticias: action.payload,
          notFoundNoticias:false
          
        }
    case GET_NOTICIA_DETAIL:
      return {
        ...state,
        detalleNoticia: action.payload,
        isLoading: false,
        notFoundNoticias:false
      };
    case FILTER_NOTICIAS:
      return {
        noticias: action.payload,
        isLoading: false,
        notFoundNoticias:false
      };
      case CLEAN_FILTERS_NOTICIAS:
        return{
          ...state,
          noticias: [...state.noticiasBackUp],
          notFoundNoticias:false

        }
    case CLEAN_NOTICIA_DETAIL:
      return{
        ...state,
        detalleNoticia:{}
      }
      case NOT_FOUND_NOTICIAS:
        return{
          ...state,
          notFoundNoticias:true
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
    default:
      return { ...state };
  }
}
