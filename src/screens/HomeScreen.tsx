import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '@/context/AuthContext';
import { logout } from '@/api/auth';

export default function HomeScreen() {
    const user = useUser();

    return (
        <View>
            <Text>Home Screen</Text>
            <Text>{user?.email}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={logout}
            >
                <Text style={styles.button_text}>Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        borderRadius: 8,
        paddingVertical: 20,
        backgroundColor: '#222'
    },
    button_text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }
});