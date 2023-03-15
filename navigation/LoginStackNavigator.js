import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import InfosScreen from "../screens/InfosScreen";
import { screenOptions } from "../theme/styles";

// Screen stack for home tab
const LoginStack = createNativeStackNavigator();

const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator initialRouteName="Connexion" screenOptions={screenOptions}>
      <LoginStack.Screen
        name="Connexion"
        component={LoginScreen}
        options={{ title: "Connexion" }}
      />
    </LoginStack.Navigator>
  );
};

export default LoginStackNavigator;