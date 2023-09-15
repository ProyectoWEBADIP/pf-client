/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import {
  FILTER_NOTICIAS,
  GET_ALL_NOTICIAS,
  GET_NOTICIA_DETAIL,
  CLEAN_NOTICIA_DETAIL,
  GET_NOTICIAS_BY_TITLE,
  CLEAN_FILTERS_NOTICIAS,
  NOT_FOUND_NOTICIAS,
  GET_NOTICIAS_BY_CATEGORY,
  DELETE_NOTICE,
  GET_NOTICE_BY_ID,
  UPDATE_NOTICE,
  NOTICIAS_PER_PAGE
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
//Categorias types
import { GET_ALL_CATEGORIES } from "../redux/categoriasActions/categoriasActionTypes";
//USERS TYPES
import { GET_ALL_USERS, GET_USER_BY_EMAIL, UPDATE_PASSWORD } from "./usersActions/usersActionTypes";
// -------> Roles types <------
import {
   GET_ALL_ROLES,
   GET_ALL_ROLES_BY_ID,
   PATCH_ROL,
   DELETE_ROL,
   POST_ROL,
} from "./rolesActions/rolesActionsTypes";
//---->SPONSOR---------
import { GET_ALL_SPONSOR,GET_SPONSOR_BY_ID,UPDATE_SPONSOR } from "./sponsorActions/sponsorActionsTypes";//DASHBOARD TYPES
import {RENDER_CORRECT_DASH} from './dashboardAdminActions/actionTypes'
import { GET_ALL_MATCH } from './partidosActions/partidosActions';
const initialState = {
   isLoading: false,
   //LOGIN_STATES//
   loggedIn: false,
   successLogin: "",
   actualPath: "",
   logginIn: false,
   //LOGIN_ERRORS//
   loginRegisterErrors: {},
   //USUARIO_STATES
   allUsers:[],
   usuario: {},
   perfilUsuario: [],
   verificacionDeUsuario: {},
   mensajeDeVerificacionDeContraseña: [],  
   //NOTICIAS STATES//
   noticias: [],
   noticiasPPage:[],
  noticiasBackUp: [],
  actualDash:0,
  detalleNoticia: {},
  notFoundNoticias:false,
  loginRegisterLocal: "",
  categorias: [],
  deleteNotice: {},
  updateNotice: {},
  noticeById: {},
   //SPONSOR STATES
   sponsor:[],
   sponsorBackUp:[],
   updateSponsor:{},
   sponsorById:{}

  partidos: []
};

export default function rootReducer(state = initialState, action) {
   switch (action.type) {
      case IS_LOADING:
         return {
            ...state,
            isLoading: true,
         };
        case NOTICIAS_PER_PAGE:
        return {
          ...state,
          noticiasPPage:action.payload

        }
    case GET_ALL_NOTICIAS:
      let filterNotice = action.payload.filter((el) => el.active === true)
      return {
        ...state,
        noticias: filterNotice,
        isLoading: false,
        noticiasBackUp:filterNotice,
        notFoundNoticias:false
      };
      case GET_NOTICIAS_BY_TITLE:
         return {
            ...state,
            noticias: action.payload,
            notFoundNoticias: false,
         };
      case GET_NOTICIA_DETAIL:
         return {
            ...state,
            detalleNoticia: action.payload,
            isLoading: false,
            notFoundNoticias: false,
         };
      case FILTER_NOTICIAS:
         return {
            noticias: action.payload,
            isLoading: false,
            notFoundNoticias: false,
         };
      case CLEAN_FILTERS_NOTICIAS:
         return {
            ...state,
            noticias: [...state.noticiasBackUp],
            notFoundNoticias: false,
         };
      case CLEAN_NOTICIA_DETAIL:
         return {
            ...state,
            detalleNoticia: {},
         };
      case NOT_FOUND_NOTICIAS:
         return {
            ...state,
            notFoundNoticias: true,
         };
         //SPONSOR//
      case GET_ALL_SPONSOR:
         return{
            ...state,
            sponsor:action.payload,
            sponsorBackUp:action.payload
         }
      
      case UPDATE_SPONSOR:
         return{
            ...state,
            updateSponsor:action.payload
         }

      case GET_SPONSOR_BY_ID:
         return{
            ...state,
            sponsorById:action.payload
         }
     
         //LOCAL_LOGIN CASES//
      case LOCAL_LOGIN:
         if (action.payload.statusCode !== 203) {
            localStorage.setItem("access_token", action.payload.access_token);
            localStorage.setItem("userLogin", true);
            localStorage.setItem("userId", action.payload.id);
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
         localStorage.removeItem("access_token");
         localStorage.removeItem("userLogin");
         localStorage.removeItem("userId");
         return {
            ...state,
            isLoading: false,
            logginIn: false,
            usuario: [],
            loggedIn: false,
            actualPath: "",
            successLogin: "",
            perfilUsuario: [],
         };
      //REGISTER CASES//
      case REGISTER_USER: //REGISTRO CON GOOGLE
         localStorage.setItem(
            "access_token",
            action.payload.access_token.access_token
         );
         localStorage.setItem("userLogin", true);
         localStorage.setItem("userId", action.payload.id);

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
      case GET_ALL_USERS:
         return {
            ...state,
            allUsers: action.payload,
            isLoading: false,
         }
     
      case GET_USER_BY_ID:
         return {
            ...state,
            isLoading: false,
            perfilUsuario: action.payload,
         };
        //DASHBOARD ADMIN STATES
      case RENDER_CORRECT_DASH:
        return{
          ...state,
          actualDash:action.payload
        }
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
        case GET_ALL_CATEGORIES: 
        return {
          ...state,
          categorias: action.payload
        }
        case GET_NOTICIAS_BY_CATEGORY:
          let filterNoticeForCategorie = action.payload.filter((el) => el.active === true) 
        return {
          ...state,
         noticias: filterNoticeForCategorie 
        }
        case GET_USER_BY_EMAIL:
         return{
            ...state,
            verificacionDeUsuario: action.payload
         }
         case UPDATE_PASSWORD:
         return{
            ...state,
            mensajeDeVerificacionDeContraseña: action.payload
         };
         
        case DELETE_NOTICE: 
        return {
          ...state,
          deleteNotice: action.payload
        }
        case GET_NOTICE_BY_ID:
          return {
            ...state,
            noticeById: action.payload
          }
        case UPDATE_NOTICE: 
        return {
          ...state,
          updateNotice: action.payload
        }
        case GET_ALL_ROLES:
         return {
            roles: action.payload,
         };
        case GET_ALL_MATCH: 
        return {
         ...state,
         partidos: action.payload

        } 
      case GET_ALL_ROLES_BY_ID:
         return { ...state };
      case POST_ROL:
         return { ...state };
      case PATCH_ROL:
         return { ...state };
      case DELETE_ROL:
         return { ...state };   
   
    default:
      return { ...state };
  }
}
