import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { main } from "@assets/styles/main"
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useUser } from "@/context/AuthContext";

interface Props {
    route: RouteProp<{}>
}

export default function TrasnferScreen({ route }: Props) {
    const navigation = useNavigation();
    const { contacto } = route.params;
    const { account } = useUser();

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={[main.flex, main.flex_row, main.gap_16, main.align_center, styles.header]}>
                <TouchableOpacity onPress={goBack}>
                    <AntDesign name="arrowleft" size={24} />
                </TouchableOpacity>
                <Text style={styles.header_title}>
                    Mandar dinero via Klar
                </Text>
            </View>

            {/* CONTENT */}
            <View style={styles.content}>
                <Text style={styles.name}>Transferir a {contacto}</Text>

                <View style={[main.flex, main.align_center]}>
                    <View style={[main.flex, main.flex_row, main.align_center]}>
                        <Text style={styles.quantity}>$</Text>
                        <TextInput style={styles.quantity} keyboardType="number-pad" selectionColor={'black'} />
                    </View>
                    <Text>${account.amount.toFixed(2)} disponibles para transferir</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => { }}>
                    <Text style={styles.button_text}>Realizar pago</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        height: 100,
        marginTop: 24
    },
    header_title: {
        fontSize: 18,
        fontWeight: '700'
    },
    name: {
        fontSize: 16,
        fontWeight: '700'
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 32
    },
    quantity: {
        fontSize: 64
    },
    button: {
        width: '100%',
        borderRadius: 8,
        paddingVertical: 18,
        backgroundColor: '#222'
    },
    button_text: {
        textAlign: 'center',
        color: 'white'
    },
});