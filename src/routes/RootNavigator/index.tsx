import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AppStack from "../AppStack";

const RootNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"#EFF4F8"} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppStack" component={AppStack} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
