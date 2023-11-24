import React from 'react';
import LoginScreen from '../Screens/LoginScreen';
import RegistrationScreen from "../Screens/RegistrationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import BottomTabNavigator from "./TabNavigator";
import { MainStackNavigator } from './StackNavigator';

const LoginStackNavigator = () => {
    const { colors } = useTheme();
    const Stack = createNativeStackNavigator();
    const screenOptionStyle = {
      headerStyle: {},
      headerShown: false,
      headerTintColor: colors.primary,
      headerBackTitle: "Back",
    };
  
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    );
  }
export default  LoginStackNavigator;