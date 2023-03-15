import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilScreen from "../screens/ProfilScreen";
import { screenOptions } from "../theme/styles";

// Screen stack for settings tab
const ProfilStack = createNativeStackNavigator();

const ProfilStackNavigator = () => {
  return (
    <ProfilStack.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
    >
      <ProfilStack.Screen name="Mon Profil" component={ProfilScreen} />
    </ProfilStack.Navigator>
  );
};

export default ProfilStackNavigator;