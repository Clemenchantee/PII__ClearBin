import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import InfosScreen from "../screens/InfosScreen";
import { screenOptions } from "../theme/styles";

// Screen stack for home tab
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Acceuil" }}
      />
      <HomeStack.Screen name="Infos" component={InfosScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;