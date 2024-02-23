import { View, Text, StyleSheet } from "react-native";
import { Octicons } from '@expo/vector-icons'
import SwitchSelector from "react-native-switch-selector";
import Card from "@/components/Card";
import { main } from "@assets/styles/main";

const options = [
    { label: 'Todos', value: 0 },
    { label: "Cuenta", value: 1 },
    { label: "Crédito", value: 2 }
];

export default function MovementsSection() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Movimientos</Text>
            <View style={styles.switch_container}>
                <SwitchSelector
                    options={options}
                    initial={1}
                    textColor={'black'}
                    selectedColor={'black'}
                    buttonColor={'#ddd'}
                    borderRadius={4}
                    backgroundColor={'transparent'}
                    animationDuration={300}
                    height={24}
                    onPress={(value: number) => console.log(value)}
                />
            </View>

            <Text>Más en este mes</Text>

            <Card>
                <View style={[main.flex, main.flex_row, main.align_center, main.space_between, main.p_16]}>
                    <Octicons name="checklist" size={24} />
                    <View>
                        <Text>Pago semanl de intereses</Text>
                        <Text style={[styles.date, main.color_gray]}>17 feb</Text>
                    </View>
                    <Text style={main.color_primary}>$1.53</Text>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 24
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16
    },
    switch_container: {
        maxWidth: 200,
        marginBottom: 32
    },
    date: {
        fontWeight: '300'
    }
});