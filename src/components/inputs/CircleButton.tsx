import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { main } from "@assets/styles/main";
import { ReactNode } from "react";

interface Props {
    children: ReactNode,
    label?: string,
    action: any
}

export default function CircleButton({ children, label, action }: Props) {
    return (
        <View style={[main.flex, main.align_center, main.justify_center, { maxWidth: 60 }]}>
            <TouchableOpacity style={styles.button} onPress={() => action()}>
                {children}
            </TouchableOpacity>
            {label && (
                <Text style={[main.color_gray, { fontSize: 12, marginTop: 8, textAlign: 'center' }]}>{label}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        width: 52,
        borderRadius: 50,
        backgroundColor: 'white',
        elevation: 2, // Propiedad para sombra en Android
        shadowColor: 'black', // Color de la sombra en iOS
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra en iOS
        shadowOpacity: 0.2, // Opacidad de la sombra en iOS
        shadowRadius: 3, // Radio de la sombra en iOS
    }
});