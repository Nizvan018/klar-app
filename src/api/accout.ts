import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { DB } from "firebase-config";
import { Account } from "@/types/database.type";
import Toast from "react-native-toast-message";

// Method to query recipients from database:
export const getAccout = async (user_id: string | undefined, setAccout: any) => {
    try {
        if (user_id) {
            const docRef = doc(DB, 'account', user_id);

            const unsub = onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    setAccout(doc.data());
                }
            }, (error) => {
                console.log(error);
            });
        }
    } catch (e) {
        console.log(e);

        Toast.show({
            type: 'error',
            text1: 'Sucedió un error inesperado, intente más tarde'
        });

        return false;
    }
}