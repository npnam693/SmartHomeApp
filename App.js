import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import AppNavigation from './AppNavigation';

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

