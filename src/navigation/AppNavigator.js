import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import HomeScreen from '../screens/HomeScreen';


import CustomerScreen from '../screens/CustomerScreen';
import ItemScreen from '../screens/ItemScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardTabNavigator = () => (
  <Tab.Navigator>
  <Tab.Screen
    name="Dashboard"
    component={HomeScreen}
    options={{
      tabBarLabel: 'Dashboard',
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="view-dashboard-outline" color={color} size={26} />
      ),
      headerTitleAlign: 'center',
      headerTitleStyle: { 
        fontWeight: 'bold',
      },
    }}
  />
  <Tab.Screen
    name="Customers"
    component={CustomerScreen}
    options={{
      tabBarLabel: 'Customers',
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="account-group-outline" color={color} size={26} />
      ),
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  />
  <Tab.Screen
    name="Item"
    component={ItemScreen}
    options={{
      tabBarLabel: 'Item',
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="shopping-outline" color={color} size={26} />
      ),
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  />
</Tab.Navigator>
);

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Dashboard" component={DashboardScreen}  />
    <Stack.Screen name="DashboardTabs" component={DashboardTabNavigator} />
  </Stack.Navigator>
);

export default StackNavigator;
