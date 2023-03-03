import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import DeviceScreen from './screens/DeviceScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import NotificationScreen from './screens/NotificationScreen';
import SettingScreen from './screens/SettingScreen';
import PinScreen from './screens/PinScreen';


const HomeStack = createNativeStackNavigator()
const VisualizationStack = createNativeStackNavigator()
const SettingStack = createNativeStackNavigator()

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
        <VisualizationStack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerStyle: { backgroundColor: 'transparent' },
          }}
        >
          <VisualizationStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
          <VisualizationStack.Screen name="SignupScreen" component={SignupScreen} 
            options={{ 
              headerTitle: (props) => <View style = {{backgroundColor:'red'}}></View>,
            }}
          />
          <VisualizationStack.Screen name="PinScreen" component={PinScreen} options={{ headerShown: false }}/>
        </VisualizationStack.Navigator>
    )
}

function SettingStackScreen({ navigation}){
    return (
        <SettingStack.Navigator>
            <SettingStack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }}/>
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
                        <View style={{backgroundColor:'#75A7F7', padding: 10, 
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
                  }}>
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
          }
          )
        }
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