import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddInfosScreen from "../screens/AddInfosScreen";

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
const AddInfosStack = createNativeStackNavigator();

const AddInfosStackNavigator = () => {
  return (
    <AddInfosStack.Navigator initialRouteName="AddInfos" screenOptions={screenOptions}>
      <AddInfosStack.Screen
        name="AjoutInfos"
        component={AddInfosScreen}
        options={{ title: "AjoutInfos" }}
      />
    </AddInfosStack.Navigator>
  );
};

export default AddInfosStackNavigator;