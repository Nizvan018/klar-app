import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { main } from '@assets/styles/main';

interface Props {
    isModalVisible: boolean,
    setIsModalVisible: (value: boolean) => void
    closeModal: () => void
}

export default function NIPModal({ isModalVisible, setIsModalVisible, closeModal }: Props) {
    return (
        <Modal
            visible={isModalVisible}
            onRequestClose={closeModal}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.modal_container}>
                <View style={styles.modal_card}>
                    <View style={[main.flex, main.gap_16, main.align_center, main.mb_16]}>
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>¿Cambiaste tu NIP y no ha sido actualizado?</Text>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Ve a otro cajero y realiza una consulta de saldo seleccionando "Tarjeta de Crédito", pues cada vez que lo haces, tu tarjeta sincroniza con nuestros servidores.</Text>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>La operación de "Cambiar NIP" solo funciona con <Text style={main.bold}>HSBC, Banorte, Santander o Scotiabank, por favor evita ir a otros cajeros automáticos.</Text></Text>
                    </View>

                    <TouchableOpacity onPress={() => { setIsModalVisible(false); }} style={styles.primary_button}>
                        <Text style={styles.primary_button_text}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal_container: {
        position: 'relative',
        height: '100%',
        backgroundColor: 'transparent'
    },
    modal_card: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 8,
        height: '34%',
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 16,
        backgroundColor: 'white'
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
