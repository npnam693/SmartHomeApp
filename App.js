import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SetPINScreen from './screens/Signup/SetPIN';



const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <AppNavigation />
    </NavigationContainer>
  );
}

