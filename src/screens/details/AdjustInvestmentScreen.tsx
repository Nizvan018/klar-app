import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { main } from '@assets/styles/main';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';
import CustomTextInputCounter from '@/components/inputs/CustomTextInputCounter';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ActionModal from '@/components/investments/ActionModal';
import { updateInvestmentAction } from '@/api/investments';

interface Props {
    route: RouteProp<{}>
}

interface Params {
    investmentID: string,
    name: string,
    action: 'retire' | 'reinvest'
}

const backgroundImage = require('@assets/images/piggy_bank.jpg');

const actionOptions = {
    "reinvest": "Reinvertir la cantidad inicial",
    "retire": "Retirar todo"
};

export default function AdjustInvestmentScreen({ route }: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const { investmentID, name, action }: Params = route.params;
    const { handleSubmit, formState: { errors }, control, watch } = useForm({
        defaultValues: {
            name: name
        }
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAction, setSelectedAction] = useState(action);
    const [isDisabled, setIsDisabled] = useState(false);

    const goBack = () => {
        navigation.goBack();
    }

    const openModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }

    const changeAction = (newAction: "reinvest" | "retire") => {
        setSelectedAction(newAction);
        setIsModalVisible(false);
    }

    const validate = () => {
        if (!errors.name && (watch('name') != name || selectedAction != action)) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        const updated = await updateInvestmentAction(investmentID, data.name, selectedAction);

        if (updated) {
            navigation.push('Investments');
        }
    });

    useEffect(() => {
        validate();
    }, [errors.name, selectedAction]);

    return (
        <View style={{ position: 'relative', flex: 1, justifyContent: 'space-between' }}>
            <View style={[main.flex, main.flex_row, main.space_between, main.align_center, styles.header]}>
                <Text style={[styles.header_title, main.color_white]}>
                    Inversión
                </Text>
                <TouchableOpacity onPress={goBack}>
                    <AntDesign name="close" size={24} color={'white'} />
                </TouchableOpacity>
            </View>

            <View style={{ position: 'relative', width: '100%', height: 300 }}>
                <Image source={backgroundImage} style={{ width: '100%', height: '100%', opacity: 0.85 }} resizeMode='cover' />
                <View style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.4, backgroundColor: 'black' }}></View>
            </View>

            <View style={styles.container}>
                <Text style={main.text_16}>Nombre de tu inversión</Text>

                <CustomTextInputCounter
                    control={control}
                    name='name'
                    placeholder={name}
                    rules={{
                        required: true,
                        minLength: 2,
                        maxLength: 40,
                        onChange: (event) => {
                            validate();
                        }
                    }}
                    mode='outlined'
                    activeOutlineColor='#000'
                    outlineColor='black'
                    max={40}
                    min={2}
                />

                <Text style={main.text_16}>¿Qué quieres hacer con tu inversión al término del plazo?</Text>
                <TouchableOpacity onPress={openModal} style={styles.input}>
                    <Text style={[{ fontSize: 13 }, main.color_gray]}>{actionOptions[selectedAction]}</Text>
                    <MaterialCommunityIcons name='pencil' size={22} color={'black'} />
                </TouchableOpacity>

                <ActionModal
                    isModalVisible={isModalVisible}
                    closeModal={closeModal}
                    changeAction={changeAction}
                    action={selectedAction}
                    actionOptions={actionOptions}
                />
            </View>

            <View style={styles.button_container}>
                <TouchableOpacity
                    style={[styles.button, main.flex, isDisabled ? { backgroundColor: '#aaa' } : { backgroundColor: '#222' }]}
                    onPress={onSubmit}
                    disabled={isDisabled}
                >
                    <Text style={styles.button_text}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
        height: '100%',
    },
    header: {
        zIndex: 50,
        position: 'absolute',
        height: 100,
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20
    },
    header_title: {
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
    button_container: {
        padding: 20
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