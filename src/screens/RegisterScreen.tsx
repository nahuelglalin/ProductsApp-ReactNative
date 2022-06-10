import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useRef } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Logo } from '../components/Logo';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> { }

export const RegisterScreen = ({ navigation }: Props) => {

    const {signUp, errorMessage, removeError} = useContext(AuthContext);

    const { name, email, password, onChange } = useForm({
        name: '',
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

    const onRegister = () => {
        signUp({nombre: name, correo: email, password});

        Keyboard.dismiss();
    }

    //para hacer referencia al input del pw, cuando toco el boton de enviar (desde el teclado) desde el input del mail
    const emailInput = useRef<TextInput>();
    const passwordInput = useRef<TextInput>();


    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#20072b' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <View style={loginStyles.formContainer}>

                    {/* Keyboard Avoid View */}
                    <Logo />

                    <Text style={loginStyles.title}>Register</Text>

                    {/* Name */}
                    <Text style={loginStyles.label}>Name:</Text>
                    <TextInput
                        placeholder='Insert name...'
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        underlineColorAndroid="rgba(255,255,255,0.3)"
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIos
                        ]}
                        selectionColor='#fff'

                        value={name}
                        onChangeText={(value) => onChange(value, 'name')}
                        onSubmitEditing={() => emailInput.current?.focus()}

                        autoCapitalize='words'
                        autoCorrect={false}
                    />

                    {/* Email */}
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
                        ref={emailInput as any}

                        value={email}
                        onChangeText={(value) => onChange(value, 'email')}
                        onSubmitEditing={() => passwordInput.current?.focus()}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    {/* Password */}
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
                        onSubmitEditing={onRegister}


                        value={password}
                        onChangeText={(value) => onChange(value, 'password')}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    {/* Button Login */}
                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            onPress={onRegister}
                            style={loginStyles.button}
                            activeOpacity={0.5}
                        >
                            <Text style={loginStyles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Create new account */}
                    <TouchableOpacity
                        onPress={() => navigation.replace('LoginScreen')}
                        activeOpacity={0.5}
                        style={loginStyles.buttonReturn}
                    >
                        <Text style={loginStyles.newUserText}>Login</Text>
                    </TouchableOpacity>


                </View>

            </KeyboardAvoidingView>

        </>
    );
}
