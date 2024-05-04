import { DocumentReference, addDoc, collection, doc, getDoc, getDocs, limit, onSnapshot, or, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { DB } from "firebase-config";
import { Transfer } from "@/types/database.type";
import Toast from "react-native-toast-message";

// Method to query transfer from database:
export const getTransfer = async (docRef: DocumentReference) => {
    try {
        const doc = await getDoc(docRef);

        return doc.data();
    } catch (e) {
        console.log(e);

        Toast.show({
            type: 'error',
            text1: 'Sucedió un error inesperado, intente más tarde'
        });

        return true;
    }
}

// Method to query transfers from database:
export const getTransfers = async (accountNumber: number) => {
    try {
        const docs = await getDocs(query(collection(DB, 'transfer'), where("transmitter", "==", accountNumber)));
        const transfers = new Array();

        docs.forEach(doc => {
            transfers.push(doc);
        });

        return transfers;
    } catch (e) {
        console.log(e);

        Toast.show({
            type: 'error',
            text1: 'Sucedió un error inesperado, intente más tarde'
        });

        return false;
    }
}

// Method to query transfers with user id from database:
export const getUserTransfers = async (accountNumber: number) => {
    try {
        const date = new Date();
        const q = query(collection(DB, 'transfer'),
            or(
                where("transmitter", "==", accountNumber),
                where("recipient", "==", accountNumber)
            ),
            orderBy("date", "desc"),
            limit(20)
        );

        const docs = await getDocs(q);
        const transfers = new Array();

        docs.forEach(doc => {
            transfers.push(doc.data());
        });

        return transfers;
    } catch (e) {
        console.log(e);

        Toast.show({
            type: 'error',
            text1: 'Sucedió un error inesperado, intente más tarde'
        });

        return false;
    }

}

// Method to add transfers to the database:
export const addTransfer = async (transfer: Transfer) => {
    try {
        const docRef = await addDoc(collection(DB, "transfer"), {
            transmitter: transfer.transmitter,
            recipient: transfer.recipient,
            amount: transfer.amount,
            concept: transfer.concept,
            ...(transfer.reference && { reference: transfer.reference }),
            date: serverTimestamp()
        });

        return docRef;
    } catch (e) {
        console.log(e);

        Toast.show({
            type: 'error',
            text1: 'Sucedió un error inesperado, intente más tarde'
        })

        return false;
    }
}