import React from "react";
import { Text, View, Button, Image } from "react-native";
import styles from "../theme/styles";
import Authentification from "../component/Authentification";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homeContainer}>
      <Text> Page d'acceuil et de connection </Text>
      <Text style={styles.police}> Bienvenue sur ClearBin ! </Text>
      <Authentification></Authentification>
      <Button style={styles.boutonRenseignement}
        title="Se renseigner sur la gestion des déchets"
        onPress={() => navigation.navigate("Infos")}
      />
    </View>
  );
};

export default HomeScreen;