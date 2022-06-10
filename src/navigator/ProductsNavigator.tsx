import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { ActivityIndicator } from 'react-native';

//Defino cual es el stack de screen que voy a usar
export type ProductsStackParams = {
    ProductsScreen: undefined;
    ProductScreen: {id?: string, name?: string};
}

const Stack = createStackNavigator<ProductsStackParams>();

export const ProductsNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: '#151217'
                },
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent',
                    backgroundColor: '#211b24',
                },
                headerTitleStyle: {
                    color: '#fff'
                },
            }}
        >
            <Stack.Screen name="ProductsScreen" options={{title: 'Products'}} component={ProductsScreen} /> 
            <Stack.Screen name="ProductScreen" component={ProductScreen} /> 
      
        </Stack.Navigator>
    );
}
