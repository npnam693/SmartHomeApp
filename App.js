import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppNavigation from './AppNavigation';

import PinScreen from './screens/PinScreen';

export default function App() {
  return (
    // <NavigationContainer>
    //   <AppNavigation />
    // </NavigationContainer>
    <PinScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
  },
});
