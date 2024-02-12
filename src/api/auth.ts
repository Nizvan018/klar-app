import { FIREBASE_AUTH } from "firebase-config";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Toast from "react-native-toast-message";

const auth = FIREBASE_AUTH;


export const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            Toast.show({
                type: 'success',
                text1: 'Sesión iniciada correctamente'
            });
        })
        .catch((error) => {
            let message = "";

            if (error.code == "auth/invalid-credential") {
                message = 'Usuario o contraseña incorrectos';
            } else if (error.code == "auth/too-many-requests") {
                message = 'Temporalmente bloqueado, intenta más tarde';
            } else {
                message = "Error desconocido";
            }

            Toast.show({
                type: 'error',
                text1: message
            });
        });

}

export const logout = () => {
    signOut(auth);
}