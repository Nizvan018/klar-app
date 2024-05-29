import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { main } from '@assets/styles/main';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
// import { useUser } from '@/context/AuthContext';
import Card from '@/components/Card';

export default function InvestmentsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    // const { account } = useUser();

    const goBack = () => {
        navigation.goBack();
    }

    const goToNewInvestment = () => {
        navigation.navigate('NewInvestment');
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
                        Inversiones
                    </Text>
                </View>
                <View style={[main.flex, main.flex_row, main.align_center, main.gap_16]}>
                    <TouchableOpacity>
                        <AntDesign name='questioncircleo' size={20} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo name="sound" size={24} color={'black'} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* AMOUNT */}
            <Text style={[styles.dolar]}>$500.00</Text>
            <Text>en 3 inversiones</Text>

            {/* CATEGORIES */}
            <View style={[main.flex, main.flex_row, main.gap_8, main.mt_16]}>
                <TouchableOpacity style={styles.square_button}>
                    <Text>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.square_button_inactive}>
                    <Text style={main.color_gray}>Activa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.square_button_inactive}>
                    <Text style={main.color_gray}>Cerrado</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.square_button_inactive}>
                    <Text style={main.color_gray}>Fija</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.square_button_inactive}>
                    <Text style={main.color_gray}>Flexible</Text>
                </TouchableOpacity>
            </View>

            {/* INVESTMENTS */}
            <Card>
                <View style={[main.flex, main.flex_row, main.gap_8]}>
                    <View style={styles.image}>
                        <Text>Imagen</Text>
                    </View>
                    <View style={[main.flex1, main.space_between, main.p_8, main.mr_8]}>
                        <View>
                            <Text style={[main.bold, styles.font_16]}>$500.00</Text>
                            <Text style={main.color_gray}>Fin de carrera</Text>
                        </View>
                        <View style={[main.flex, main.gap_8]}>
                            <View style={[main.flex, main.flex_row, main.space_between]}>
                                <Text>Quedan 108 días</Text>
                                <Text style={[main.color_gray]}>180 días</Text>
                            </View>
                            <View style={styles.bar}>
                                <View style={styles.bar_black}></View>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>

            <Card>
                <View style={[main.flex, main.flex_row, main.gap_16, main.p_16]}>
                    <View style={styles.circle}>
                        <Feather name='check' size={24} color={'gray'} />
                    </View>
                    <View style={[main.flex1, main.justify_center, main.gap_4]}>
                        <Text style={styles.font_16}>$19.77 de intereses</Text>
                        <Text style={main.color_gray}>A 90 días - 90 días</Text>
                    </View>
                </View>
            </Card>

            <TouchableOpacity onPress={goToNewInvestment} style={styles.button}>
                <Text style={styles.button_text}>+ Crear inversión</Text>
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
    square_button: {
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black'
    },
    square_button_inactive: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'lightgray'
    },
    image: {
        aspectRatio: 1,
        width: '30%',
        backgroundColor: 'black'
    },
    font_16: {
        fontSize: 16
    },
    bar: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 2,
        minHeight: 8,
        borderRadius: 50,
        marginBottom: 8,
        backgroundColor: 'lightgray'
    },
    bar_black: {
        width: '40%',
        minHeight: 4,
        borderRadius: 50,
        backgroundColor: 'black'
    },
    circle: {
        display: 'flex',
        padding: 8,
        borderRadius: 50,
        backgroundColor: 'lightgray'
    },
    button: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
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