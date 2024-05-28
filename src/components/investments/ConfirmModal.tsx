import { View, Text, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather, AntDesign } from "@expo/vector-icons";
import { main } from '@assets/styles/main';

interface Props {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    closeModal: () => void
    makeInversion: any
    isLoading: boolean
    investmentType: 'Flex' | 'Fixed'
}

export default function ConfirmModal({ isModalVisible, setIsModalVisible, closeModal, makeInversion, isLoading, investmentType }: Props) {
    return (
        <Modal
            visible={isModalVisible}
            onRequestClose={closeModal}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.modal_container}>
                <View style={styles.modal_card}>
                    {isLoading ? (
                        <>
                            <View style={[styles.icon_area, main.mb_16]}>
                                <AntDesign name="clockcircle" size={64} color={'black'} />
                            </View>

                            <Text style={[main.bold, styles.text, main.mb_8]}>Creando tu inversión</Text>
                            <Text style={[styles.text, main.mb_16]}>Tu inversión estará lista en unos segundos.</Text>
                        </>
                    ) : (
                        <>
                            <View style={[styles.icon_area, main.mb_16]}>
                                <Feather name="alert-triangle" size={64} color={'black'} />
                            </View>

                            {investmentType == 'Fixed' ? (
                                <>
                                    <Text style={[main.bold, styles.text, main.mb_8]}>¿Crear una inversión fija?</Text>
                                    <Text style={[styles.text, main.mb_16]}>Tu inversión estará lista en unos segundos. <Text style={[main.bold, styles.text]}>Toma en cuenta que no podrás realizar retiros durante el plazo, pero recibirás el pago de interes de forma diaria.</Text></Text>
                                </>
                            ) : (
                                <>
                                    <Text style={[main.bold, styles.text, main.mb_8]}>¿Crear una inversión flexible?</Text>
                                    <Text style={[styles.text, main.mb_16]}>Tu inversión estará lista en unos segundos. <Text style={[main.bold, styles.text]}>Recuerda que puedes retirar tu dinero en cualquier momento. El rendimiento se depositará a tu cuenta de forma diaria.</Text></Text>
                                </>
                            )}
                        </>
                    )}

                    <TouchableOpacity disabled={isLoading} onPress={makeInversion} style={styles.primary_button}>
                        <Text style={styles.primary_button_text}>Crear inversión</Text>
                        {isLoading && (
                            <View>
                                <ActivityIndicator color={'white'} size='small' />
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity disabled={isLoading} onPress={() => { setIsModalVisible(false); }} style={styles.secondary_button}>
                        <Text style={[styles.secondary_button_text, isLoading ? { opacity: 0.6 } : {}]}>Cerrar</Text>
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
        height: '52%',
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
        padding: 32,
        borderRadius: 100,
        backgroundColor: '#ded'
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