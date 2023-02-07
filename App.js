import * as React from "react";
import './polyfiles.ts'
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/loginscreen";
import RegisterScreen from "./screens/register";

import DrawerNavigator from "./navigation/drawernavigator.js";

import firebase from "firebase";
import { firebaseConfig } from "./config";
import WatchDetails from './screens/watchdetails'
import BottomTabNavigator from './navigation/tabnavigator'
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Stack = createStackNavigator();

const StackNav = () => {
  return(
  <Stack.Navigator initialRouteName="Login"  screenOptions={{
    headerShown: false,
    gestureEnabled: false
  }}>
   <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="Dashboard" component={DrawerNavigator} />
  </Stack.Navigator>)
}

export default function App() {
  return (
 <NavigationContainer>
  <StackNav/>
 </NavigationContainer>
//<WatchDetails/>

  )
}

