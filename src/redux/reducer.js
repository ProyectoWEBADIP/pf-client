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
  NOTICIAS_PER_PAGE
} from "./noticiasActions/noticiasActionTypes";
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
} from "./login-registerActions/actionTypes";
//Categorias types
import { GET_ALL_CATEGORIES } from "../redux/categoriasActions/categoriasActionTypes";
//USERS TYPES
import { GET_ALL_USERS } from "./usersActions/usersActionTypes";
// -------> Roles types <------
import {
   GET_ALL_ROLES,
   GET_ALL_ROLES_BY_ID,
   PATCH_ROL,
   DELETE_ROL,
   POST_ROL,
} from "./rolesActions/rolesActionsTypes";
//DASHBOARD TYPES
import {RENDER_CORRECT_DASH} from './dashboardAdminActions/actionTypes'
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
   usuario: {},
   perfilUsuario: [],
   //NOTICIAS STATES//
   noticias: [],
   noticiasPPage:[],
  noticiasBackUp: [],
   detalleNoticia: {},
   notFoundNoticias: false,
   loginRegisterLocal: "",
   categorias: [],
  //ADMIN DASHBOARDS STATES
  actualDash:0,
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
         return {
            ...state,
            noticias: action.payload,
            isLoading: false,
            noticiasBackUp: action.payload,
            notFoundNoticias: false,
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
            loginRegisterLocal: action.payload,
         };
      case GET_ALL_CATEGORIES:
         return {
            ...state,
            categorias: action.payload,
         };
      case GET_NOTICIAS_BY_CATEGORY:
         return {
            ...state,
            noticias: action.payload,
         };
      //------------> Roles <----------------//
      case GET_ALL_ROLES:
         return {
            ...state,
            roles: action.payload,
         };
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
