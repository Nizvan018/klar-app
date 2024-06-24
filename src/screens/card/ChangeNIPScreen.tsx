import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import NIPIlustration from "@/components/ilustrations/NIPIlustration";
import { main } from "@assets/styles/main";
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootBottomParamList } from "@/types/navigationTypes";

export default function ChangeNIPScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();

    const goBack = () => {
        navigation.goBack();
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
                        Cambiar NIP
                    </Text>
                </View>
            </View>

            {/* CONTENT */}
            <View style={[main.flex, main.align_center, main.gap_16]}>
                <NIPIlustration width={'60%'} height={'50%'} />
                <View style={[main.flex, main.gap_16, main.align_start, main.w_full]}>
                    <Text style={[{ fontSize: 18 }, main.bold]}>Cambia tu NIP en 3 pasos</Text>

                    <View style={[main.flex, main.flex_row, main.align_center, main.gap_8]}>
                        <Ionicons name="card-outline" size={24} color={'black'} />
                        <View>
                            <Text style={{ fontSize: 16 }}>Banorte, HSBC, Santander o Scotiabank</Text>
                            <Text style={main.color_gray}>Acude a un cajero automático afiliado</Text>
                        </View>
                    </View>

                    <View style={[main.flex, main.flex_row, main.align_center, main.gap_8]}>
                        <MaterialIcons name="password" size={24} color={'black'} />
                        <View>
                            <Text style={{ fontSize: 16 }}>Ingresa tu nuevo NIP</Text>
                            <Text style={main.color_gray}>En tu app Klon, ingresa y confirma tu nuevo NIP</Text>
                        </View>
                    </View>

                    <View style={[main.flex, main.flex_row, main.align_center, main.gap_8]}>
                        <AntDesign name="check" size={24} color={'black'} />
                        <View>
                            <Text style={{ fontSize: 16 }}>Consulta tu saldo en el cajero</Text>
                            <Text style={main.color_gray}>En el cajero automático seleccionado, ingresa tu tarjeta, selecciona 'Tarjeta de crédito' y consulta tu saldo</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.button_text}>Comenzar</Text>
            </TouchableOpacity>
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
    button: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        borderRadius: 8,
        paddingVertical: 18,
        marginLeft: 20,
        backgroundColor: '#222'
    },
    button_text: {
        textAlign: 'center',
        color: 'white'
    }
});
