import { View, Text, StyleSheet } from "react-native";
import { Octicons } from '@expo/vector-icons'
import SwitchSelector from "react-native-switch-selector";
import Card from "@/components/Card";
import { main } from "@assets/styles/main";
import { useEffect, useState } from "react";
import { getUserTransfers } from "@/api/transfers";
import { useUser } from "@/context/AuthContext";
import { Transfer } from "@/types/database.type";

const options = [
    { label: 'Todos', value: 0 },
    { label: "Cuenta", value: 1 },
    { label: "Crédito", value: 2 }
];

export default function MovementsSection() {
    const { account } = useUser();
    const [movements, setMovements] = useState(Array<Transfer>());
    const [movementType, setMovementType] = useState(1);

    const fetch = async () => {
        if (account) {
            getUserTransfers(Number(account.clabe), setMovements);
        }
    }

    useEffect(() => {
        fetch();
    }, [account]);

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
                    onPress={(value: number) => setMovementType(value)}
                />
            </View>

            {/* <Text>Más en este mes</Text> */}

            <Card>
                {movements.map((movement, index) => (
                    movementType == 0 ? (
                        <View key={index} style={[main.flex, main.flex_row, main.align_center, main.space_between, main.gap_16, main.p_16]}>
                            <Octicons name="checklist" size={24} />
                            <View style={[main.flex1]}>
                                <Text>{movement.concept}</Text>
                                <Text style={[styles.date, main.color_gray]}>{movement.date ? `${movement.date.toDate().getDate()} ${movement.date.toDate().toLocaleDateString('es-ES', { month: 'long' })}` : ''}</Text>
                            </View>
                            <Text style={main.color_primary}>${(movement.amount).toFixed(2)}</Text>
                        </View>
                    ) : (
                        movementType == movement.type && (
                            <View key={index} style={[main.flex, main.flex_row, main.align_center, main.space_between, main.gap_16, main.p_16]}>
                                <Octicons name="checklist" size={24} />
                                <View style={[main.flex1]}>
                                    <Text>{movement.concept}</Text>
                                    <Text style={[styles.date, main.color_gray]}>{movement.date ? `${movement.date?.toDate().getDate()} ${movement.date?.toDate().toLocaleDateString('es-ES', { month: 'long' })}` : ''}</Text>
                                </View>
                                <Text style={main.color_primary}>${(movement.amount).toFixed(2)}</Text>
                            </View>
                        )
                    )
                ))}
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