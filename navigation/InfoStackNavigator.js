import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InfosScreen from "../screens/InfosScreen";
import { screenOptions } from "../theme/styles";

// Screen stack for home tab
const InfoStack = createNativeStackNavigator();

const InfoStackNavigator = () => {
  return (
    <InfoStack.Navigator initialRouteName="Acceuil" screenOptions={screenOptions}>
      <InfoStack.Screen
        name="Acceuil"
        component={InfosScreen}
        options={{ title: "Acceuil" }}
      />
    </InfoStack.Navigator>
  );
};

export default InfoStackNavigator;