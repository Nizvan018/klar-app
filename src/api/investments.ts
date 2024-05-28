import { DB } from 'firebase-config';
import { Investment } from '@/types/database.type';
import Toast from 'react-native-toast-message';
import { addDoc, collection } from 'firebase/firestore';

// Method to create a new investments in the db:
export const addInvestments = async (investment: Investment) => {
    try {
        const docRef = await addDoc(collection(DB, "investment"), {
            account_id: investment.account_id,
            name: investment.name,
            type: investment.type,
            rate: investment.rate,
            amount: investment.amount,
            initDate: investment.initDate,
            finalDate: investment.finalDate
        });

        return docRef;
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Sucedió un error inesperado, intente más tarde'
        });

        return error;
    }
}