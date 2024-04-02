import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useUser } from "@/context/AuthContext";
import { logout } from "@/api/auth";

export default function Header() {
    const { user } = useUser();

    return (
        <View style={[styles.header, styles.flex, styles.flex_row]}>
            <TouchableOpacity
                onPress={logout}
                style={[styles.profile_icon, styles.flex]}>
                <Text style={styles.profile_text}>
                    {user?.email?.charAt(0).toUpperCase()}
                </Text>
            </TouchableOpacity>
            <View style={[styles.flex, styles.flex_row, styles.icons_container]}>
                <AntDesign name='eyeo' size={24} color={'black'} />
                <Entypo name='sound' size={24} color={'black'} />
                <Ionicons name='notifications-outline' size={24} color={'black'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {
        display: 'flex'
    },
    flex_row: {
        flexDirection: 'row'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 100,
        paddingTop: 24
    },
    profile_icon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        aspectRatio: 1,
        borderRadius: 100,
        backgroundColor: 'white'
    },
    profile_text: {
        fontSize: 18,
        fontWeight: '700'
    },
    icons_container: {
        gap: 24
    }
});