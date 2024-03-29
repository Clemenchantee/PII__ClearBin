import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InfosSearchScreen from "../screens/InfosSearchScreen";
import InfosAddScreen from "../screens/InfosAddScreen";

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
const InfosSearchStack = createNativeStackNavigator();

const InfosSearchStackNavigator = () => {
  return (
    <InfosSearchStack.Navigator initialRouteName="InfosSearch" screenOptions={screenOptions}>
      <InfosSearchStack.Screen
        name="Recherche"
        component={InfosSearchScreen}
        options={{ title: "Recherche" }}
      />
      <InfosSearchStack.Screen
        name="Ajout"
        component={InfosAddScreen}
        options={{ title: "Ajouter des déchets" }}
      />
    </InfosSearchStack.Navigator>
  );
};

export default InfosSearchStackNavigator;