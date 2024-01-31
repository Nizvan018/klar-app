import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'

export default function LoginScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.top_card}>
                <Text style={styles.title}>Klar</Text>
                <View style={styles.info_card}>
                    <Text style={styles.text_white}>de Servicio</Text>
                    <Text style={styles.text_white}>Financieros Alternativos SFP</Text>
                </View>
            </View>

            <View style={styles.bottom_card}>
                <Text style={styles.greeting}>Buenas noches, Nizvan</Text>
                <Text style={styles.is_not_you}>¿No eres tu?</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('General')}
                >
                    <Ionicons name="finger-print-outline" size={30} color={'white'} />
                    <Text style={styles.button_text}>
                        Iniciar con huella dactilar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 40,
        backgroundColor: '#bbb'
    },
    top_card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',
        gap: 10,
        marginTop: 60,
    },
    info_card: {
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 56,
        color: 'white',
        textAlign: 'center'
    },
    text_white: {
        color: 'white',
        fontSize: 16
    },
    bottom_card: {
        paddingHorizontal: 12,
    },
    greeting: {
        marginBottom: 8,
        color: 'white',
        fontSize: 24,
        fontWeight: '800'
    },
    is_not_you: {
        marginBottom: 32,
        color: 'white'
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        borderRadius: 8,
        paddingVertical: 14,
        backgroundColor: '#222'
    },
    button_text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }
});