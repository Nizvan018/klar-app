import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { main } from '@assets/styles/main';
import { AntDesign } from '@expo/vector-icons';
import { Recipient } from '@/types/database.type';
import { RouteProp, useNavigation } from '@react-navigation/native';
import CustomTextInputCounter from '@/components/inputs/CustomTextInputCounter';
import MessageModal from '@/components/transfer/MessageModal';
import { useForm } from 'react-hook-form';

interface Props {
    route: RouteProp<{}>
}

interface Params {
    contacto: Recipient
    amount: number
}

export default function MessageScreen({ route }: Props) {
    const { contacto, amount }: Params = route.params;
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const goBack = () => {
        navigation.goBack();
    }

    const onSubmit = handleSubmit((data) => {
        console.log(data.message, data.reference);
        setIsModalVisible(true);
    });

    return (
        <>
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
                    <Text style={[styles.name, main.mb_16]}>Tu mensaje a {contacto.name}</Text>
                    <CustomTextInputCounter
                        name="message"
                        placeholder="Introduce texto aquí"
                        max={40}
                        min={0}
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: 'Por favor introduzca su mensaje'
                            },
                            minLength: {
                                value: 3,
                                message: 'El mensaje es demasiado corto'
                            },
                            maxLength: {
                                value: 40,
                                message: 'El mensaje es demasiado largo'
                            }
                        }}
                        mode="outlined"
                        outlineColor="#aaa"
                        activeOutlineColor="black"
                    />

                    <Text style={[styles.name, main.mb_16]}>Número de referencia (opcional)</Text>
                    <CustomTextInputCounter
                        name="reference"
                        placeholder="1234567"
                        max={7}
                        min={0}
                        control={control}
                        rules={{
                            pattern: {
                                value: /^\d{7}$/,
                                message: 'La referencia es inválida'
                            }
                        }}
                        mode="outlined"
                        outlineColor="#aaa"
                        activeOutlineColor="black"
                        keyboardType='number-pad'
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.button_text}>Validar transferencia</Text>
                </TouchableOpacity>

                <MessageModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} contact={contacto} amount={amount} />
            </View>
            <View style={[isModalVisible ? { opacity: 1, zIndex: 50 } : { opacity: 0, zIndex: 0 }, { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)' }]}></View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
        flex: 1,
        paddingHorizontal: 20,
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
        justifyContent: 'flex-start',
        paddingBottom: 32
    },
    button: {
        width: '100%',
        marginBottom: 20,
        borderRadius: 8,
        paddingVertical: 18,
        backgroundColor: '#222'
    },
    button_text: {
        textAlign: 'center',
        color: 'white'
    }
});