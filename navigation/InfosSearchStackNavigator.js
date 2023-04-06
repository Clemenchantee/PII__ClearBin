import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InfosSearchScreen from "../screens/InfosSearchScreen";
//import { screenOptions } from "../theme/styles";

const screenOptions = {
  headerStyle: {
    backgroundColor: "#469F9A",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  logoCarre : {height: 50, width: 50}
};

// Screen stack for home tab
const InfosSearchStack = createNativeStackNavigator();

const InfosSearchStackNavigator = () => {
  return (
    <InfosSearchStack.Navigator initialRouteName="InfosSearch" screenOptions={screenOptions}>
      <InfosSearchStack.Screen
        name="Recherche"
        component={InfosSearchScreen}
        options={{ title: "Recherche" }}
      />
    </InfosSearchStack.Navigator>
  );
};

export default InfosSearchStackNavigator;