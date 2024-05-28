import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { main } from '@assets/styles/main';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import { useForm } from 'react-hook-form';
import { useUser } from '@/context/AuthContext';
import SwitchSelector from 'react-native-switch-selector';
import { SetStateAction, useEffect, useState } from 'react';
import Card from '@/components/Card';

const deadlines = {
    'Flex': [ // Flex deadlines
        { days: 365, rate: 10.0 },
        { days: 180, rate: 10.25 },
        { days: 90, rate: 10.5 },
        { days: 30, rate: 10.75 },
        { days: 7, rate: 10.0 }
    ],
    'Fixed': [ // Fiexed deadlines
        { days: 365, rate: 10.5 },
        { days: 180, rate: 10.75 },
        { days: 90, rate: 11.0 },
        { days: 30, rate: 13.0 },
        { days: 7, rate: 10.25 },
    ]
};

export default function NewInvestmentScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    const { account } = useUser();
    const [investmentType, setInvestmentType] = useState<'Flex' | 'Fixed'>('Flex');
    const [isDisabled, setIsDisable] = useState(true);
    const [investmentConf, setInvestmentConf] = useState<{ days: number, rate: number } | null>(null);

    const options = [
        { label: 'Flexible', value: 0 },
        { label: 'Fija', value: 1 }
    ]

    const goBack = () => {
        navigation.goBack();
    }

    const onPress = (value: number) => {
        setInvestmentType(value == 0 ? 'Flex' : 'Fixed');
        setInvestmentConf(null);
    }

    const changeInvestmentConfig = (config: SetStateAction<{ days: number, rate: number } | null>) => {
        setInvestmentConf(config);
    }

    const onSubmit = handleSubmit((data) => {
        if (investmentConf) {
            navigation.navigate('SelectAction', {
                investmentData: {
                    amount: Number(watch('amount')),
                    investmentType: investmentType,
                    days: investmentConf.days,
                    rate: investmentConf.rate
                }
            });
        }
    });

    useEffect(() => {
        if (investmentConf != null && !errors.amount) {
            setIsDisable(false);
        } else {
            setIsDisable(true);
        }
    }, [investmentConf, errors.amount]);

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={[main.flex, main.flex_row, main.gap_16, main.align_center, styles.header]}>
                <TouchableOpacity onPress={goBack}>
                    <AntDesign name="arrowleft" size={24} />
                </TouchableOpacity>
                <Text style={styles.header_title}>
                    Calcula tu inversión
                </Text>
            </View>

            {/* AMOUNT */}
            <View style={[main.flex, main.gap_8]}>
                <Text style={styles.text_16}>¿Cuánto dinero quieres inveritir?</Text>
                <CustomTextInput
                    name='amount'
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Introduzca la cantidad a invertir'
                        },
                        min: {
                            value: 100,
                            message: 'El valor mínimo para invertir es de $100.00'
                        },
                        max: account.amount,
                        pattern: {
                            value: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
                            message: 'El número no es válido'
                        }
                    }}
                    mode='outlined'
                    outlineColor='#aaa'
                    activeOutlineColor='black'
                    placeholder='Necesitas un mínimo de $100.00'
                    keyboardType='number-pad'
                />
                <Text style={[styles.balance, main.ml_8, errors?.amount?.type == "max" ? { color: 'red' } : main.color_gray]}>${account?.amount} de saldo disponible</Text>
            </View>

            {/* INVESTMENT TYPE */}
            <View style={[main.flex, main.gap_8, main.mt_16]}>
                <Text style={styles.text_16}>Selecciona el tipo de inversión</Text>

                <SwitchSelector
                    options={options}
                    initial={0}
                    textColor={'#aaa'}
                    selectedColor={'white'}
                    buttonColor={'#398'}
                    backgroundColor={'transparent'}
                    animationDuration={300}
                    height={32}
                    borderColor={'#aaa'}
                    hasPadding
                    valuePadding={0}
                    onPress={(value: number) => onPress(value)}
                />

                <View style={[styles.info_container, main.mt_8]}>
                    <AntDesign name='infocirlceo' size={24} color={"brown"} style={{ opacity: 0.5 }} />
                    <View style={{ width: '90%' }}>
                        {investmentType == 1 ? (
                            <Text>
                                <Text style={main.bold}>Puedes retirar dinero en cualquier momento,</Text> y recibirás los intereses al finalizar el plazo de tu inversión
                            </Text>
                        ) : (
                            <Text>
                                Recibirás intereses cada 7 días pero <Text style={main.bold}>no podrás retirar tu inversión inicial hasta finalizar el plazo de inversión</Text>
                            </Text>
                        )}
                    </View>
                </View>

                <Text style={[styles.text_16, main.mt_8, main.mb_8]}>Elige un plazo</Text>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.scroll_container}>
                    {deadlines[investmentType].map((deadline, index) => (
                        <TouchableOpacity key={index} onPress={() => changeInvestmentConfig(deadline)} style={[styles.card, deadline.days == investmentConf?.days ? main.bg_primary : styles.not_selected]}>
                            <Text style={deadline.days == investmentConf?.days ? main.color_white : main.color_gray}>{deadline.days} días</Text>
                            <Text style={deadline.days == investmentConf?.days ? { color: 'lightgray' } : main.color_gray}>+{deadline.rate}% anual</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {investmentConf != null && !errors.amount && watch('amount') !== undefined && watch('amount') !== '' && (
                    <Card>
                        <View style={[main.flex, main.flex_row, main.space_between, main.p_12]}>
                            <View style={[main.flex, main.gap_4]}>
                                <Text style={styles.dolar}>${(Number(((watch('amount') * (investmentConf.rate / 100)) / 365) * investmentConf.days) + Number(watch('amount'))).toFixed(2)}</Text>
                                <Text style={main.color_gray}>Total de inversión al finalizar el plazo</Text>
                            </View>
                            <View style={styles.mini_card}>
                                <Text style={main.color_white}>{(investmentType).toUpperCase()}</Text>
                            </View>
                        </View>
                        <View style={[main.ml_8, main.mr_8, styles.divider]}></View>
                        <View style={[main.flex, main.flex_row, main.gap_32, main.p_12]}>
                            <View style={[main.flex, main.gap_4]}>
                                <Text style={main.color_gray}>Tasa anual</Text>
                                <Text>{investmentConf.rate}%</Text>
                            </View>
                            <View style={styles.divider_vertical}></View>
                            <View style={[main.flex, main.gap_4]}>
                                <Text style={main.color_gray}>Primer rendimiento</Text>
                                <Text style={main.color_primary}>${Number(((watch('amount') * (investmentConf.rate / 100)) / 365) * 7).toFixed(2)}</Text>
                            </View>
                        </View>
                    </Card>
                )}
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                {/* BOTÓN */}
                <TouchableOpacity
                    style={[styles.button, main.flex, isDisabled ? { backgroundColor: '#aaa' } : { backgroundColor: '#222' }]}
                    onPress={onSubmit}
                    disabled={isDisabled}
                >
                    <Text style={styles.button_text}>Quiero invertir esta cantidad</Text>
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
    info_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#faf0da',
    },
    text_16: {
        fontSize: 16
    },
    balance: {
        fontSize: 12,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 20,
        borderRadius: 8,
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
    not_selected: {
        backgroundColor: '#e5e5e5'
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