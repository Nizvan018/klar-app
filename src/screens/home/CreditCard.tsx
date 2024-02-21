import { View, Text, StyleSheet, TextStyle } from "react-native";
import { Entypo, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Card from "@/components/Card";
import CircleButton from "@/components/inputs/CircleButton";

import { main } from "@assets/styles/main";

interface Props {
    disabled?: TextStyle
}

export default function CreditCard({ disabled }: Props) {
    return (
        <Card>
            <View style={main.p_16}>
                <View style={[main.flex, main.flex_row, main.space_between]}>
                    <Text style={[main.color_primary, disabled]}>Crédito disponible</Text>
                    <Text style={[main.color_primary, disabled]}>Detalles</Text>
                </View>
                <View style={[main.flex, main.flex_row, main.mt_16]}>
                    <Text style={[styles.dolar, disabled]}>$</Text>
                    <Text style={[styles.dolar, disabled]}>4,200</Text>
                    <Text style={disabled}>00</Text>
                </View>
            </View>

            <View style={styles.divider}></View>

            <View style={[main.flex, main.flex_row, main.space_between, main.align_center, main.p_16]}>
                <CircleButton label='Efectivo inmediato'>
                    <MaterialCommunityIcons name='bank-transfer-out' size={24} />
                </CircleButton>
                <CircleButton label='Estados de cuenta'>
                    <Entypo name='text-document' size={24} />
                </CircleButton>
                <CircleButton label='Aumentar tu línea'>
                    <Feather name='trending-up' size={20} color={'black'} />
                </CircleButton>
                <CircleButton label='Más'>
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