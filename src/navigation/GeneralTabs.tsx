import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import SelectedTab from "@/components/TabBar/SelectedTab";
// Screens:
import HomeScreen from "@/screens/home/HomeScreen";
import CardsScreen from "@/screens/card/CardsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

export default function GeneralTab() {
    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                tabBarStyle: {
                    height: 60
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'white',
                headerShown: false
            }}
        >
            <Tab.Screen
                name='HomeStack'
                component={HomeStack}
                options={{
                    tabBarIcon: () => <AntDesign name="home" size={32} color={'black'} />,
                    tabBarLabel: ({ color }) => <SelectedTab color={color} />
                }}

            />
            <Tab.Screen
                name='Cards'
                component={CardsScreen}
                options={{
                    tabBarIcon: () => <AntDesign name="creditcard" size={32} color={'black'} />,
                    tabBarLabel: ({ color }) => <SelectedTab color={color} />
                }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: () => <MaterialCommunityIcons name="account-outline" size={32} color={'black'} />,
                    tabBarLabel: ({ color }) => <SelectedTab color={color} />
                }}
            />
        </Tab.Navigator>
    )
}