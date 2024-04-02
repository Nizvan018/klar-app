import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useUser } from '@/context/AuthContext';
import { useState } from 'react';
import { main } from '@assets/styles/main';
// COMPONENTS:
import Header from '@/components/header';
import ToggleSwitch from '@/components/inputs/ToggleSwitch';
import DebitCard from './DebitCard';
import CreditCard from './CreditCard';
import MovementsSection from './MovementsSection';

export default function HomeScreen() {
    const { user } = useUser();
    const [componentsOrder, setComponentsOrder] = useState(true);

    const onPress = () => {
        setComponentsOrder(!componentsOrder);
    };

    return (
        <ScrollView style={styles.container}>
            <Header />
            <ToggleSwitch onPress={onPress} />

            <View>
                {componentsOrder ? (
                    <>
                        <DebitCard />
                        <CreditCard disabled={{ color: 'gray' }} />
                    </>
                ) : (
                    <>
                        <CreditCard />
                        <DebitCard disabled={{ color: 'gray' }} />
                    </>
                )}
            </View>

            <MovementsSection />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    }
});