import React from "react";
import { StatusBar, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginStackNavigator from "./LoginStackNavigator";
import InfoStackNavigator from "./InfoStackNavigator";
import ProfilStackNavigator from "./ProfilStackNavigator";
import styles from "../theme/styles";

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#469F9A" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Icons will be different if the tab is focused
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Informations") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Profil") {
              iconName = focused ? "ios-list" : "ios-list-outline";
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
        <Tab.Screen name="Connexion" component={LoginStackNavigator} />
        <Tab.Screen name="Informations" component={InfoStackNavigator} />
        <Tab.Screen name="Profil" component={ProfilStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootTabNavigator;