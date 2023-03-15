import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import RootTabNavigator from "./navigation/RootTabNavigator";
import { NavigationContainer } from '@react-navigation/native'; //pour la barre de navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //pour la barre de navigation
import 'firebase/firestore';
import { usersCollection } from './firebase';
import { getDocs } from "firebase/firestore";

export default function App() {
  /*const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = [];
        const querySnapshot = await getDocs(usersCollection);
        querySnapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(userList);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }*/

  return (
    <RootTabNavigator/>
    /*<View>
      {users.map((user) => (
        <Text key={user.id}>
          id: {user.id} - nom: {user.nom} - prenom: {user.prénom} - mail: {user.mail},
        </Text>
      ))}
    </View>*/
  );
}

