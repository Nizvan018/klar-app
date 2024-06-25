import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { main } from '@assets/styles/main';

interface Props {
    isModalVisible: boolean,
    setIsModalVisible: (value: boolean) => void
    closeModal: () => void
    lockCard: (index: number) => void
    index: number
    isLocked: boolean
}

export default function ConfirmModal({ isModalVisible, setIsModalVisible, closeModal, lockCard, index, isLocked }: Props) {
    return (
        <Modal
            visible={isModalVisible}
            onRequestClose={closeModal}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.modal_container}>
                <View style={styles.modal_card}>
                    <View style={[main.flex, main.gap_8, main.align_center, main.mb_16]}>
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>Confirmación de seguridad</Text>
                        {isLocked ? (
                            <Text style={{ fontSize: 16, textAlign: 'center' }}>Al desbloquear tu tarjeta, se volverá a habilitar para realizar compras. Pero antes, asegúrate de tener tu tarjeta contigo.</Text>
                        ) : (
                            <Text style={{ fontSize: 16, textAlign: 'center' }}>Bloquear tu tarjeta impedirá todas las compras. Pero no te preocupes, las transferencias entrantes y salientes seguirán funcionando sin problemas.</Text>
                        )}
                    </View>
                    <TouchableOpacity onPress={() => lockCard(index)} style={styles.primary_button}>
                        <Text style={styles.primary_button_text}>{isLocked ? 'Desbloquear tarjeta' : 'Bloquear tarjeta'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setIsModalVisible(false); }} style={styles.secondary_button}>
                        <Text style={styles.secondary_button_text}>Cerrar</Text>
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
        height: '32%',
        width: '100%',
        paddingHorizontal: 16,
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
