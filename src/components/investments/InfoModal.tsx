import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { main } from '@assets/styles/main';

interface Props {
    isModalVisible: boolean
    closeModal: () => void
    action: 'reinvest' | 'retire'
}

export default function InfoModal({ isModalVisible, closeModal, action }: Props) {
    return (
        <Modal
            visible={isModalVisible}
            onRequestClose={closeModal}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.modal_container}>
                <View style={styles.modal_card}>
                    <View style={[styles.icon_area, main.mb_16]}>
                        <Foundation name="info" size={64} color={'black'} />
                    </View>

                    {action == 'retire' ? (
                        <>
                            <Text style={[main.bold, styles.text, main.mb_8, main.mt_8]}>Fin del plazo: Retirar todo</Text>
                            <Text style={[styles.text, main.mb_16]}>Al finalizar el plazo, tu inversión inicial se depositará en tu cuenta de débito. Recuerda que los intereses ya habrán sido depositados semanalmente en tu cuenta de débito.</Text>
                        </>
                    ) : (
                        <>
                            <Text style={[main.bold, styles.text, main.mb_8, main.mt_8]}>Fin del plazo: Reinvertir la cantidad inicial</Text>
                            <Text style={[styles.text, main.mb_16]}>Al finalizar el plazo, tu inversión inicial se invertirá nuevamente. Recuerda que los intereses ya habrán sido depositados semanalmente en tu cuenta de débito.</Text>
                        </>
                    )}

                    <TouchableOpacity onPress={closeModal} style={[styles.primary_button, main.mt_16]}>
                        <Text style={styles.primary_button_text}>Ok</Text>
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
        height: '45%',
        width: '100%',
        padding: 16,
        borderRadius: 16,
        backgroundColor: 'white'
    },
    modal_options: {
        width: '100%',
        padding: 16,
        textAlign: 'center'
    },
    icon_area: {
        display: 'flex',
        alignItems: 'center',
        aspectRatio: 1,
        padding: 24,
        borderRadius: 100,
        backgroundColor: '#ded'
    },
    title: {
        fontSize: 18
    },
    text: {
        fontSize: 16,
        textAlign: 'center'
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