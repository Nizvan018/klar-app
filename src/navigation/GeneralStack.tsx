import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUser } from "@/context/AuthContext";

import LoginScreen from "@/screens/auth/LoginScreen";
import IsNotYouScreen from "@/screens/auth/IsNotYouScreen";
import GeneralTab from "./GeneralTabs";
import ContactScreen from "@/screens/transfer/ContactScreen";
import AddContactScreen from "@/screens/transfer/AddContactScreen";
import TrasnferScreen from "@/screens/transfer/TrasnferScreen";
import MessageScreen from "@/screens/transfer/MessageScreen";
import DepositScreen from "@/screens/deposit/DepositScreen";
import DetailsScreen from "@/screens/details/DetailsScreen";
import EarningsScreen from "@/screens/details/EarningsScreen";
import InvestmentsScreen from "@/screens/details/InvestmentsScreen";
import NewInvestmentScreen from "@/screens/details/NewInvestmentScreen";
import SelectActionScreen from "@/screens/details/SelectActionScreen";
import ConfigureInvestmentScreen from "@/screens/details/ConfigureInvestmentScreen";
import InvestmentDetailsScreen from "@/screens/details/InvestmentDetails";
import AdjustInvestmentScreen from "@/screens/details/AdjustInvestmentScreen";
import NIPScreen from "@/screens/card/NIPScreen";
import ChangeNIPScreen from "@/screens/card/ChangeNIPScreen";

const GeneralStackNavigator = createNativeStackNavigator();

export default function GeneralStack() {
    const { user } = useUser();

    return (
        <GeneralStackNavigator.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                statusBarStyle: 'dark',
                statusBarTranslucent: true,
                contentStyle: {
                    flex: 1
                }
            }}
        >

            {user ? (
                <>
                    <GeneralStackNavigator.Screen name="General" component={GeneralTab} />
                    <GeneralStackNavigator.Screen name="Contact" component={ContactScreen} />
                    <GeneralStackNavigator.Screen name="AddContact" component={AddContactScreen} />
                    <GeneralStackNavigator.Screen name="Transfer" component={TrasnferScreen} />
                    <GeneralStackNavigator.Screen name="Message" component={MessageScreen} />
                    <GeneralStackNavigator.Screen name="Deposit" component={DepositScreen} />
                    <GeneralStackNavigator.Screen name="Details" component={DetailsScreen} />
                    <GeneralStackNavigator.Screen name="Earnings" component={EarningsScreen} />
                    <GeneralStackNavigator.Screen name="Investments" component={InvestmentsScreen} />
                    <GeneralStackNavigator.Screen name="NewInvestment" component={NewInvestmentScreen} />
                    <GeneralStackNavigator.Screen name="SelectAction" component={SelectActionScreen} />
                    <GeneralStackNavigator.Screen name="ConfigureInvestment" component={ConfigureInvestmentScreen} options={{ statusBarStyle: "light", statusBarTranslucent: true }} />
                    <GeneralStackNavigator.Screen name="InvestmentDetails" component={InvestmentDetailsScreen} options={{ statusBarStyle: "light", statusBarTranslucent: true }} />
                    <GeneralStackNavigator.Screen name="AdjustInvestment" component={AdjustInvestmentScreen} options={{ statusBarStyle: "light", statusBarTranslucent: true }} />
                    <GeneralStackNavigator.Screen name="NIP" component={NIPScreen} />
                    <GeneralStackNavigator.Screen name="ChangeNIP" component={ChangeNIPScreen} />
                </>
            ) : (
                <>
                    <GeneralStackNavigator.Screen name="Login" component={LoginScreen} />
                    <GeneralStackNavigator.Screen
                        name="IsNotYou"
                        component={IsNotYouScreen}
                        options={{
                            headerShown: true,
                            headerTitle: '',
                            headerTransparent: true,
                        }}
                    />
                </>
            )}

        </GeneralStackNavigator.Navigator>
    )
}