import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useUser } from '@/context/AuthContext';
import { main } from '@assets/styles/main';
// COMPONENTS:
import Header from '@/components/header';
import ToggleSwitch from '@/components/inputs/ToggleSwitch';
import Card from '@/components/Card';

export default function HomeScreen() {
    const user = useUser();

    return (
        <View style={styles.container}>
            <Header />

            <ToggleSwitch />

            <Card>
                <View style={main.p_16}>
                    <View style={[main.flex, main.flex_row, main.space_between]}>
                        <Text style={main.color_primary}>Saldo disponible</Text>
                        <Text style={main.color_primary}>Detalles</Text>
                    </View>
                    <View style={[main.flex, main.flex_row, main.mt_16]}>
                        <Text style={styles.dolar}>$</Text>
                        <Text style={styles.dolar}>500</Text>
                        <Text>00</Text>
                    </View>
                    <View style={[main.flex, main.flex_row, main.align_center, main.gap_16, main.mt_16]}>
                        <Feather name='trending-up' size={20} color={'black'} />
                        <Text style={main.color_gray}>Estás ganando 11% anual sobre tu saldo</Text>
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View style={main.p_16}>
                    <MaterialIcons name='savings' size={24} />

                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    dolar: {
        fontSize: 32,
        fontWeight: '700'
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#efefef'
    }
});