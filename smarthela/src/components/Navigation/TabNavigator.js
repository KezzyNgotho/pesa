import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { useTheme } from "react-native-paper";
import { Image } from "react-native";

import DashboardScreen from "../Screens/DashboardScreen";
import BillPaymentsScreen from "../Screens/BillPayment";
import FundTransferScreen from "../Screens/MoneyTransferScreen";
import { MainStackNavigator, ContactStackNavigator, } from "./StackNavigator";

import BudgetTrackingScreen from "../Screens/BudgetTrackingScreen";
import MoneyTransferScreen from "../Screens/MoneyTransferScreen";

const BottomTabNavigator = () => {
  const { colors } = useTheme();

  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      activeColor={'black'} 
       inactiveColor={colors.onBackground} 
      barStyle={{ backgroundColor: colors.background }} // Use background color from theme
      initialRouteName='DashboardScreen'
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
               source={require('../../components/assets/menumenu.png')} 
              style={{ width: 37, height: 30 }}
            />
          ),
        }}
        name="DashboardScreen" component={MainStackNavigator} />
      <Tab.Screen
        options={{
          tabBarLabel: 'Bills',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../components/assets/billbill.jpg')} 
              style={{  width: 37, height: 30 }}
            />
          ),
        }}
        name="Bills" component={BillPaymentsScreen} />
      <Tab.Screen
        options={{
          tabBarLabel: 'Money',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../components/assets/move.png')} 
              style={{  width: 37, height: 30 }}
            />
          ),
        }}
        name="Money" component={MoneyTransferScreen} />
     
    </Tab.Navigator>
  );
};



 
export {BottomTabNavigator};
