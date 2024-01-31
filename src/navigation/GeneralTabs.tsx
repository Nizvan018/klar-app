import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import SelectedTab from "@/components/TabBar/SelectedTab";
// Screens:
import HomeScreen from "@/screens/HomeScreen";
import CardsScreen from "@/screens/CardsScreen";
import ProfileScreen from "@/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function GeneralTab() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
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
                name='Home'
                component={HomeScreen}
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