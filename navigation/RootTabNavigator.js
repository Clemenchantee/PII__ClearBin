import React from "react";
import { StatusBar, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen.js";
import InfoStackNavigator from "./InfoStackNavigator";
import InfosSearchStackNavigator from "./InfosSearchStackNavigator";
import ParameterStackNavigator from "./ParameterStackNavigator";
import styles from "../theme/styles";

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#469F9A" />
      <Tab.Navigator
        initialRouteName="Connexion" // spécifie que la page de connexion sera affichée en premier
        screenOptions={({ route }) => ({
          // Icons will be different if the tab is focused
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Informations") {
              iconName = focused
                ? "ios-home"
                : "ios-home-outline";
            } else if (route.name === "Paramètres") {
              iconName = focused ? "ios-settings" : "ios-settings-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#469F9A",
          tabBarInactiveTintColor: "gray",
          // Hiding tab navigator header to show only stack header
            headerShown: false,
            headerLeft: () => ( //marche pas à revoir
             <Image
              source={require("../assets/ClearBin_App.png")}/>),     
            })}
      >
        <Tab.Screen name="Informations" component={InfoStackNavigator} />
        <Tab.Screen name="Paramètres" component={ParameterStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootTabNavigator;