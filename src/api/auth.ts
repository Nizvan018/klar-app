import { FIREBASE_AUTH } from "firebase-config";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = FIREBASE_AUTH;


export const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
        })
        .catch((error) => {
            console.log(error);
        });

}

export const logout = () => {
    signOut(auth);
}