import { View, Text, StyleSheet, TextStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome6, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Card from "@/components/Card";
import CircleButton from "@/components/inputs/CircleButton";

import { main } from "@assets/styles/main";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootBottomParamList } from "@/types/navigationTypes";

interface Props {
    disabled?: TextStyle
}

export default function DebitCard({ disabled }: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();;

    const goToTransfer = () => {
        navigation.navigate('Contact');
    }

    return (
        <Card>
            <View style={main.p_16}>
                <View style={[main.flex, main.flex_row, main.space_between]}>
                    <Text style={[main.color_primary, disabled]}>Saldo disponible</Text>
                    <Text style={[main.color_primary, disabled]}>Detalles</Text>
                </View>
                <View style={[main.flex, main.flex_row, main.mt_16]}>
                    <Text style={[styles.dolar, disabled]}>$</Text>
                    <Text style={[styles.dolar, disabled]}>500</Text>
                    <Text style={disabled}>00</Text>
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
                <CircleButton label='Transferir' action={goToTransfer}>
                    <FontAwesome6 name='money-bill-transfer' size={24} />
                </CircleButton>
                <CircleButton label='Pagar servicios' action={console.log('')}>
                    <MaterialCommunityIcons name='bank' size={24} />
                </CircleButton>
                <CircleButton label='Depositar a la cuenta' action={console.log('')}>
                    <MaterialCommunityIcons name='credit-card-plus' size={24} />
                </CircleButton>
                <CircleButton label='Más' action={console.log('')}>
                    <Feather name='more-horizontal' size={24} />
                </CircleButton>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    dolar: {
        fontSize: 32,
        fontWeight: '700'
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#efefef'
    },
});