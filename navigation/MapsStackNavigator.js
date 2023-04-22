import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapsScreen from "../screens/MapsScreen";

const screenOptions = {
  headerStyle: {
    backgroundColor: "#469F9A",
  },
  headerTintColor: "#DDF3EF",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  logoCarre : {height: 50, width: 50}
};

// Screen stack for home tab
const MapsStack = createNativeStackNavigator();

const MapsStackNavigator = () => {
  return (
    <MapsStack.Navigator initialRouteName="Maps" screenOptions={screenOptions}>
      <MapsStack.Screen
        name="Cartes"
        component={MapsScreen}
        options={{ title: "Carte des bornes de verre" }}
      />
    </MapsStack.Navigator>
  );
};

export default MapsStackNavigator;