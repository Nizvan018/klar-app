import { DB } from 'firebase-config';
import { Investment } from '@/types/database.type';
import Toast from 'react-native-toast-message';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';

// Method to set a snapshot on investment collection:
export const getInvestments = async (user_id: string | undefined, setInvestments: any) => {
    try {
        if (user_id) {
            const q = query(collection(DB, "investment"), where("account_id", "==", user_id));

            const unsub = onSnapshot(q, (querySnapshot) => {
                const investments: any[] = [];

                querySnapshot.forEach(investment => {
                    investments.push(investment);
                });

                setInvestments(investments);
            }, (error) => {
                console.log(error);
            });
        }
    } catch (error) {
        console.log(error);

        Toast.show({
            type: 'error',
            text1: 'Sucedió un error inesperado, intente más tarde'
        });
    }
}

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
            cutoffDate: investment.cutoffDate,
            finalDate: investment.finalDate,
            isFinished: investment.isFinished
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