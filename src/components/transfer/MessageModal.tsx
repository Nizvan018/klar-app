import { Recipient } from '@/types/database.type';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { main } from '@assets/styles/main';
import { addTransfer, getTransfer } from '@/api/transfers';
import { Transfer } from '@/types/database.type';
import { useUser } from '@/context/AuthContext';
import { updateAccount, updateAccountWithNumber } from '@/api/accout';
import ConfirmCard from './ConfirmCard';
import { useEffect, useState } from 'react';
import TransferCard from './TransferCard';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';

interface Props {
    isModalVisible: boolean
    setIsModalVisible: (arg: boolean) => void,
    contact: Recipient,
    amount: number,
    concept: string,
    reference?: number
    setData: (arg: {}) => void
}

export default function MessageModal({ isModalVisible, setIsModalVisible, contact, amount, concept, reference, setData }: Props) {
    const { user, account } = useUser();
    const [itsDone, setItsDone] = useState(false);
    const [transferData, setTransferData] = useState({});
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const [isCharging, setIsCharging] = useState(false);

    const makeTransaction = async () => {
        setIsCharging(true);

        const transfer: Transfer = {
            transmitter: Number(account?.clabe),
            recipient: Number(contact.number),
            amount: Number(amount),
            concept: concept,
            reference: Number(reference),
            type: 1
        }

        const res_update = await updateAccount(user?.uid, (-amount));
        const res_recipient = await updateAccountWithNumber(contact.numberType, contact.number, Number(amount));
        const res_transfer = await addTransfer(transfer);

        console.log(res_update, res_transfer, res_recipient);

        if (res_transfer != false) {
            const data = await getTransfer(res_transfer);

            if (data) {
                setTransferData(data);
            }
        }

        setIsCharging(false);
        setIsModalVisible(false);
        setItsDone(true);
    }

    const finish = () => {
        navigation.navigate('General');
    }

    const closeModal = () => {
        if (!itsDone) {
            setIsModalVisible(false)
            setData({});
        } else {
            navigation.navigate('General');
        }
    }

    useEffect(() => {
        if (itsDone) {
            setIsModalVisible(true);
        }
    }, [itsDone]);

    return (
        <Modal
            visible={isModalVisible}
            onRequestClose={closeModal}
            animationType='slide'
            transparent={true}
        >
            {!itsDone ? (
                <ConfirmCard setIsModalVisible={setIsModalVisible} makeTransaction={makeTransaction} setData={setData} contact={contact} amount={amount} isCharging={isCharging} />
            ) : (
                <TransferCard finish={finish} contact={contact} data={transferData} />
            )}
        </Modal>
    )
}