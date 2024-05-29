import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { main } from '@assets/styles/main';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';
import Card from '@/components/Card';
import CustomTextInputCounter from '@/components/inputs/CustomTextInputCounter';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ActionModal from '@/components/investments/ActionModal';
import ConfirmModal from '@/components/investments/ConfirmModal';
import { useUser } from '@/context/AuthContext';
import { Investment } from '@/types/database.type';
import { addInvestments } from '@/api/investments';

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
    action: "reinvest" | "retire"
}

const backgroundImage = require('@assets/images/piggy_bank.jpg');

const actionOptions = {
    "reinvest": "Reinvertir la cantidad inicial",
    "retire": "Retirar todo"
};

export default function ConfigureInvestmentScreen({ route }: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const { user } = useUser();
    let { investmentData, action }: Params = route.params;
    const { handleSubmit, formState: { errors }, control } = useForm();
    const [selectedAction, setSelectedAction] = useState(action);
    const [isDisabled, setIsDisable] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [finalAmout, setFinalAmout] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFinalAmout(Number(((investmentData.amount * (investmentData.rate / 100)) / 365) * investmentData.days) + Number(investmentData.amount));
    });

    const goBack = () => {
        navigation.goBack();
    }

    const changeAction = (newAction: "reinvest" | "retire") => {
        setSelectedAction(newAction);
        setIsModalVisible(false);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }

    const closeConfirmModal = () => {
        setIsConfirmModalVisible(false);
    }

    const openModal = () => {
        setIsModalVisible(true);
    }

    const makeInvestment = handleSubmit(async (data) => {
        setIsLoading(true);

        if (!user) {
            return;
        }

        const newInvestment: Investment = {
            account_id: user?.uid,
            name: data.name,
            type: investmentData.investmentType,
            rate: investmentData.rate,
            amount: investmentData.amount,
            initDate: new Date(),
            cutoffDate: new Date(),
            finalDate: new Date(Date.now() + (investmentData.days * 24 * 60 * 60 * 1000)),
            isFinished: false
        }

        await addInvestments(newInvestment);

        navigation.dispatch(CommonActions.reset({
            index: 1,
            routes: [
                { name: 'General' },
                { name: 'Investments' }
            ]
        }));
    });

    const onSubmit = handleSubmit(() => {
        setIsConfirmModalVisible(true);
    });

    useEffect(() => {
        if (!errors.name) {
            setIsDisable(false);
        } else {
            setIsDisable(true);
        }
    }, [errors.name]);

    return (
        <>
            {/* BACKGROUND IMAGE */}
            <View style={{ zIndex: 0, position: 'relative', width: '100%', height: '32%' }}>
                <Image source={backgroundImage} style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.85 }} resizeMode='cover' />
                <View style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.4, backgroundColor: 'black' }}></View>
            </View>

            <View style={[styles.container, { zIndex: 50, position: 'absolute' }]}>
                {/* HEADER */}
                <View style={[main.flex, main.flex_row, main.gap_16, main.align_center, styles.header]}>
                    <TouchableOpacity onPress={goBack}>
                        <AntDesign name="arrowleft" size={24} color={'white'} />
                    </TouchableOpacity>
                    <Text style={[styles.header_title, main.color_white]}>
                        Configura tu inversión
                    </Text>
                </View>

                {/* CARD */}
                <View>
                    <Card>
                        <View style={[main.flex, main.p_12, main.gap_16]}>
                            <View style={[main.flex, main.flex_row, main.align_center, main.space_between]}>
                                <View style={[main.flex, main.gap_4]}>
                                    <View style={[main.flex, main.flex_row]}>
                                        <Text style={[styles.dolar]}>$</Text>
                                        <Text style={[styles.dolar]}>{Math.floor(finalAmout)}</Text>
                                        <Text>{(finalAmout % 1).toFixed(2).split('.')[1]}</Text>
                                    </View>
                                    <Text style={main.color_gray}>Total de inversión al finalizar el plazo</Text>
                                </View>
                                <Text style={[styles.mini_card, main.color_white]}>{investmentData.investmentType.toUpperCase()}</Text>
                            </View>
                            <View style={[main.flex, main.gap_4]}>
                                <Text style={styles.dolar_min}>{investmentData.days} días</Text>
                                <Text style={main.color_gray}>Plazo de la inversión (finaliza el {Intl.DateTimeFormat('es-Es', { day: 'numeric', month: 'long' }).format(new Date(Date.now() + (investmentData.days * 24 * 60 * 60 * 1000)))})</Text>
                            </View>
                            <View style={[styles.divider]}></View>
                            <View style={[main.flex, main.flex_row, main.gap_32]}>
                                <View style={[main.flex, main.gap_4]}>
                                    <Text style={main.color_gray}>Tasa anual</Text>
                                    <Text style={main.bold}>{investmentData.rate.toFixed(2)}%</Text>
                                </View>
                                <View style={styles.divider_vertical}></View>
                                <View style={[main.flex, main.gap_4]}>
                                    <Text style={main.color_gray}>Primer rendimiento</Text>
                                    <Text style={[main.color_primary, main.bold]}>${Number(((investmentData.amount * (investmentData.rate / 100)) / 365) * 7).toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>
                    </Card>
                </View>

                <View style={[main.flex, main.gap_8]}>
                    <Text style={styles.text_16}>Nombra tu inversión</Text>
                    <CustomTextInputCounter
                        control={control}
                        name='name'
                        placeholder='Regalo de cumpleaños'
                        rules={{
                            required: {
                                value: true,
                                message: 'Por favor, introduzca el nombre para su inversión'
                            },
                            min: {
                                value: 2,
                                message: 'El nombre es muy corto'
                            },
                            max: {
                                value: 40,
                                message: 'Límite máximo alcanzado'
                            }
                        }}
                        mode='outlined'
                        activeOutlineColor='#000'
                        outlineColor='black'
                        max={40}
                        min={2}
                    />
                </View>

                <View style={[main.flex, main.gap_8]}>
                    <Text style={styles.text_16}>¿Qué quieres hacer con tu inversión al término del plazo?</Text>
                    <TouchableOpacity onPress={openModal} style={styles.input}>
                        <Text style={[{ fontSize: 13 }, main.color_gray]}>{actionOptions[selectedAction]}</Text>
                        <MaterialCommunityIcons name='pencil' size={22} color={'black'} />
                    </TouchableOpacity>
                </View>

                <Text style={main.color_gray}>Al continuar reconozco y acepto los <Text style={[styles.link, main.color_primary]}>Términos y Condiciones de la Inversión</Text></Text>

                <TouchableOpacity
                    style={[styles.button, main.flex, isDisabled ? { backgroundColor: '#aaa' } : { backgroundColor: '#222' }]}
                    onPress={onSubmit}
                    disabled={isDisabled}
                >
                    <Text style={styles.button_text}>Quiero invertir esta cantidad</Text>
                </TouchableOpacity>

                <ActionModal
                    isModalVisible={isModalVisible}
                    closeModal={closeModal}
                    changeAction={changeAction}
                    action={selectedAction}
                    actionOptions={actionOptions}
                />

                <ConfirmModal
                    isModalVisible={isConfirmModalVisible}
                    setIsModalVisible={setIsConfirmModalVisible}
                    closeModal={closeConfirmModal}
                    makeInversion={makeInvestment}
                    investmentType={investmentData.investmentType}
                    isLoading={isLoading}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
    input: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16
    },
    link: {
        textDecorationLine: "underline"
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