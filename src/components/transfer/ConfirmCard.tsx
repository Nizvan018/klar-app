import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { main } from "@assets/styles/main";
import { Recipient } from "@/types/database.type";

interface Props {
    setIsModalVisible: (arg: boolean) => void
    makeTransaction: () => void
    setData: (arg: {}) => void
    contact: Recipient
    amount: number
    isCharging: boolean
}

export default function ConfirmCard({ contact, amount, makeTransaction, setIsModalVisible, setData, isCharging = false }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Confirmar la transferencia {contact.numberType}</Text>

                <View style={styles.inner_card}>
                    <Text style={[main.color_primary, styles.inner_title]}>Mandar dinero vía Klar</Text>
                    <View style={styles.row}>
                        <Text>Monto</Text>
                        <Text style={styles.text_gray}>${amount}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Destinatario</Text>
                        <Text style={styles.text_gray}>{contact.name}</Text>
                    </View>
                    <View style={[main.mb_16, styles.row]}>
                        <Text>{contact.numberType}</Text>
                        <Text style={styles.text_gray}>{contact.number}</Text>
                    </View>
                </View>

                <Text style={styles.advicement}>Transferencias protegidas por tu dispositivo de confianza y su segundo factor de autenticación</Text>

                <TouchableOpacity onPress={makeTransaction} style={styles.primary_button}>
                    <Text style={styles.primary_button_text}>Enviar dinero</Text>
                    {isCharging && (
                        <View>
                            <ActivityIndicator color={'white'} size='small' />
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setIsModalVisible(false); setData({}); }} style={styles.secondary_button}>
                    <Text style={styles.secondary_button_text}>Cerrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
        backgroundColor: 'transparent'
    },
    card: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '58%',
        width: '100%',
        padding: 16,
        borderRadius: 16,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 48
    },
    inner_card: {
        display: 'flex',
        gap: 8,
        width: '100%',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#eee'
    },
    inner_title: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 8
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text_gray: {
        color: 'gray'
    },
    advicement: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 16
    },
    primary_button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        width: '100%',
        marginBottom: 12,
        borderRadius: 8,
        paddingVertical: 18,
        backgroundColor: '#222'
    },
    secondary_button: {
        width: '100%',
        marginBottom: 20,
        borderRadius: 8,
        paddingVertical: 18,
        backgroundColor: 'transparent'
    },
    primary_button_text: {
        textAlign: 'center',
        color: 'white'
    },
    secondary_button_text: {
        textAlign: 'center',
        color: 'black'
    }
});