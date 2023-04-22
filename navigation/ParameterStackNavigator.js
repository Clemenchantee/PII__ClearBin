import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ParameterScreen from "../screens/ParameterScreen";

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

// Screen stack for settings tab
const ParameterStack = createNativeStackNavigator();

const ParameterStackNavigator = () => {
  return (
    <ParameterStack.Navigator 
      initialRouteName="Parameter"
      screenOptions={screenOptions}
    >
      <ParameterStack.Screen name="Paramètres " component={ParameterScreen} />
    </ParameterStack.Navigator>
  );
};

export default ParameterStackNavigator;