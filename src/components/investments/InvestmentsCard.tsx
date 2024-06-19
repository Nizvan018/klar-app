import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { main } from '@assets/styles/main';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import Card from '../Card';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';

const image = require("@assets/images/piggy_bank.jpg");

interface Props {
    investment: any
}

export default function InvestmentsCard({ investment }: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();
    const [width, setWidth] = useState('0%');

    useEffect(() => {
        const totalSeconds = investment.data().finalDate.seconds - investment.data().initDate.seconds;
        const currentSeconds = investment.data().cutoffDate.seconds - investment.data().initDate.seconds;

        setWidth(Math.floor((currentSeconds * 100) / totalSeconds) + '%');
    }, [investment.data().cutoffDate]);

    const calculateDuration = (start: number, end: number) => {
        return (end - start) / (24 * 60 * 60);
    }

    const remainingDays = (cutoff: number, end: number) => {
        return (end - cutoff) / (24 * 60 * 60);
    }

    const calcInterests = (investment: any) => {
        const duration = Math.floor((investment.data().finalDate.seconds - investment.data().initDate.seconds) / (24 * 60 * 60));

        return (investment.data().amount * (((investment.data().rate / 100) / 365) * duration)) + investment.data().amount;
    }

    const goToInvestmentDetails = (investment: any) => {
        navigation.navigate('InvestmentDetails', { investment: investment.data(), investmentId: investment.id });
    }

    return (
        investment.data().isFinished ? (
            <Card>
                <View style={[main.flex, main.flex_row, main.gap_16, main.p_16]}>
                    <View style={styles.circle}>
                        <Feather name='check' size={24} color={'gray'} />
                    </View>
                    <View style={[main.flex1, main.justify_center, main.gap_4]}>
                        <Text style={styles.font_16}>${calcInterests(investment).toFixed(2)} de intereses</Text>
                        <Text style={main.color_gray}>{investment.data().name} - {calculateDuration(investment.data().initDate.seconds, investment.data().finalDate.seconds)} días</Text>
                    </View>
                </View>
            </Card>
        ) : (
            <Card>
                <TouchableOpacity onPress={() => goToInvestmentDetails(investment)} style={[main.flex, main.flex_row, main.gap_8]}>
                    <Image source={image} style={{ width: '30%', aspectRatio: 1 }} resizeMode='cover' />
                    <View style={[main.flex1, main.space_between, main.p_8, main.mr_8]}>
                        <View>
                            <Text style={[main.bold, styles.font_16]}>${(investment.data().amount).toFixed(2)}</Text>
                            <Text style={main.color_gray}>{investment.data().name}</Text>
                        </View>
                        <View style={[main.flex, main.gap_8]}>
                            <View style={[main.flex, main.flex_row, main.space_between]}>
                                <Text>Quedan {remainingDays(investment.data().cutoffDate.seconds, investment.data().finalDate.seconds)} días</Text>
                                <Text style={[main.color_gray]}>{calculateDuration(investment.data().initDate.seconds, investment.data().finalDate.seconds)} días</Text>
                            </View>
                            <View style={styles.bar}>
                                <View style={[styles.bar_black, { width: width }]}></View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    )
}

const styles = StyleSheet.create({
    circle: {
        display: 'flex',
        padding: 8,
        borderRadius: 50,
        backgroundColor: 'lightgray'
    },
    font_16: {
        fontSize: 16
    },
    image: {
        aspectRatio: 1,
        width: '30%',
        maxWidth: '30%'
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
        minHeight: 4,
        borderRadius: 50,
        backgroundColor: 'black'
    },
});