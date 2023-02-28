import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import DeviceScreen from './screens/DeviceScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import NotificationScreen from './screens/NotificationScreen';

const HomeStack = createNativeStackNavigator()
const VisualizationStack = createNativeStackNavigator()
const SettingStack = createNativeStackNavigator()

function HomeStackScreen({ navigation }) {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <HomeStack.Screen name="DeviceScreen" component={DeviceScreen}  options={{ headerShown: false }} />
        <HomeStack.Screen name="NotificationScreen" component={NotificationScreen} >
        </HomeStack.Screen>
      </HomeStack.Navigator>
    )
}

function VisualizationStackScreen({navigation}){
    return (
        <VisualizationStack.Navigator>
            <VisualizationStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
            <VisualizationStack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }}/>
        </VisualizationStack.Navigator>
    )
}

function SettingStackScreen({ navigation}){
    return (
        <SettingStack.Navigator>
            <SettingStack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }}  />
        </SettingStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();


export default function AppNavigation() {
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName 
                size = 24
                if (route.name === "HomeTab") {
                    return (
                        <View style={{backgroundColor:'#75A7F7', padding: 8, borderRadius: 20}}>
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
            }
          )
        }

          barStyle = {{backgroundColor: 'red', paddingHorizontal: 20}}

        >
            <Tab.Screen name="SettingTab" component={VisualizationStackScreen} 
              options={{headerShown: false, tabBarShowLabel: false}}
            />
            <Tab.Screen name="HomeTab" component={HomeStackScreen}  
              options={{headerShown: false, tabBarShowLabel: false}}  />
            <Tab.Screen name="VisualizationTab" component={SettingStackScreen} 
              options={{headerShown: false, tabBarShowLabel: false}}
            />
        </Tab.Navigator>
    )
} 