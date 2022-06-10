import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useRef } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Background } from '../components/Background';
import { Logo } from '../components/Logo';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

    //Accedo al context
    const { signIn, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (errorMessage.length === 0) {
            return;
        } else {
            Alert.alert('Error', errorMessage, [{ text: 'Ok', onPress: removeError }]);
        }
    }, [errorMessage])

    const onLogin = () => {
        Keyboard.dismiss();
        signIn({ correo: email, password });//signIn es la funcion del context
    }

    //para hacer referencia al input del pw, cuando toco el boton de enviar (desde el teclado) desde el input del mail
    const passwordInput = useRef<TextInput>();

    return (
        <>

            {/* Background */}
            <Background />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <View style={loginStyles.formContainer}>

                    {/* Keyboard Avoid View */}
                    <Logo />

                    <Text style={loginStyles.title}>Login</Text>

                    <Text style={loginStyles.label}>Email:</Text>
                    <TextInput
                        placeholder='Insert email...'
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        keyboardType='email-address'
                        underlineColorAndroid="rgba(255,255,255,0.3)"
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIos
                        ]}
                        selectionColor='#fff'

                        value={email}
                        onChangeText={(value) => onChange(value, 'email')}
                        onSubmitEditing={() => passwordInput.current?.focus()}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    <Text style={loginStyles.label}>Password:</Text>
                    <TextInput
                        placeholder='******'
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        underlineColorAndroid="rgba(255,255,255,0.3)"
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIos
                        ]}
                        selectionColor='#fff'
                        secureTextEntry={true}
                        ref={passwordInput as any}
                        onSubmitEditing={onLogin}


                        value={password}
                        onChangeText={(value) => onChange(value, 'password')}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    {/* Button Login */}
                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            onPress={onLogin}
                            style={loginStyles.button}
                            activeOpacity={0.5}
                        >
                            <Text style={loginStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Create new account */}
                    <View style={loginStyles.newUserContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.replace('RegisterScreen')}
                            activeOpacity={0.5}
                        >
                            <Text style={loginStyles.newUserText}>Create new account</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </KeyboardAvoidingView>

        </>
    )
}
