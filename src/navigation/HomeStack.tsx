import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "@/screens/home/HomeScreen";
import ContactScreen from "@/screens/transfer/ContactScreen";
import { Text, TouchableOpacity } from "react-native";

const HomeStackNavigator = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
        </HomeStackNavigator.Navigator>
    )
}