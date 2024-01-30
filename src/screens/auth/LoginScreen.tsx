import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Login screen
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('General')}>
                <Text style={styles.button_text}>
                    Iniciar con huella dactilar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 40
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 60
    },
    button: {
        borderRadius: 8,
        marginHorizontal: 12,
        paddingVertical: 20,
        backgroundColor: '#222'
    },
    button_text: {
        color: 'white',
        textAlign: 'center'
    }
});