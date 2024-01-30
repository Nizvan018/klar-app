import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import SelectedTab from "@/components/TabBar/SelectedTab";
import { ReactNode } from "react";
// Screens:
import HomeScreen from '@/screens/HomeScreen';
import CardsScreen from "@/screens/CardsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import LoginScreen from "@/screens/auth/LoginScreen";

const GeneralStackNavigator = createNativeStackNavigator();

function MyStack() {
    return (
        <GeneralStackNavigator.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <GeneralStackNavigator.Screen name="Login" component={LoginScreen} />
            <GeneralStackNavigator.Screen name="General" component={MyTabs} />
        </GeneralStackNavigator.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
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

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}