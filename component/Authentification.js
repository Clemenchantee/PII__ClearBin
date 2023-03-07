import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from "react-native";
import { useState } from 'react';
import Input from "./Input";
import authenticateUser from "../api/authentification";
import styles from "../theme/styles";

const Authentification = ({ onSubmit, errorMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const signIn = () => {
      const user = authenticateUser(email, password);
      let msg = user !== null ? "Connexion réussie" : "Erreur de connexion";
      msg += ` avec les identifiants : ${email + "/" + password}`;
      Alert.alert("Action sélectionnée", msg);
    };
  
    const resetPassword = () => {
      Alert.alert("Action sélectionnée", "Mise à jour du mot de passe");
    };
  
    const signUp = () => {
      Alert.alert("Action sélectionnée", "Inscription");
    };

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/ClearBin_Long.png')} />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Input
          placeholder="Mot de passe"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity   style={[styles.buttonContainer, styles.signInButton]} onPress={signIn}>
          <Text style={styles.buttonText}>Se Connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress ={resetPassword}>
        <Text>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress ={signUp}>
        <Text>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    );
  }
;

export default Authentification;