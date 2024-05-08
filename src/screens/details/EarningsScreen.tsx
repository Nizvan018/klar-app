import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { main } from '@assets/styles/main';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
// import { useUser } from '@/context/AuthContext';
import Card from '@/components/Card';

export default function EarningsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    // const { account } = useUser();

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={[styles.header, main.flex, main.flex_row, main.gap_16, main.align_center]}>
                <TouchableOpacity onPress={goBack}>
                    <AntDesign name="arrowleft" size={24} />
                </TouchableOpacity>
                <Text style={styles.header_title}>
                    Contactos
                </Text>
            </View>

            {/* BALANCE THE DAY BEFORE */}
            <Card>
                <View style={[main.flex, main.gap_8, main.p_16]}>
                    <Text>Saldo en tu cuenta el día anterior</Text>
                    <Text style={styles.dolar_min}>$0.00</Text>
                </View>
            </Card>

            {/* EARNINGS THE DAY BEFORE */}
            <Card>
                <View style={[main.flex, main.gap_8, main.p_16]}>
                    <Text>Ganancias en tu cuenta el día anterior</Text>
                    <Text style={styles.dolar_min}>$0.00</Text>
                </View>
            </Card>

            {/* DAILY EARNINGS */}
            <View style={[main.flex, main.gap_8, main.mt_16]}>
                <Text style={main.bold}>Ganancias en tu cuenta diarias</Text>
                <View style={[main.flex, main.flex_row, main.space_between]}>
                    <Text style={main.color_gray}>29 abr - 2 jun</Text>
                    <View style={[main.flex, main.flex_row, main.gap_32]}>
                        <TouchableOpacity>
                            <Octicons name='chevron-left' size={20} color={'black'} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Octicons name='chevron-right' size={20} color={'gray'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Card>
                    <View style={[main.flex, main.gap_8, main.p_16, styles.h_30]}>
                        <Text>Gráfica</Text>
                    </View>
                </Card>
            </View>

            {/* EARNINGS HISTORY */}
            <Card>
                <View style={[main.flex, main.gap_8, main.p_16]}>
                    <Text>Historial de ganancias en tu cuenta</Text>
                    <Text style={styles.dolar_min}>$1.50</Text>
                </View>
            </Card>

            <View style={[main.flex, main.flex_row, main.space_between, main.mt_16]}>
                <Text style={main.bold}>Historial</Text>
                <Text style={main.bold}>+</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    header: {
        height: 100,
    },
    header_title: {
        fontSize: 18,
        fontWeight: '700'
    },
    dolar: {
        fontSize: 32,
        fontWeight: '700'
    },
    dolar_min: {
        fontSize: 18,
        fontWeight: '700'
    },
    h_30: {
        height: 300
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        width: 124,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'black',
    }
});