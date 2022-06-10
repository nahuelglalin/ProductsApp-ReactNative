//Solo se va a poder acceder a esta pantalla si esta autenticado
import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

    const {user, logOut} = useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: "#fff" }}>ProtectedScreen</Text>


            <Text style={{color: '#fff'}}>Usuario Logeado: {user?.nombre}</Text>
      
            <Button
                title='Logout'
                onPress={logOut}
            />

        </View>
    )
}

