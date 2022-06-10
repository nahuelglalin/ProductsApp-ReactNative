import React, { createContext, useReducer, useEffect } from "react";
import api from "../api/api";
import { LoginData, LoginResponse, Usuario, RegisterData } from '../interfaces/appInterfaces';
import { authReducer } from './AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

//1.Defino que información voy a manejar
export interface AuthState {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
}

//2.Definir el initialState
export const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

//3.Interfaz de Props
type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

//4. Crear el Context
export const AuthContext = createContext({} as AuthContextProps);

//5. Exponer el proveedor de información
export const AuthProvider = ({children}: any) => {

    const [state, dispatch] = useReducer( authReducer, authInitialState);

    
    const validateToken = async () => {
        const token = await AsyncStorage.getItem('token');//Leo el token del storage.

        //si el token es null, ejecuto la action Not Authenticated
        if(token === null) {
            return dispatch({type: 'NOT_AUTHENTICATED'});
        } else {
            //Aca tengo que hacer una llamada a la API para validar el token
            //Es decir, traerme la info del usuario segun su token
            const resp = await api.get('/auth');

            if (resp.status !== 200) {
                dispatch({type: 'NOT_AUTHENTICATED'});
            } else {
                dispatch({ type: 'SIGN_UP', payload: {token: resp.data.token, user: resp.data.usuario} });
            }

        }
    }
    
    useEffect(() => {
       validateToken();
    }, [])

    //Funcion que hace el login. Recibe el correo y el password para pasarselos al post del login
    const signIn =  async ({correo, password}: LoginData) => {
        try {
            //La respuesta del post es de tipo LoginResponse
            const resp = await api.post<LoginResponse>('/auth/login', {correo, password} );
            dispatch({ type: 'SIGN_UP', payload: {token: resp.data.token, user: resp.data.usuario} });

            //guardo el token en el storage
            await AsyncStorage.setItem('token', resp.data.token);

        } catch (error: any) {
            console.log(error.response.data.msg);
            dispatch({ type: 'ADD_ERROR', payload: error.response.data.msg || "Información incorrecta" });
        }
    };

    //Funcion para registrarse
    const signUp = async (obj: RegisterData ) => {
        try{
            //Hago la peticion HTTP, mandando el obj por body
            let resp = await api.post<LoginResponse>('/usuarios', obj)
            dispatch({ type: 'SIGN_UP', payload: {token: resp.data.token, user: resp.data.usuario} });

            //guardo el token en el storage
            await AsyncStorage.setItem('token', resp.data.token);

        } catch (error: any) {
            dispatch({ type: 'ADD_ERROR', payload: error.response.data.errors[0].msg || "Información incorrecta" });
        } 
    };

    //Funcion para hacer el logout de mi app
    const logOut = async () => {
        await AsyncStorage.removeItem('token');//Limpio el token del storage
        dispatch({ type: 'LOG_OUT' });//Ejecuto la accion del logout
    };

    const removeError = () => {
        console.log('ejecutando el logout');
        dispatch({ type: 'REMOVE_ERROR' });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signUp: signUp,
                signIn: signIn,
                logOut: logOut,
                removeError: removeError
            }}
        >

            {children}
        </AuthContext.Provider>
    )
}
