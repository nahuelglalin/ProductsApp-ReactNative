import { Usuario } from "../interfaces/appInterfaces";
import { AuthState } from "./AuthContext";

//tipos de acciones que se van a manejar en el reducer
type AuthAction = 
    | { type: 'SIGN_UP'; payload: {token: string; user: Usuario} }
    | { type: 'ADD_ERROR', payload: string }
    | { type: 'REMOVE_ERROR' }
    | { type: 'NOT_AUTHENTICATED'}
    | { type: 'LOG_OUT'}

//reducer
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'ADD_ERROR':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            }

        case 'REMOVE_ERROR':
            return {
                ...state,
                errorMessage: ''
            }
        
        case 'SIGN_UP':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }
        
        case 'LOG_OUT':
        case 'NOT_AUTHENTICATED':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null
            }
        
        default:
            return state;
    }  
}