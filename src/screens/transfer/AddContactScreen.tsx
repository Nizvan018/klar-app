import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { main } from "@assets/styles/main";
import CustomTextInputCounter from "@/components/inputs/CustomTextInputCounter";
import SelectDropdown from "react-native-select-dropdown";
import { useState, useEffect } from "react";

export default function AddContactScreen() {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const [type, setType] = useState({ nombre: 'CLABE', valor: 0 });
    const [isDisabled, setIsDisabled] = useState(true);
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    useEffect(() => {
        if (errors?.nombre || errors?.clabe_tarjeta || errors?.etiqueta) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [errors?.nombre, errors?.clabe_tarjeta, errors?.etiqueta]);

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={[main.flex, main.flex_row, main.align_center, main.gap_16, styles.header]}>
                <TouchableOpacity onPress={goBack}>
                    <AntDesign name="arrowleft" size={24} />
                </TouchableOpacity>
                <Text style={styles.header_title}>Datos del nuevo destinatario</Text>
            </View>

            {/* NOMBRE DESTINATARIO */}
            <CustomTextInputCounter
                name="nombre"
                placeholder="Nombre completo del destinatario"
                max={40}
                min={2}
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'Introduzca el nombre del destinatario'
                    },
                    minLength: {
                        value: 2,
                        message: 'El nombre es demasiado corto'
                    },
                    maxLength: {
                        value: 40,
                        message: 'El nombre es demasiado largo'
                    }
                }}
                mode="outlined"
                outlineColor="#aaa"
                activeOutlineColor="black"
            />

            <SelectDropdown
                data={['CLABE', 'Tarjeta']}
                onSelect={(selectedItem, index) => {
                    setType({ nombre: selectedItem, valor: index });
                    setValue('clabe_tarjeta', '', { shouldValidate: true });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                defaultValue={'CLABE'}
                buttonStyle={{
                    width: '100%',
                    borderWidth: 1,
                    borderColor: '#aaa',
                    borderRadius: 8,
                    marginBottom: 8,
                    backgroundColor: 'transparent'
                }}
                buttonTextStyle={{
                    fontSize: 12,
                    textAlign: 'left'
                }}
                renderDropdownIcon={() => (
                    <MaterialIcons name="keyboard-arrow-down" size={24} />
                )}
                dropdownStyle={{
                    borderWidth: 0,
                    borderRadius: 8
                }}
            />

            {/* CLABE/TARJETA */}
            <CustomTextInputCounter
                name="clabe_tarjeta"
                placeholder={type.nombre}
                max={type.valor == 0 ? 18 : 16}
                min={type.valor == 0 ? 18 : 16}
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'Introduzca la clabe/tarjeta'
                    },
                    minLength: {
                        value: type.valor == 0 ? 18 : 16,
                        message: 'La clabe/tarjeta es demasiado corta'
                    },
                    maxLength: {
                        value: type.valor == 0 ? 18 : 16,
                        message: 'La clabe/tarjeta es demasiado larga'
                    }
                }}
                mode="outlined"
                outlineColor="#aaa"
                activeOutlineColor="black"
            />

            {/* ETIQUETA */}
            <CustomTextInputCounter
                name="etiqueta"
                placeholder="Agregar etiqueta (opcional)"
                max={40}
                min={0}
                control={control}
                rules={{
                    required: false,
                    maxLength: {
                        value: 40,
                        message: 'La etiqueta es demasiado larga'
                    }
                }}
                mode="outlined"
                outlineColor="#aaa"
                activeOutlineColor="black"
            />

            {/* BOTÓN */}
            <TouchableOpacity
                style={[styles.button, main.flex, isDisabled ? { backgroundColor: '#aaa' } : { backgroundColor: '#222' }]}
                onPress={onSubmit}
                disabled={isDisabled}
            >
                <Text style={styles.button_text}>Iniciar sesión</Text>
            </TouchableOpacity>
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