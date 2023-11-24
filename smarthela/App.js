import React, { useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MainStackNavigator, LoginStackNavigator, ManagerStackNavigator } from '../smarthela/src/components/Navigation/StackNavigator';
import firebase from './src/components/firebase';

const Tab = createMaterialBottomTabNavigator();

const Lighttheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',   // Green
    accent: '#FF6347',    // Red
    background: 'white', // Light gray
    surface: '#FFFFFF',   // White
    text: '#333333',      // Dark gray
    secondary: '#E8C547', // Yellow
  },
};

const Darktheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00FF00',   // Green
    accent: '#FF6347',    // Red
    background: '#121212', // Dark gray background
    surface: '#333333',   // Dark surface color
    text: '#FFFFFF',      // White text
  },
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Use boolean for theme toggling

  return (
    <PaperProvider theme={isDarkTheme ? Darktheme : Lighttheme}>
      <NavigationContainer>
        {/* Define your navigation here */}
        <LoginStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;