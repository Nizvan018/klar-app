import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "@/screens/auth/LoginScreen";
import IsNotYouScreen from "@/screens/auth/IsNotYouScreen";
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
            <GeneralStackNavigator.Screen
                name="IsNotYou"
                component={IsNotYouScreen}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTransparent: true
                }}
            />
            <GeneralStackNavigator.Screen name="General" component={GeneralTab} />
        </GeneralStackNavigator.Navigator>
    )
}