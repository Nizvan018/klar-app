import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { main } from "@assets/styles/main";
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootBottomParamList } from "@/types/navigationTypes";

export default function ContactScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();

    const goBack = () => {
        navigation.goBack();
    }

    const goToAddContact = () => {
        navigation.navigate('AddContact');
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
                        Contactos
                    </Text>
                </View>
                <EvilIcons name="refresh" size={40} color={'grey'} />
            </View>

            <View>
                <Text style={styles.contact_title}>Tus contactos</Text>
                <Text>Elige el destinatario</Text>

                <View style={[main.flex, main.flex_row, main.align_center, main.gap_16, main.mt_16]}>
                    <Text style={[styles.contact_icon, main.bg_black, main.color_white]}>N</Text>
                    <Text>Nizvan nu</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={goToAddContact}>
                <Text style={styles.button_text}>Crear destinatario</Text>
            </TouchableOpacity>
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
    contact_title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8
    },
    contact_icon: {
        textAlign: 'center',
        textAlignVertical: 'center',
        aspectRatio: 1,
        width: 40,
        borderRadius: 50
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