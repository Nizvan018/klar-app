import { View, Text, StyleSheet, Dimensions } from "react-native";
import { main } from "@assets/styles/main";

const { width } = Dimensions.get('window');

interface Props {
    card: {
        id: string
        cardType: string
        locked: boolean
    }
}

export default function Card({ card }: Props) {
    return (
        <View style={{ width: width }}>
            <View style={styles.card_container}>
                <View style={[main.flex, main.flex_row, main.space_between, main.align_center]}>
                    <Text style={[main.bold, main.text_16]}>{card.cardType}</Text>
                    <Text style={[card.locked ? styles.card_red : main.bg_primary, styles.mini_card, main.text_16, main.color_white]}>
                        {card.locked ? 'BLOQUEADA' : 'ACTIVA'}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={{ fontSize: 48 }}>
                        Klon
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card_container: {
        display: 'flex',
        gap: 16,
        width: '60%',
        height: '90%',
    },
    mini_card: {
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 8
    },
    card_red: {
        backgroundColor: '#bc2222',
    },
    card: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        padding: 24,
        borderRadius: 16,
        backgroundColor: 'lightblue'
    }
});