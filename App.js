import { StyleSheet, Text, View, Image } from 'react-native';
import RootTabNavigator from "./navigation/RootTabNavigator";
import { NavigationContainer } from '@react-navigation/native'; //pour la barre de navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //pour la barre de navigation
import 'firebase/firestore';

export default function App() {

  return (
    <RootTabNavigator/>
  );
}

