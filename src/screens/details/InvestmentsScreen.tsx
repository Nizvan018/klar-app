import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { main } from '@assets/styles/main';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@/context/AuthContext';
import Card from '@/components/Card';
import InvestmentsCard from '@/components/investments/InvestmentsCard';
import { useState } from 'react';

export default function InvestmentsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const { investments } = useUser();
    const [filter, setFilter] = useState('All');

    const goBack = () => {
        navigation.goBack();
    }

    const goToNewInvestment = () => {
        navigation.navigate('NewInvestment');
    }

    const sumAmounts = () => {
        let sum = 0;

        investments?.map(investment => {
            if (!investment.data().isFinished) {
                sum += Number(investment.data().amount);
            }
        });

        return sum;
    }

    const changeFilter = (filter: string) => {
        setFilter(filter);
    }

    return (
        <>
            <ScrollView style={styles.container}>
                {/* HEADER */}
                <View style={[main.flex, main.flex_row, main.space_between, main.align_center, styles.header]}>
                    <View style={[main.flex, main.flex_row, main.gap_16, main.align_center]}>
                        <TouchableOpacity onPress={goBack}>
                            <AntDesign name="arrowleft" size={24} />
                        </TouchableOpacity>
                        <Text style={styles.header_title}>
                            Inversiones
                        </Text>
                    </View>
                    <View style={[main.flex, main.flex_row, main.align_center, main.gap_16]}>
                        <TouchableOpacity>
                            <AntDesign name='questioncircleo' size={20} color={'black'} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Entypo name="sound" size={24} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* AMOUNT */}
                <Text style={[styles.dolar]}>${sumAmounts().toFixed(2)}</Text>
                <Text>en {investments?.length} {investments && investments.length != 1 ? 'inversiones' : ''}</Text>

                {/* CATEGORIES */}
                <View style={[main.flex, main.flex_row, main.gap_8, main.mt_16]}>
                    <TouchableOpacity onPress={() => changeFilter("All")} style={filter === "All" ? styles.square_button : styles.square_button_inactive}>
                        <Text>Todos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeFilter("Active")} style={filter === "Active" ? styles.square_button : styles.square_button_inactive}>
                        <Text style={main.color_gray}>Activa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeFilter("Closed")} style={filter === "Closed" ? styles.square_button : styles.square_button_inactive}>
                        <Text style={main.color_gray}>Cerrado</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeFilter("Fixed")} style={filter === "Fixed" ? styles.square_button : styles.square_button_inactive}>
                        <Text style={main.color_gray}>Fija</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeFilter("Flex")} style={filter === "Flex" ? styles.square_button : styles.square_button_inactive}>
                        <Text style={main.color_gray}>Flexible</Text>
                    </TouchableOpacity>
                </View>

                {/* INVESTMENTS */}
                {investments?.filter(investment => {
                    if (filter === "All") {
                        return investment;
                    } else if (filter === "Active") {
                        return !investment.data().isFinished
                    } else if (filter === "Closed") {
                        return investment.data().isFinished
                    } else if (filter === "Fixed") {
                        return investment.data().type === "Fixed"
                    } else {
                        return investment.data().type === "Flex"
                    }
                }).map(investment => (
                    <InvestmentsCard key={investment.id} investment={investment} />
                ))}

                <View style={{ height: 100 }}></View>
            </ScrollView>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                <TouchableOpacity onPress={goToNewInvestment} style={styles.button}>
                    <Text style={styles.button_text}>+ Crear inversión</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    header: {
        height: 100,
    },
    header_title: {
        fontSize: 18,
        fontWeight: '700'
    },
    dolar: {
        fontSize: 32,
        fontWeight: '700'
    },
    dolar_min: {
        fontSize: 18,
        fontWeight: '700'
    },
    square_button: {
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black'
    },
    square_button_inactive: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'lightgray'
    },
    image: {
        aspectRatio: 1,
        width: '30%',
        backgroundColor: 'black'
    },
    font_16: {
        fontSize: 16
    },
    bar: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 2,
        minHeight: 8,
        borderRadius: 50,
        marginBottom: 8,
        backgroundColor: 'lightgray'
    },
    bar_black: {
        width: '40%',
        minHeight: 4,
        borderRadius: 50,
        backgroundColor: 'black'
    },
    circle: {
        display: 'flex',
        padding: 8,
        borderRadius: 50,
        backgroundColor: 'lightgray'
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