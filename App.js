import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigation from './AppNavigation';
import AuthContext from './AuthContext';
import { io } from "socket.io-client";

export const socket = io("http://10.0.2.2:3000");

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [notifs, setNotifs] = useState(null)
    
    const fetchUser = async () => {
    
    try {
        const value = await AsyncStorage.getItem('userData')
        if (value != null) setUserData(JSON.parse(value))
        } catch(e) {
            console.log(e)
        }
    };

  const fetchNotif = async () => {

    try {
      const value = await AsyncStorage.getItem('notifs')
      if (value != null) setNotifs(JSON.parse(value))
    } catch (e) {
      console.log(e)
    }
  };
        
    useEffect(() => {
        fetchUser();
        fetchNotif()
    }, [isLoggedIn]);
        

    const login = () => {
        setIsLoggedIn(true);
        console.log('trang thía đăng nhập đang là ', isLoggedIn)
    };

    const logout = () => {
        setIsLoggedIn(false);
        console.log('trang thía đăng nhập đang là ', isLoggedIn)
    };

    console.log(userData)

    return (
      <AuthContext.Provider value={{ isLoggedIn, userData, setUserData, login, logout, notifs, setNotifs }}>
        <NavigationContainer theme={MyTheme}>
          <AppNavigation /> 
        </NavigationContainer>
      </AuthContext.Provider>
    );
}

