import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { DB } from "firebase-config";
import { Recipient } from "@/types/database.type";
import Toast from "react-native-toast-message";

export const addRecipient = async (recipient: Recipient, user_id: string | undefined) => {
    try {
        let repetido = false;
        const docs = await getDocs(query(collection(DB, 'recipient'), where("user_id", "==", user_id)));

        docs.forEach((doc) => {
            if (doc.data().name === recipient.name || doc.data().number === recipient.number) {
                Toast.show({
                    type: 'error',
                    text1: 'Destinatario ya existe'
                });

                repetido = true;
            }
        });

        if (repetido) {
            return
        }

        const docRef = await addDoc(collection(DB, "recipient"), {
            name: recipient.name,
            numberType: recipient.numberType,
            number: recipient.number,
            ...(recipient.label && { label: recipient.label }),
            user_id: user_id
        });

        Toast.show({
            type: 'success',
            text1: 'Destinatario agregado correctamente'
        });
    } catch (e) {
        Toast.show({
            type: 'error',
            text1: 'Sucedió un error inesperado, intente más tarde'
        });
    }
}