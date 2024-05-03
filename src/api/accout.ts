import { collection, doc, getDocs, getDoc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { DB } from "firebase-config";
import { Account } from "@/types/database.type";
import Toast from "react-native-toast-message";

// Method to get an account from database:
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

// Method to update an account from database:
export const updateAccount = async (user_id: string | undefined, amount: number) => {
    try {
        if (user_id) {
            const docRef = doc(DB, 'account', user_id);
            const current = await getDoc(docRef);

            if (current.exists()) {
                const newAmount = current.data().amount + amount;

                const updated = updateDoc(docRef, {
                    amount: newAmount
                })
            }

            return true;
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

// Method to update an account with number from database:
export const updateAccountWithNumber = async (numberType: string, number: number | undefined, amount: number) => {
    try {
        let docs;

        if (numberType == 'CLABE') {
            docs = await getDocs(query(collection(DB, 'account'), where("clabe", "==", number)));
        } else {
            docs = await getDocs(query(collection(DB, 'account'), where("card_number", "==", number)));
        }

        if (!docs.empty) {
            const current = docs.docs[0];
            const id = current.id;
            const newAmount = Number(current.data().amount) + Number(amount);

            const docRef = doc(DB, 'account', id);

            const updated = updateDoc(docRef, {
                amount: Number(newAmount)
            });
        }

        return true;
    } catch (e) {
        console.log(e);

        Toast.show({
            type: 'error',
            text1: 'Sucedió un error inesperado, intente más tarde'
        });

        return false;
    }
}