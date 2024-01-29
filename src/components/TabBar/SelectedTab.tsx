import { Animated, StyleSheet, View } from 'react-native'

interface Props {
    color: string
}

export default function SelectedTab(props: Props) {
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.bar, { backgroundColor: props.color }]}></Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: 10
    },
    bar: {
        width: 12,
        height: 5,
        borderRadius: 100,
    }
});