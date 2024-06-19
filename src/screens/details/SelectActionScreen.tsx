import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { main } from '@assets/styles/main';
import { AntDesign } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';
import Card from '@/components/Card';
import { useState } from 'react';

interface Props {
    route: RouteProp<{}>
}

interface Params {
    investmentData: {
        amount: number,
        investmentType: 'Flex' | 'Fixed',
        days: number,
        rate: number
    }
}

const options = ["reinvest", "retire"];

export default function SelectActionScreen({ route }: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isDisabled, setIsDisable] = useState(true);
    const { investmentData }: Params = route.params;

    const goBack = () => {
        navigation.goBack();
    }

    const onPress = (option: string) => {
        setSelectedOption(option);
        setIsDisable(false);
    }

    const onSubmit = () => {
        if (selectedOption) {
            navigation.navigate('ConfigureInvestment', { investmentData: investmentData, action: selectedOption });
        }
    }

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={[main.flex, main.flex_row, main.gap_16, main.align_center, styles.header]}>
                <TouchableOpacity onPress={goBack}>
                    <AntDesign name="arrowleft" size={24} />
                </TouchableOpacity>
                <Text style={styles.header_title}>
                    Selecciona una acción
                </Text>
            </View>

            <Text style={styles.text_16}>¿Qué quieres hacer con tu inversión al término del plazo?</Text>

            <Card>
                <TouchableOpacity onPress={() => onPress(options[0])}>
                    <View style={[main.flex, main.flex_row, main.align_center, main.gap_16, main.p_16]}>
                        <View style={styles.radio}>
                            {selectedOption == options[0] && (
                                <View style={styles.circle}></View>
                            )}
                        </View>
                        <View style={[main.flex, main.gap_4]}>
                            <Text style={styles.text_16}>Reinvertir la cantidad inicial</Text>
                            <Text style={main.color_gray}>Las intereses serán depositados en tu Cuenta</Text>
                            <Text style={[styles.mini_card, main.color_primary, main.mt_8]}>RECOMENDADO</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>

            <Card>
                <TouchableOpacity onPress={() => onPress(options[1])}>
                    <View style={[main.flex, main.flex_row, main.align_center, main.gap_16, main.p_16]}>
                        <View style={styles.radio}>
                            {selectedOption == options[1] && (
                                <View style={styles.circle}></View>
                            )}
                        </View>
                        <View style={[main.flex, main.gap_4]}>
                            <Text style={styles.text_16}>Retirar todo</Text>
                            <Text style={[main.color_gray, { maxWidth: '90%' }]}>El monto que invertiste será transferido de vuelta a tu Cuenta</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                {/* BOTÓN */}
                <TouchableOpacity
                    style={[styles.button, main.flex, isDisabled ? { backgroundColor: '#aaa' } : { backgroundColor: '#222' }]}
                    onPress={onSubmit}
                    disabled={isDisabled}
                >
                    <Text style={styles.button_text}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    scroll_container: {
        display: 'flex',
        gap: 16
    },
    header: {
        height: 100,
    },
    header_title: {
        fontSize: 18,
        fontWeight: '700'
    },
    text_16: {
        fontSize: 16
    },
    radio: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'black'
    },
    circle: {
        width: 12,
        height: 12,
        borderRadius: 50,
        backgroundColor: 'black'
    },
    mini_card: {
        width: 114,
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#ded'
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        borderRadius: 8,
        backgroundColor: 'black',
    },
    button_text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }
});