import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { main } from "@assets/styles/main"
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useUser } from "@/context/AuthContext";
import { useForm, Controller } from "react-hook-form";

interface Props {
    route: RouteProp<{}>
}

export default function TrasnferScreen({ route }: Props) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigation = useNavigation();
    const { contacto } = route.params;
    const { account } = useUser();

    const goBack = () => {
        navigation.goBack();
    }

    const onSubmit = handleSubmit((data) => {
        console.log(data.amount);
    });

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
                                    value: account.amount,
                                    message: 'Cantidad de dinero no disponible'
                                }
                            }}
                            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                                <>
                                    <TextInput
                                        value={value}
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
                    <Text style={errors?.amount?.type == "max" ? styles.bad_quantity : {}}>${account.amount.toFixed(2)} disponibles para transferir</Text>
                    {errors?.amount?.type == 'min' && (
                        <Text style={[main.mt_16, styles.bad_quantity]}>{errors.amount.message}</Text>
                    )}
                </View>

                <TouchableOpacity style={styles.button} onPress={onSubmit}>
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
    bad_quantity: {
        color: '#f66'
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