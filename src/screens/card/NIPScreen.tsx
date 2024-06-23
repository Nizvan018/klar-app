import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import { main } from "@assets/styles/main";
import { RootBottomParamList } from "@/types/navigationTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Card from "@/components/Card";
import { BlurView } from "expo-blur";
import { useState } from "react";
import NIPModal from "@/components/card/NIPModal";

export default function NIPScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isNIPShowed, setIsNIPShowed] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }

    const goBack = () => {
        navigation.goBack();
    }

    const changeNIP = () => {
        console.log('Change NIP');
    }

    const changeIsNIPShowed = () => {
        setIsNIPShowed(prev => !prev);
    }

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={[main.flex, main.flex_row, main.space_between, main.align_center, styles.header]}>
                <View style={[main.flex, main.flex_row, main.gap_16, main.align_center]}>
                    <TouchableOpacity onPress={goBack}>
                        <AntDesign name="arrowleft" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.header_title}>
                        Gestionar NIP
                    </Text>
                </View>
            </View>

            {/* NIP */}
            <View>
                <Text>El NIP es la clave para poder realizar compras en tiendas con tu tarjeta.</Text>
                <Card>
                    <View style={[{ position: 'relative' }, main.flex, main.justify_center, main.align_center]}>
                        <BlurView experimentalBlurMethod="dimezisBlurView" intensity={isNIPShowed ? 0 : 90} style={{ zIndex: 50, position: 'absolute', width: '100%', height: '100%' }}></BlurView>
                        <Text style={styles.nip}>7041</Text>
                    </View>
                </Card>
                <TouchableOpacity onPress={changeIsNIPShowed} style={[main.flex, main.flex_row, main.align_center, main.justify_center, main.gap_16, main.mt_16, main.mb_16]}>
                    <Feather name="eye" size={24} color={'black'} />
                    <Text>Mostrar NIP</Text>
                </TouchableOpacity>
                <Text onPress={openModal} style={[main.color_primary, main.mt_16, { textDecorationLine: "underline", textAlign: 'center' }]}>¿Problemas con tu NIP?</Text>
            </View>

            {/* BUTTON */}
            <TouchableOpacity style={styles.button} onPress={changeNIP}>
                <Text style={styles.button_text}>Cambiar NIP</Text>
            </TouchableOpacity>

            <NIPModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                closeModal={closeModal}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        height: 100,
        marginTop: 24
    },
    header_title: {
        fontSize: 18,
        fontWeight: '700'
    },
    nip: {
        fontSize: 160,
        fontWeight: '700',
        letterSpacing: 8,
        color: '#222'
    },
    button: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        borderRadius: 8,
        paddingVertical: 18,
        marginLeft: 20,
        backgroundColor: '#222'
    },
    button_text: {
        textAlign: 'center',
        color: 'white'
    }
});
