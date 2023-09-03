/* eslint-disable no-unused-vars */
import { FILTER_NOTICIAS, GET_ALL_NOTICIAS ,GET_NOTICIA_DETAIL} from './noticiasActions/noticiasActionTypes';
//LOGIN_REGISTER ACTION TYPES//
import {
  LOCAL_LOGIN,
  LOCAL_LOGIN_ERROR,
  LOGOUT,
  HISTORY,
  LOGGIN_IN,
  REGISTER_USER,
  GET_USER_BY_ID,
  CREATE_PROFILE_LOCAL
} from './login-registerActions/actionTypes';

const initialState = {
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
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_NOTICIAS:
      return {
        ...state,
        noticias: action.payload,
      };
      case GET_NOTICIA_DETAIL:
        return {
...state,
detalleNoticia: action.payload
        }
        case FILTER_NOTICIAS:
          return {
            noticias:action.payload
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
      localStorage.removeItem('userId');
      return {
        ...state,
        logginIn: false,
        usuario: [],
        loggedIn: false,
        actualPath: '',
        successLogin: '',
        perfilUsuario:[]
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
        usuario: action.payload.access_token,
        successLogin: action.payload.message,
        logginIn: false,
        loggedIn: true,
        loginRegisterErrors: {},
      };
      //GET USUARIOS CASES
      case GET_USER_BY_ID:
        return{
          ...state,
          perfilUsuario: action.payload
        }
        //CREAR Y/O ACTUALIZAR PERFIL CASES
        case CREATE_PROFILE_LOCAL:
          return {
            ...state,
            perfilUsuario: action.payload
          }
    default:
      return { ...state };
  }
}
