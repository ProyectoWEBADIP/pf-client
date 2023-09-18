import { POST_CATEGORIAS, GET_ALL_CATEGORIES } from "./categoriasActionTypes";
import axios from '../../../axios-config';

export function postCategoria(body) {
   return async () => {
      try {
         const { data } = await axios.post(
            `/categories`,
            body
         );
         return data;
      } catch (error) {
         return alert(error.message);
      }
   }; 
}
export function getAllCategories() {
   return async (dispatch) => {
      try {
         const { data } = await axios("/categories");
         dispatch({ type: GET_ALL_CATEGORIES, payload: data });
      } catch (error) {
         return console.log(error.message);
      }
   };
}
