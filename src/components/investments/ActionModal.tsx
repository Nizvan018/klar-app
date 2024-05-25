import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { main } from '@assets/styles/main';

interface Props {
    isModalVisible: boolean
    closeModal: () => void
    changeAction: (action: "reinvest" | "retire") => void
    action: string
    actionOptions: { "reinvest": string, "retire": string }
}

export default function ActionModal({ isModalVisible, closeModal, changeAction, action, actionOptions }: Props) {
    return (
        <Modal
            visible={isModalVisible}
            onRequestClose={closeModal}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.modal_container}>
                <View style={styles.modal_card}>
                    <Text style={[main.color_gray, main.p_16, styles.text_16]}>Seleccionar una acción</Text>
                    <TouchableOpacity onPress={() => changeAction("reinvest")} style={[styles.modal_options, action === "reinvest" ? { backgroundColor: 'black' } : {}]}>
                        <Text style={[{ textAlign: 'center' }, styles.text_16, action === "reinvest" ? { color: 'white' } : {}]}>{actionOptions["reinvest"]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeAction("retire")} style={[styles.modal_options, action === "retire" ? { backgroundColor: 'black' } : {}]}>
                        <Text style={[{ textAlign: 'center' }, styles.text_16, action === "retire" ? { color: 'white' } : {}]}>{actionOptions["retire"]}</Text>
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
        backgroundColor: 'transparent',
    },
    modal_card: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '20%',
        width: '100%',
        paddingTop: 16,
        borderRadius: 16,
        backgroundColor: 'white'
    },
    modal_options: {
        width: '100%',
        padding: 16,
        textAlign: 'center'
    },
    text_16: {
        fontSize: 16
    }
});