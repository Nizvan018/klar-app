import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import CustomTextInput from "@/components/inputs/CustomTextInput";
// Types:
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { RootBottomParamList } from "@/types/navigationTypes";

export default function LoginScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigation = useNavigation<BottomTabNavigationProp<RootBottomParamList>>();
    const [isDisabled, setIsDisabled] = useState(true);

    const onSubmit = handleSubmit((data) => {
        navigation.navigate('General');
    });

    useEffect(() => {
        if (errors?.correo || errors?.password) {
            setIsDisabled(true);
            console.log('holi')
        } else {
            setIsDisabled(false);
        }
    }, [errors?.correo, errors?.password]);

    return (
        <View style={styles.container}>
            <View style={[styles.top_card, styles.d_flex]}>
                <Text style={[styles.title, styles.color_black]}>Klar</Text>
                <View style={[styles.info_card, styles.d_flex]}>
                    <Text style={[styles.text, styles.color_black]}>de Servicio</Text>
                    <Text style={[styles.text, styles.color_black]}>Financieros Alternativos SFP</Text>
                </View>
            </View>

            <View style={[styles.bottom_card, styles.d_flex]}>
                <Text style={[styles.bottom_title, styles.color_black]}>Iniciar sesión</Text>

                {/* CORREO ELECTRÓNICO */}
                <CustomTextInput
                    name="correo"
                    label="Correo"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Introduzca su correo electrónico'
                        },
                        pattern: {
                            value: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$/,
                            message: 'Email invalido'
                        }
                    }}
                    mode="outlined"
                    outlineColor="#aaa"
                    activeOutlineColor="black"
                />

                {/* CONTRASEÑA */}
                <CustomTextInput
                    name="password"
                    label="Contraseña"
                    control={control}
                    secureTextEntry={true}
                    rules={{
                        required: {
                            value: true,
                            message: 'Introduzca su contraseña'
                        },
                        minLength: {
                            value: 8,
                            message: 'La contraseña es muy corta'
                        },
                        maxLength: {
                            value: 50,
                            message: 'La contraseña es muy larga'
                        }
                    }}
                    mode="outlined"
                    outlineColor="#aaa"
                    activeOutlineColor="black"
                />

                <Text style={styles.forgot_pass}>¿Olvidaste tu contraseña?</Text>

                {/* BOTÓN */}
                <TouchableOpacity
                    style={[styles.button, styles.d_flex, isDisabled ? { backgroundColor: '#aaa' } : { backgroundColor: '#222' }]}
                    onPress={onSubmit}
                    disabled={isDisabled}
                >
                    <Text style={styles.button_text}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    d_flex: {
        display: 'flex'
    },
    color_black: {
        color: 'black'
    },
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 40,
        backgroundColor: '#fff'
    },
    top_card: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',
        gap: 10,
        marginTop: 60,
    },
    info_card: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 56,
        textAlign: 'center'
    },
    text: {
        fontSize: 16
    },
    bottom_card: {
        gap: 24,
        paddingHorizontal: 12,
    },
    bottom_title: {
        marginBottom: 8,
        fontSize: 20,
        fontWeight: '800'
    },
    forgot_pass: {
        textAlign: 'right',
        marginBottom: 16
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        borderRadius: 8,
        paddingVertical: 20,
    },
    button_text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }
});