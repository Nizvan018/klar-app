import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { AntDesign, Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { main } from '@assets/styles/main';
import Card from '@/components/card/Card';
import { useRef, useState } from 'react';
import CircleButton from '@/components/inputs/CircleButton';
import ConfirmModal from '@/components/card/ConfirmModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomParamList } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const sidePadding = (width - (width * 0.6)) / 2;

const cardTypes = [
    { id: 'physical', cardType: 'Física', locked: false },
    { id: 'digital', cardType: 'Digital', locked: false }
];

export default function CardsScreen() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [cards, setCards] = useState(cardTypes);
    const flatListRef = useRef<FlatList<{ id: string, cardType: string, locked: boolean }>>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootBottomParamList>>();

    const openModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }

    const handleVisibleItems = useRef(({ viewableItems }: { viewableItems: Array<{ index: number }> }) => {
        if (viewableItems.length > 0) {
            setVisibleIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    const lockCard = (index: number) => {
        setCards(prevCards =>
            prevCards.map((card, i) =>
                i === index ? { ...card, locked: !card.locked } : card
            )
        );

        setIsModalVisible(false);
    }

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={[styles.header, main.mb_16]}>
                <Text style={styles.title}>Mis tarjetas</Text>
                <AntDesign name='questioncircleo' size={24} color={'black'} />
            </View>

            {/* CARDS */}
            <FlatList
                ref={flatListRef}
                style={[main.mt_16, { height: '52%' }]}
                data={cards}
                renderItem={
                    ({ item }) => <Card card={item} />
                }
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={width}
                snapToAlignment='center'
                decelerationRate='fast'
                contentContainerStyle={{ paddingHorizontal: sidePadding }}
                onViewableItemsChanged={handleVisibleItems}
                viewabilityConfig={viewabilityConfig}
            />

            <View style={[main.flex, main.flex_row, main.space_between, main.align_start, { paddingHorizontal: 48 }, main.mt_16]}>
                {visibleIndex == 0 ? (
                    <>
                        <CircleButton action={openModal} label={cards[0].locked ? 'Desbloquear' : 'Bloquear'}>
                            <Feather name={cards[0].locked ? 'unlock' : 'lock'} size={24} color={'black'} />
                        </CircleButton>
                        <CircleButton action={() => { navigation.push('NIP') }} label='Gestionar NIP'>
                            <Feather name='shield' size={24} color={'black'} />
                        </CircleButton>
                        <CircleButton action={() => { }} label='Solicitar nueva'>
                            <MaterialIcons name='add-card' size={24} color={'black'} />
                        </CircleButton>
                    </>
                ) : (
                    <>
                        <CircleButton action={() => { lockCard(1) }} label={cards[1].locked ? 'Desbloquear' : 'Bloquear'}>
                            <Feather name={cards[1].locked ? 'unlock' : 'lock'} size={24} color={'black'} />
                        </CircleButton>
                        <CircleButton action={() => { }} label='Eliminar'>
                            <FontAwesome5 name='trash-alt' size={24} color={'black'} />
                        </CircleButton>
                    </>
                )}
            </View>

            {!cards[visibleIndex].locked && (
                <View style={styles.note}>
                    <AntDesign name='infocirlceo' size={24} color={'black'} />
                    <Text>Actualmente está pagando con su <Text style={main.bold}>Cuenta</Text></Text>
                </View>
            )}

            <ConfirmModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                closeModal={closeModal}
                lockCard={lockCard}
                index={visibleIndex}
                isLocked={cards[visibleIndex].locked}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 64
    },
    title: {
        fontSize: 32,
        fontWeight: '700'
    },
    note: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        borderRadius: 12,
        backgroundColor: 'lightgray',
        margin: 20
    }
});
