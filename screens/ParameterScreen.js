import React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image } from "react-native";
import { useState, useEffect } from 'react';
import 'firebase/firestore';
import { usersCollection } from "../firebase";
import { db } from "../firebase";
import { collection, getDocs, query, where } from 'firebase/firestore';
import InfosSearchScreen from "./InfosSearchScreen";

const ParameterScreen = () => {
  const [ville, setVille] = useState("Bordeaux");
  const [rechercheCount, setRechercheCount] = useState(InfosSearchScreen.rechercheCount);
  console.log('recherche', rechercheCount)
  
    //requete pour récupérer et afficher mes données 
      useEffect(() => {
        const fetchData = async () => {
          try {
            const usersSnapshot = await getDocs(usersCollection);
            const usersData = usersSnapshot.docs.map((doc) => doc.data());
            setPoubelles(usersData);
          } catch (error) {
          }
        };
        fetchData();
      }, []);

  const handleVilleChange = (text) => {
    setVille(text);
  };

  const handleSubmit = () => {
    // Ici vous pouvez ajouter le code pour gérer le changement de ville
  };

  return (
    <View style={styles.container}>
        <View  style={styles.containerImage}>
              <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
                <View style={styles.textContainer}>
                  <Text style={styles.titre}>Bienvenue à {ville} </Text>
                </View>
              <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
        </View>
      
      <View style={styles.paragraphes}>
        <Text style={styles.titre2}>Voulez vous changer de ville ? </Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez un nom de ville"
          onChangeText={handleVilleChange}
          value={ville}
        />
        <Button title="Changer de ville" onPress={handleSubmit} />
      </View>

          {/* Ajouter les utilisateurs mais j'en ai pas besoin finalement
      <View style={styles.paragraphes}>
      <Text style={styles.titre2}>Informations sur le profil : </Text>
        {poubelles.map((user, index) => (
        <View key={index}>
          <Text>{user.nom}</Text>
          <Text>{user.prenom}</Text>
          <Text>{user.mail}</Text>
        </View>       
        ))}
      </View> */}

      <View style={styles.paragraphes}>
        <Text style={styles.titre2}>Mon impact </Text>
        <Text>Nombre de recherches effectuées : {rechercheCount}</Text>
      </View>
      
      <View style={styles.paragraphes}>
        <Text style={styles.titre2}>Mentions légales </Text>
        <Text>Made by Clémence Monnier for PII project</Text>
        <Text>Cette application a été conçue dans le cadre d'un projet à l'ENSC</Text>
        <Text>Elle n'est pas commercialisable.</Text>
      </View>
      

    </View>
  );
};

export default ParameterScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#DDF3EF", 
    padding: 10, 
    justifyContent: 'space-around',
  },
  containerImage:{
    backgroundColor: "#DDF3EF",
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop : 10, 
    marginRight :20,
    marginLeft : 20
  },
  image:{
    width: 50, 
    height: 50
  },
  textContainer : {
    flex : 1
  },
  titre: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    marginBottom: 15,
    marginTop: 5,
    color : "#469F9A"
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  titre2:{
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 10,
    color : "#469F9A"
  }, 
  paragraphes:{
    marginTop : 5, 
    marginBottom : 5,
  }
});
