import { View, StyleSheet } from "react-native";
import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

interface Props {
    children: ReactNode,
    other_styles?: ViewStyle
}

export default function Card({ children, other_styles }: Props) {
    return (
        <View style={[styles.container, other_styles]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#f3f3f3',
        borderRadius: 16,
        marginTop: 16,
        backgroundColor: 'white',
        elevation: 1, // Propiedad para sombra en Android
        shadowColor: 'black', // Color de la sombra en iOS
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra en iOS
        shadowOpacity: 0.2, // Opacidad de la sombra en iOS
        shadowRadius: 3, // Radio de la sombra en iOS
    }
});