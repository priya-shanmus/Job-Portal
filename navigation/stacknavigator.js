import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./tabnavigator";
import WatchDetails from "../screens/watchdetails";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
    <Stack.Screen name = 'Home' component= {BottomTabNavigator}/>
      <Stack.Screen name="WatchDetails" component={WatchDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
