import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigation from './AppNavigation';
import AuthContext from './AuthContext';

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
    
    const fetchUser = async () => {
        try {
            const value = await AsyncStorage.getItem('userData')
            if (value != null) setUserData(JSON.parse(value))
        } catch(e) {
            console.log(e)
        }
    };

    useEffect(() => {
      fetchUser();
    }, [isLoggedIn]);


    const login = () => {
        setIsLoggedIn(true);

        console.log('trang thía đăng nhập đang là ', isLoggedIn)
    };

    const logout = () => {
        setIsLoggedIn(false);
        console.log('trang thía đăng nhập đang là ', isLoggedIn)
    };

    return (
      <AuthContext.Provider value={{ isLoggedIn, userData, setUserData, fetchUser, login, logout }}>
        <NavigationContainer theme={MyTheme}>
          <AppNavigation /> 
        </NavigationContainer>
      </AuthContext.Provider>
    );
}

