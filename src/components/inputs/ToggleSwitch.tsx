import { View, Text, StyleSheet } from "react-native"
import { main } from "@assets/styles/main";

export default function ToggleSwitch() {
    return (
        <View style={[main.flex, main.flex_row, main.space_between, main.align_center, styles.switch]}>
            <Text style={styles.text_700}>Pagar con tu</Text>
            <View style={[main.flex, main.flex_row, styles.background_switch, main.bg_primary]}>
                <Text style={[styles.switch_selection, { backgroundColor: '#222', color: 'white' }]}>Cuenta</Text>
                <Text style={styles.switch_selection}>Crédito</Text>
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
        backgroundColor: '#ddd'
    },
    text_700: {
        fontWeight: '700'
    },
    background_switch: {
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 8
    },
    switch_selection: {
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 8
    }
});