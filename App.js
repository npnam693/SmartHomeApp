import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AppNavigation from './AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PinScreen from './screens/PinScreen';
import SetPINScreen from './screens/Signup/SetPIN';



const AuthStack = createNativeStackNavigator()
const NonAuthStack = createNativeStackNavigator()



function AuthStackScreen({ navigation}){
    return (
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
          <AuthStack.Screen name="PinScreen" component={PinScreen} options={{ headerShown: false }}/>
        </AuthStack.Navigator>
    )
}

function NonAuthStackScreen({ navigation}){
    return (
      <NonAuthStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerStyle: { backgroundColor: 'transparent' },
      }}>
        <NonAuthStack.Screen name="PinScreen" component={PinScreen} options={{ headerShown: false }}/>
      </NonAuthStack.Navigator>
    )
}


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

export default function App() {
    const [userData, setUserData] = useState();
    const isLoggedIn = false
    useEffect(() => {
        const fetchUser = async () => {
        try {
            const value = await AsyncStorage.getItem('userData')
            console.log(value)
            if(value !== null) setUserData(JSON.parse(value))
        } catch(e)  {
            console.log(e)
        }};
        fetchUser();
    }, []);



    return (
        <NavigationContainer theme={MyTheme}>
            {
                isLoggedIn ? <AppNavigation /> 
                : 
                    userData ? <NonAuthStackScreen /> : <AuthStackScreen />
            }
        </NavigationContainer>
    );
}

