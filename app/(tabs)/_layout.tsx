import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native";
import { GlobalStyle } from "../../constants/styles";
import { IconButton } from "../../components/UI/IconButton";

export default function TabLayout () {
    return(
        <Tabs 
            screenOptions={{
                headerStyle: {
                    backgroundColor: GlobalStyle.colors.primary500,
                },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: GlobalStyle.colors.primary500
                },
                tabBarActiveTintColor: GlobalStyle.colors.accent500,
                headerRight: ({ tintColor }) => 
                    <IconButton 
                        icon="add" 
                        color={tintColor as string} 
                        size={28} 
                        onPress={() => {
                            router.navigate('/manage-expense/null')
                        }}
                    />
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Recent Expenses",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color}/>,
                    
                }}
            />

            <Tabs.Screen 
                name="all-expenses"
                options={{
                    title: "All Expenses",
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color}/>
                }}
            />
        </Tabs>
    )
}