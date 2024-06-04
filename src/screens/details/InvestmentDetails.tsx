import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { main } from '@assets/styles/main';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';
import Card from '@/components/Card';
import CustomTextInputCounter from '@/components/inputs/CustomTextInputCounter';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/AuthContext';
import CircleButton from '@/components/inputs/CircleButton';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { Transfer } from '@/types/database.type';
import { getInvestmentTransfers } from '@/api/transfers';

interface Props {
    route: RouteProp<{}>
}

interface Params {
    investment: any,
    investmentId: string
}

const backgroundImage = require('@assets/images/piggy_bank.jpg');

export default function InvestmentDetailsScreen({ route }: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const { account } = useUser();
    let { investment, investmentId }: Params = route.params;
    const [width, setWidth] = useState('0%');
    const [movements, setMovements] = useState(Array<Transfer>());

    const fetch = async () => {
        if (account) {
            getInvestmentTransfers(Number(account.clabe), investmentId, setMovements);
        }
    }

    useEffect(() => {
        fetch();
    }, [account]);

    useEffect(() => {
        const totalSeconds = investment.finalDate.seconds - investment.initDate.seconds;
        const currentSeconds = investment.cutoffDate.seconds - investment.initDate.seconds;

        setWidth(Math.floor((currentSeconds * 100) / totalSeconds) + '%');
    }, [investment.cutoffDate]);

    const goBack = () => {
        navigation.goBack();
    }

    const calculateDuration = (start: number, end: number) => {
        return (end - start) / (24 * 60 * 60);
    }

    const remainingDays = (cutoff: number, end: number) => {
        return (end - cutoff) / (24 * 60 * 60);
    }

    return (
        <>
            <ScrollView style={{ zIndex: 50, position: 'relative' }}>
                {/* BACKGROUND IMAGE */}
                <View style={{ zIndex: 0, position: 'absolute', width: '100%', height: 300 }}>
                    <Image source={backgroundImage} style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.85 }} resizeMode='cover' />
                    <View style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.4, backgroundColor: 'black' }}></View>
                </View>

                <View style={styles.container}>
                    {/* HEADER */}
                    <View style={[main.flex, main.flex_row, main.gap_16, main.align_center, styles.header]}>
                        <TouchableOpacity onPress={goBack}>
                            <AntDesign name="arrowleft" size={24} color={'white'} />
                        </TouchableOpacity>
                        <Text style={[styles.header_title, main.color_white]}>
                            Inversión
                        </Text>
                    </View>

                    {/* CARD */}
                    <View style={main.mt_16}>
                        <Card>
                            <View style={[main.flex, main.p_12, main.gap_16]}>
                                <View style={[main.flex, main.flex_row, main.space_between]}>
                                    <View style={[main.flex, main.gap_4]}>
                                        <Text>{investment.name}</Text>
                                        <View style={[main.flex, main.flex_row]}>
                                            <Text style={[styles.dolar]}>$</Text>
                                            <Text style={[styles.dolar]}>{Math.floor(investment.amount)}</Text>
                                            <Text>{(investment.amount % 1).toFixed(2).split('.')[1]}</Text>
                                        </View>
                                        <Text style={main.color_gray}>Monto invertido</Text>
                                    </View>
                                    <Text style={[styles.mini_card, main.color_white]}>{investment.type.toUpperCase()}</Text>
                                </View>
                                <View style={[main.flex, main.gap_4]}>
                                    <Text style={styles.dolar_min}>{calculateDuration(investment.initDate.seconds, investment.finalDate.seconds)} días</Text>
                                    <Text style={main.color_gray}>Plazo de la inversión (finaliza el {Intl.DateTimeFormat('es-Es', { day: 'numeric', month: 'long' }).format(investment.finalDate.toDate())})</Text>
                                </View>
                                <View style={[styles.divider]}></View>
                                <View style={[main.flex, main.flex_row, main.gap_32]}>
                                    <View style={[main.flex, main.gap_4]}>
                                        <Text style={main.color_gray}>Tasa anual</Text>
                                        <Text style={main.bold}>{investment.rate.toFixed(2)}%</Text>
                                    </View>
                                    <View style={styles.divider_vertical}></View>
                                    <View style={[main.flex, main.gap_4]}>
                                        <Text style={main.color_gray}>Siguiente rendimiento</Text>
                                        <Text style={[main.color_primary, main.bold]}>${Number(((investment.amount * (investment.rate / 100)) / 365) * 7).toFixed(2)}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    </View>

                    <CircleButton action={() => console.log("Ajustes")} label='Ajustes'>
                        <Ionicons name="options-outline" size={24} color="black" />
                    </CircleButton>

                    <View style={[main.flex, main.gap_8]}>
                        <Text>Creado el {Intl.DateTimeFormat('es-Es', { day: 'numeric', month: 'long' }).format(investment.initDate.toDate())}</Text>
                        <View style={styles.bar}>
                            <View style={[styles.bar_black, { width: width }]}></View>
                        </View>
                        <View style={[main.flex, main.flex_row, main.space_between]}>
                            <Text>Quedan {remainingDays(investment.cutoffDate.seconds, investment.finalDate.seconds)} días</Text>
                            <Text style={[main.color_gray]}>{calculateDuration(investment.initDate.seconds, investment.finalDate.seconds)} días</Text>
                        </View>

                    </View>

                    <Text style={[styles.link, main.color_primary]}>¿Qué sucede cuando finaliza el plazo?</Text>

                    <View style={styles.small_card}>
                        <View style={[main.flex, main.gap_4]}>
                            <Text>Valor futuro de esta inversión</Text>
                            <Text style={main.color_gray}>El 10 de junio recibirás tu pago número 15</Text>
                        </View>
                        <Text style={main.color_primary}>$547.42</Text>
                    </View>

                    <Text style={[styles.text_16, main.bold]}>Movimientos</Text>

                    <Card>
                        {movements.map((movement, index) => (
                            <View key={index} style={[main.flex, main.flex_row, main.align_center, main.space_between, main.gap_16, main.p_16]}>
                                <Octicons name="checklist" size={24} />
                                <View style={[main.flex1]}>
                                    <Text>{movement.concept}</Text>
                                    <Text style={[styles.date, main.color_gray]}>{movement.date ? `${movement.date?.toDate().getDate()} ${movement.date?.toDate().toLocaleDateString('es-ES', { month: 'long' })}` : ''}</Text>
                                </View>
                                <Text style={main.color_primary}>${(movement.amount).toFixed(2)}</Text>
                            </View>
                        ))}
                    </Card>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 32,
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
        height: '100%'
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
    mini_card: {
        height: 26,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: '#398'
    },
    divider: {
        display: 'flex',
        height: 1,
        backgroundColor: '#efefef'
    },
    divider_vertical: {
        display: 'flex',
        minWidth: 1,
        backgroundColor: '#efefef'
    },
    dolar: {
        fontSize: 32,
        fontWeight: '700'
    },
    dolar_min: {
        fontSize: 18,
        fontWeight: '700'
    },
    bar: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 2,
        minHeight: 8,
        borderRadius: 50,
        marginTop: 8,
        backgroundColor: 'lightgray'
    },
    bar_black: {
        minHeight: 4,
        borderRadius: 50,
        backgroundColor: 'black'
    },
    link: {
        textDecorationLine: "underline"
    },
    small_card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        backgroundColor: 'lightgray'
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