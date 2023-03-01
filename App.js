import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import RootTabNavigator from "./navigation/RootTabNavigator";
import { NavigationContainer } from '@react-navigation/native'; //pour la barre de navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //pour la barre de navigation
//import firebase from 'firebase';
//import { db } from './firebase';
//firebase.PIIClearBin();

export default function App() {
  return (
      <RootTabNavigator />  
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'B3DED7',
    alignItems: 'center',
    marginTop : 50,
  }
});
