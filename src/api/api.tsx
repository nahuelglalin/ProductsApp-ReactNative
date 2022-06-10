import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL = 'https://cafe-mern-nahuelglalin.herokuapp.com/api';

const api = axios.create({baseURL});

//Esto es un middleware de axios.
api.interceptors.request.use(
    async (config: any) => {
        //1. Obtengo el token del storage.
        const token = await AsyncStorage.getItem('token');

        //2. Si existe el token, le coloca un header a la petición HTTP.
        //la key va a ser 'x-token' y el value va a ser el token obtenido del storage
        if(token) {
            config.headers['x-token'] = token;
        };
        return config;
    }
)

export default api;