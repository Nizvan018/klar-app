import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { main } from "@assets/styles/main";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootBottomParamList } from "@/types/navigationTypes";
import { useUser } from "@/context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { Transfer } from "@/types/database.type";
import { updateAccount } from "@/api/accout";
import { addTransfer } from "@/api/transfers";
import { useState } from "react";

export default function DepositScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const { user, account } = useUser();
    const [isCharging, setIsCharging] = useState(false);

    const goBack = () => {
        navigation.goBack();
    }

    const handleInputChange = (text: string) => {
        const correctAmount = text.replace(/^0+(?=\d)/, '');
        const numeric = correctAmount.replace(/[^0-9.]/g, '');

        const regex = /^(\d+)\.(\d{3})$/;
        const match = numeric.match(regex);

        if (match) {
            return numeric.slice(0, -1);
        } else {
            return numeric;
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        setIsCharging(true);

        const transfer: Transfer = {
            transmitter: 0,
            recipient: Number(account?.clabe),
            amount: Number(data.amount),
            concept: "Deposit",
            reference: 1234567
        }

        const res_update = await updateAccount(user?.uid, Number(data.amount));
        const res_transfer = await addTransfer(transfer);

        console.log(res_update, res_transfer);

        navigation.navigate('General');
    });

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={[main.flex, main.flex_row, main.space_between, main.align_center, styles.header]}>
                <View style={[main.flex, main.flex_row, main.gap_16, main.align_center]}>
                    <TouchableOpacity onPress={goBack}>
                        <AntDesign name="arrowleft" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.header_title}>
                        Depósito en efectivo
                    </Text>
                </View>
            </View>
            <View style={[main.flex, main.gap_8, main.mb_16]}>
                <Text style={styles.title}>Deposita por Transferencia Bancaria</Text>
                <Text>Deposita con tu número CLABE</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.bold}>{account?.name}</Text>
                <View style={[main.flex, main.flex_row, main.space_between, main.align_center]}>
                    <View style={[main.flex, main.gap_8]}>
                        <Text style={main.color_gray}>CLABE Interbancaria</Text>
                        <Text>{account?.clabe}</Text>
                    </View>
                    <TouchableOpacity>
                        <MaterialIcons name="content-copy" size={24} />
                    </TouchableOpacity>
                </View>
                <View style={[main.flex, main.gap_8]}>
                    <Text style={main.color_gray}>Banco Receptor</Text>
                    <Text>Klar - Alternativos</Text>
                </View>
            </View>
            <View style={[main.flex1, main.justify_center, main.align_center]}>
                <Text>Introduzca la cantidad a depositar</Text>
                <View style={[main.flex, main.flex_row, main.gap_16]}>
                    <Text style={[styles.quantity, errors?.amount?.type == 'min' || errors?.amount?.type == 'required' ? styles.bad_quantity : {}]}>$</Text>
                    <Controller
                        control={control}
                        name="amount"
                        rules={{
                            required: {
                                value: true,
                                message: 'Por favor, introduzca la cantidad'
                            },
                            min: {
                                value: 1,
                                message: 'La cantidad mínima es de $1 para transferir'
                            },
                            max: {
                                value: 100000,
                                message: 'Cantidad de dinero no disponible'
                            }
                        }}
                        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                            <>
                                <TextInput
                                    value={value}
                                    defaultValue="0"
                                    onChangeText={(text) => { onChange(handleInputChange(text)) }}
                                    onBlur={onBlur}
                                    style={[styles.quantity, error?.type == 'min' ? styles.bad_quantity : {}]}
                                    keyboardType="number-pad"
                                    selectionColor={'black'}
                                />
                            </>
                        )}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.button_text}>Realizar depósito</Text>
                    {isCharging && (
                        <View>
                            <ActivityIndicator color={'white'} size='small' />
                        </View>
                    )}
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
    title: {
        fontSize: 16,
        fontWeight: '700'
    },
    bold: {
        fontWeight: '700'
    },
    card: {
        display: 'flex',
        gap: 24,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#cfdecf'
    },
    quantity: {
        fontSize: 64
    },
    bad_quantity: {
        color: '#f66'
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