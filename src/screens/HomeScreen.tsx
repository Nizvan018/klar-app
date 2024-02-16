import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialIcons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '@/context/AuthContext';
import { main } from '@assets/styles/main';
// COMPONENTS:
import Header from '@/components/header';
import ToggleSwitch from '@/components/inputs/ToggleSwitch';
import Card from '@/components/Card';
import CircleButton from '@/components/inputs/CircleButton';

export default function HomeScreen() {
    const user = useUser();

    const onPress = (value: number) => {
        console.log(`Valor: ${value}`)
    }

    return (
        <View style={styles.container}>
            <Header />

            <ToggleSwitch onPress={onPress} />

            {/* CARTA INICIAL */}
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

                <View style={[main.flex, main.flex_row, main.space_between, main.align_center, main.p_16]}>
                    <View style={[main.flex, main.flex_row, main.align_center, main.gap_16]}>
                        <MaterialIcons name='savings' size={24} />
                        <View>
                            <Text>Total en inversión</Text>
                            <Text style={[main.color_gray, { marginTop: 8, fontSize: 12 }]}>70 días para cerrar una inversión</Text>
                        </View>
                    </View>
                    <Text>$500.00</Text>
                </View>

                <View style={styles.divider}></View>

                <View style={[main.flex, main.flex_row, main.space_between, main.align_center, main.p_16]}>
                    <CircleButton label='Transferir'>
                        <FontAwesome6 name='money-bill-transfer' size={24} />
                    </CircleButton>
                    <CircleButton label='Pagar servicios'>
                        <MaterialCommunityIcons name='bank' size={24} />
                    </CircleButton>
                    <CircleButton label='Depositar a la cuenta'>
                        <MaterialCommunityIcons name='credit-card-plus' size={24} />
                    </CircleButton>
                    <CircleButton label='Más'>
                        <Feather name='more-horizontal' size={24} />
                    </CircleButton>
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
    },
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