import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Feather, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { main } from '@assets/styles/main';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@/context/AuthContext';
import Card from '@/components/Card';
import CircleButton from '@/components/inputs/CircleButton';

export default function DetailsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const { account } = useUser();

    const goBack = () => {
        navigation.goBack();
    }

    const goToTransfer = () => {
        navigation.navigate('Contact');
    }

    const goToDeposit = () => {
        navigation.navigate('Deposit');
    }

    const goToEarnings = () => {
        navigation.navigate('Earnings');
    }

    const goToInvestments = () => {
        navigation.navigate('Investments');
    }

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={[main.flex, main.flex_row, main.space_between, main.align_center, styles.header]}>
                <View style={[main.flex, main.flex_row, main.gap_16, main.align_center]}>
                    <TouchableOpacity onPress={goBack}>
                        <AntDesign name="arrowleft" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.header_title}>
                        Contactos
                    </Text>
                </View>
                <View style={[main.flex, main.flex_row, main.align_center, main.gap_16]}>
                    <TouchableOpacity>
                        <AntDesign name="eyeo" size={24} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name='questioncircleo' size={20} color={'black'} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ACCOUNT INFO */}
            <View style={[main.flex, main.gap_8]}>
                <View style={[main.flex, main.flex_row]}>
                    <Text style={[styles.dolar]}>$</Text>
                    <Text style={[styles.dolar]}>{account?.amount && Math.floor(account?.amount)}</Text>
                    <Text>{account?.amount && (account?.amount % 1).toFixed(2).split('.')[1]}</Text>
                </View>
                <Text style={main.color_gray}>Saldo disponible</Text>
            </View>

            {/* EARNINGS */}
            <TouchableOpacity onPress={goToEarnings}>
                <Card>
                    <View style={[main.flex, main.p_16, main.gap_8]}>
                        <View style={[main.flex, main.flex_row, main.space_between]}>
                            <Text style={[main.color_primary, main.bold]}>Ganancias</Text>
                            <TouchableOpacity>
                                <Text style={[main.color_primary, main.bold]}>
                                    Detalles
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.dolar_min}>$0.91</Text>
                        <View style={[main.flex, main.flex_row, main.gap_16]}>
                            <Feather name='trending-up' size={20} color={'black'} />
                            <Text>Historial de ganancias en tu Cuenta</Text>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>

            {/* BUTTONS */}
            <View style={[main.flex, main.flex_row, main.align_start, main.gap_32, main.p_16]}>
                <CircleButton label='Transferir' action={goToTransfer}>
                    <FontAwesome6 name='money-bill-transfer' size={24} />
                </CircleButton>
                <CircleButton label='Pagar servicios' action={console.log('')}>
                    <MaterialCommunityIcons name='bank' size={24} />
                </CircleButton>
                <CircleButton label='Depositar a la cuenta' action={goToDeposit}>
                    <MaterialCommunityIcons name='credit-card-plus' size={24} />
                </CircleButton>
            </View>

            {/* INVESTMENT */}
            <TouchableOpacity onPress={goToInvestments}>
                <Card>
                    <View style={[main.flex, main.gap_16, main.p_16]}>
                        <Text>1 inversión</Text>
                        <View>
                            <Text style={styles.dolar_min}>$506.23</Text>
                            <Text>109 días para cerrar 1 inversión</Text>
                        </View>
                        <View style={[main.flex, main.flex_row, main.justify_end]}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={main.color_white}>Nueva Inversión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
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
    button: {
        display: 'flex',
        alignItems: 'center',
        width: 124,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'black',
    }
});