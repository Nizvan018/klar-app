import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "@/screens/auth/LoginScreen";
import GeneralTab from "./GeneralTabs";

const GeneralStackNavigator = createNativeStackNavigator();

export default function GeneralStack() {
    return (
        <GeneralStackNavigator.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <GeneralStackNavigator.Screen name="Login" component={LoginScreen} />
            <GeneralStackNavigator.Screen name="General" component={GeneralTab} />
        </GeneralStackNavigator.Navigator>
    )
}