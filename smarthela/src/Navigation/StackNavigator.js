import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import ZuriTillScreen from "../Screens/ZuriTillScreen";
import { BottomTabNavigator } from "./TabNavigator";
import airtelScreen from '../Screens/AirtelScreen'
 import LoginScreen from '../Screens/LoginScreen';
import RegistrationScreen from "../Screens/RegistrationScreen"; 
import DashboardScreen from "../Screens/DashboardScreen";
import AccountOverviewScreen from "../Screens/AccountOverviewScreen";
import TransactionHistoryScreen from "../Screens/TransactionHistory";
import FundTransferScreen from "../Screens/MoneyTransferScreen";
import BillManagementScreen from "../Screens/BillManagementScreen";
/* import CheckDepositScreen from "../Screens/CheckDepositScreen"; */
import MoneyManagementScreen from "../Screens/MoneyManagementScreen";
import BudgetTrackingScreen from "../Screens/BudgetTrackingScreen";
import CustomerSupportScreen from "../Screens/CustomerSupportScreen";
import MpesaScreen from "../Screens/MpesaScreen";
import MoneyTransferScreen from "../Screens/MoneyTransferScreen";
import DepositScreen from "../Screens/DepositScreen";
import RechargeScreen from "../components/Screens/RegarcheScreen";
import TransferScreen from "../Screens/TransferScreen";
const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const { colors } = useTheme();

  const screenOptionStyle = {
    headerStyle: {},
    headerShown: false,
    headerTintColor: colors.primary,
    headerBackTitle: "Back",
  };

  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName={"DashboardScreen"}>
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen options={{ headerShown: false }} name="AccountOverview" component={AccountOverviewScreen} />
      <Stack.Screen options={{ headerShown: false }} name="TransactionHistory" component={TransactionHistoryScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Money" component={MoneyTransferScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Bills" component={BillManagementScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Support" component={CustomerSupportScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ReceiveMoney" component={DepositScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ZuriTill" component={ZuriTillScreen} />
    <Stack.Screen options={{ headerShown: false }} name="Mpesa" component={MpesaScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Airtel" component={airtelScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Recharge" component={RechargeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Transfer" component={RechargeScreen} />
    
    </Stack.Navigator>
  );
}



const LoginStackNavigator = () => {
  const { colors } = useTheme();

  const screenOptionStyle = {
    headerStyle: {},
    headerShown: false,
    headerTintColor: colors.primary,
  };

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}


export{ MainStackNavigator,LoginStackNavigator};
