import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50
    },
    title: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: "#fff",
        fontWeight: 'bold',
    },
    inputField: {
        color: "#fff",
        fontSize: 20,
    },
    inputFieldIos: {
        borderBottomColor: "rgba(255,255,255,0.3)",
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        borderWidth: 1,
        borderColor: "#9c2c9a",
        backgroundColor: '#BE3487',
        padding: 10,
        width: 200,
        borderRadius: 50,
        alignItems: 'center',
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: 'bold'
    },
    newUserContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    newUserText: {
        color: "#decfad",
        fontSize: 16,
    },
    buttonReturn: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
        borderRadius: 50,
    }
})