import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View,  StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DeviceScreen from './screens/DeviceScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import NotificationScreen from './screens/NotificationScreen';
import SettingScreen from './screens/SettingScreen';
import PinScreen from './screens/PinScreen';
import VisualiaztionScreen from './screens/Visualization';
import SetPINScreen from './screens/Signup/SetPIN';
import AddFace from './screens/Setting/AddFace';
import FaceRegconition from './screens/Setting/FaceRegconition';

import { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';


const HomeStack = createNativeStackNavigator()
const VisualizationStack = createNativeStackNavigator()
const SettingStack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()


function AuthStackScreen(){
    const { isLoggedIn, userData } = useContext(AuthContext);

    useEffect(() => {
        console.log('huhuhuhuuhuhu', isLoggedIn)
    }, [isLoggedIn]);
    
    console.log('datain component', userData)
    
    if (userData)
        return (
            <AuthStack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerStyle: { backgroundColor: 'transparent' },
              }}>
                <AuthStack.Screen name="PinScreen" component={PinScreen} options={{ headerShown: false }}/>
            </AuthStack.Navigator>
        )
        else return (
            <AuthStack.Navigator 
                screenOptions={{
                headerTransparent: true,
                headerStyle: { backgroundColor: 'transparent' },
              }}
              >
                <AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
                <AuthStack.Screen name="SignupScreen" component={SignupScreen} 
                options={{ 
                    headerTitle: (props) => <View style = {{backgroundColor:'red'}}></View>,
                }}
                />
                <AuthStack.Screen name="SetPINScreen" component={SetPINScreen} options={{ headerShown: false }}/>
            </AuthStack.Navigator>
    )
}

function HomeStackScreen({ navigation }) {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <HomeStack.Screen name="DeviceScreen" component={DeviceScreen}  
          options= {{
            title: 'Name Device'
          }}
        />
        <HomeStack.Screen name="NotificationScreen" component={NotificationScreen} >
        </HomeStack.Screen>
      </HomeStack.Navigator>
    )
} 
function VisualizationStackScreen({navigation}){
    return (
        <VisualizationStack.Navigator>
          <VisualizationStack.Screen name="VisualiaztionScreen" component={VisualiaztionScreen} options={{ headerShown: false }}/>
        </VisualizationStack.Navigator>
    )
}
function SettingStackScreen({ navigation}){
    return (
      <SettingStack.Navigator>
        <SettingStack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }}/>
        <SettingStack.Screen name="AddFace" component={AddFace} />
        <SettingStack.Screen name="FaceRegconition" component={FaceRegconition} />
      </SettingStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName 
                    size = 24
                    if (route.name === "HomeTab") {
                        return (
                            <View style={styles.tabbar}>
                                <Ionicons name = 'home' size={size} color={color} />
                            </View>
                        )
                    }
                    else if (route.name === "SettingTab") {
                        iconName = "ios-settings-sharp"
                        size = 27
                    }
                    else iconName = 'bar-chart'
                    return <Ionicons name = {iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: '#3E4F88',
                tabBarInactiveTintColor: '#D2E0EE',
                tabBarStyle: {height: 60}
            })}
            initialRouteName="HomeTab"
        >
            <Tab.Screen name="VisualizationTab" component={VisualizationStackScreen} 
                options={{headerShown: false, tabBarShowLabel: false}}
            />
            <Tab.Screen name="HomeTab" component={HomeStackScreen}  
                options={{headerShown: false, tabBarShowLabel: false}}  />
            <Tab.Screen name="SettingTab" component={SettingStackScreen} 
                options={{headerShown: false, tabBarShowLabel: false}}
            />
        </Tab.Navigator>
    )
} 

const Stack = createNativeStackNavigator()

export default function AppNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AuthStackScreen" component={AuthStackScreen} options={{headerShown: false, tabBarShowLabel: false}}/>
            <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}


const styles = StyleSheet.create({
  tabbar: {
    backgroundColor:'#75A7F7', 
    padding: 10, 
    borderRadius: 40,
    shadowColor: "#00B5D8",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    
    borderRadius: 30,
    elevation: 7,
  }
})