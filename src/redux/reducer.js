import { GET_ALL_NOTICIAS } from "./actions"



const golabalState = {
    noticias: [],
    copiaNoticias: [],
    detalleNoticia: {}
}

export default function rootReducer(state = golabalState, action) {
    switch (action.type) {
        case GET_ALL_NOTICIAS: 
        return {
            ...state,
            noticias: action.payload,
            copiaNoticias: action.payload
        }
        default:
            return { ...state }
    }
}