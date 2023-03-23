import React from "react";
import { Text, View, Button, Image} from "react-native";
import { useState, useEffect } from 'react';
import styles from "../theme/styles";
import 'firebase/firestore';
import { usersCollection } from '../firebase';
import { getDocs } from "firebase/firestore";

const LoginScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
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
  }

  return (
    <View style={styles.homeContainer}>
      <Text>Page de connexion</Text>
      {users.map((user) => (
        <Text key={user.id}>
          {user.id}, {user.nom}, {user.prénom}, {user.mail},
        </Text> ))}
      <Image style={styles.logo} source={require('../assets/ClearBin_Long.png')}/>
      <Button title="Aller dans l'application" onPress={() => navigation.navigate("Acceuil")} />
    </View>
  );
};

export default LoginScreen;
