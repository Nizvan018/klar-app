import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUser } from "@/context/AuthContext";

import LoginScreen from "@/screens/auth/LoginScreen";
import IsNotYouScreen from "@/screens/auth/IsNotYouScreen";
import GeneralTab from "./GeneralTabs";

const GeneralStackNavigator = createNativeStackNavigator();

export default function GeneralStack() {
    const user = useUser();

    return (
        <GeneralStackNavigator.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >

            {user ? (
                <GeneralStackNavigator.Screen name="General" component={GeneralTab} />
            ) : (
                <>
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
                </>
            )}

        </GeneralStackNavigator.Navigator>
    )
}