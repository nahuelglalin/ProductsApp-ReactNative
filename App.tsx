import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/ProductsContext';
import { StatusBar } from 'react-native';


const App = () => {
    return (
        <NavigationContainer>
            <AppState>
                <Navigator />
            </AppState>
        </NavigationContainer>
    )
}

const AppState = ({ children }: any) => {
    return (
        <AuthProvider>
            <StatusBar
                backgroundColor="black"
                barStyle="light-content"
            />
            <ProductsProvider>
                {children}
            </ProductsProvider>
        </AuthProvider>
    )
}

export default App;
