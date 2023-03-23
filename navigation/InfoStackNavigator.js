import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InfosScreen from "../screens/InfosScreen";
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
const InfoStack = createNativeStackNavigator();

const InfoStackNavigator = () => {
  return (
    <InfoStack.Navigator initialRouteName="Accueil" screenOptions={screenOptions}>
      <InfoStack.Screen
        name="Accueil"
        component={InfosScreen}
        options={{ title: "Accueil" }}
      />
    </InfoStack.Navigator>
  );
};

export default InfoStackNavigator;