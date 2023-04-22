import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
const InfosAddStack = createNativeStackNavigator();

const InfosAddStackNavigator = () => {
  return (
    <InfosAddStack.Navigator initialRouteName="InfosAdd" screenOptions={screenOptions}>
      <InfosAddStack.Screen
        name="Ajout"
        component={InfosAddScreen}
        options={{ title: "Ajouter des déchets" }}
      />
    </InfosAddStack.Navigator>
  );
};

export default InfosAddStackNavigator;