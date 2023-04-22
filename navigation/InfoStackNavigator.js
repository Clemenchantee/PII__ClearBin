import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InfosScreen from "../screens/InfosScreen";
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
const InfoStack = createNativeStackNavigator();

const InfoStackNavigator = () => {
  return (
    <InfoStack.Navigator initialRouteName="Accueil" screenOptions={screenOptions}>
      <InfoStack.Screen
        name="Accueil"
        component={InfosScreen}
        options={{ title: "Accueil" }}
      />
      <InfoStack.Screen
        name="Recherche"
        component={InfosSearchScreen}
        options={{ title: "Recherche" }}
      />
      <InfoStack.Screen
        name="Ajout"
        component={InfosAddScreen}
        options={{ title: "Ajouter des déchets" }}
      />
    </InfoStack.Navigator>
  );
};

export default InfoStackNavigator;