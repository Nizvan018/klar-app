import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { main } from '@assets/styles/main';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import { useForm } from 'react-hook-form';
import { useUser } from '@/context/AuthContext';
import SwitchSelector from 'react-native-switch-selector';
import { useState } from 'react';

export default function NewInvestmentScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { account } = useUser();
    const [investmentType, setInvestmentType] = useState(1);

    const options = [
        { label: 'Flexible', value: 1 },
        { label: 'Fija', value: 2, }
    ]

    const goBack = () => {
        navigation.goBack();
    }

    const onPress = (value: number) => {
        setInvestmentType(value);
    }

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
                    rules={{}}
                    mode='outlined'
                    outlineColor='#aaa'
                    activeOutlineColor='black'
                    placeholder='Necesitas un mínimo de $100.00'
                    keyboardType='number-pad'
                />
                <Text style={[styles.balance, main.color_gray, main.ml_8]}>${account?.amount} de saldo disponible</Text>
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
                                <Text>Puedes retirar diner en cualquier momento,</Text> y recibirás los intereses al finalizar el plazo de tu inversión
                            </Text>
                        ) : (
                            <Text>
                                Recibirás intereses cada 7 días pero <Text>no podrás retirar tu inversión inicial hasta finalizar el plazo de inversión</Text>
                            </Text>
                        )}
                    </View>
                </View>
            </View>
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
        width: 124,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'black',
    }
});