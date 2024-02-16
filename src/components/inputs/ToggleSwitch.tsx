import { View, Text, StyleSheet } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { main } from "@assets/styles/main";

interface Props {
    onPress: Function
}

const options = [
    { label: "Cuenta", value: 1 },
    { label: "Crédito", value: 2 }
];

export default function ToggleSwitch({ onPress }: Props) {
    return (
        <View style={[main.flex, main.flex_row, main.space_between, main.align_center, styles.switch]}>
            <Text style={styles.text_700}>Pagar con tu</Text>
            <View style={[main.flex, main.flex_row, main.bg_primary, styles.background_switch]}>
                <SwitchSelector
                    options={options}
                    initial={0}
                    textColor={'#ddd'}
                    selectedColor={'black'}
                    buttonColor={'white'}
                    backgroundColor={'transparent'}
                    animationDuration={300}
                    height={32}
                    onPress={(value: number) => onPress(value)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    switch: {
        paddingVertical: 8,
        paddingRight: 8,
        paddingLeft: 16,
        borderRadius: 50,
        backgroundColor: '#ddd',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        elevation: 1, // Propiedad para sombra en Android
        shadowColor: 'black', // Color de la sombra en iOS
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra en iOS
        shadowOpacity: 0.2, // Opacidad de la sombra en iOS
        shadowRadius: 3, // Radio de la sombra en iOS
    },
    text_700: {
        fontWeight: '700'
    },
    background_switch: {
        maxWidth: 160,
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 8
    }
});