import React from "react";
import { Text, View, Button, Image } from "react-native";
import styles from "../theme/styles";

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.homeContainer}>
      <Image style={styles.logo} source={require('../assets/ClearBin_Long.png')}/>
      <Text>Page de connexion</Text>
      <Button title="Aller dans l'application" onPress={() => navigation.navigate("Acceuil")} />
    </View>
  );
};

export default LoginScreen;
