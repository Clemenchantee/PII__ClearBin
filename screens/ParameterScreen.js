import React from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import 'firebase/firestore';
import { LocalisationCollection } from "../firebase";
import Input from "../component/Input"; 
import { db } from "../firebase";
import { collection, getDocs, addDoc } from 'firebase/firestore';

const ParameterScreen = () => {
  const [villes, setVilles] = useState([]);
  //nouvelle ville dans la base de données
  const [newVille, setNewVille] = useState("");
  const [villeExistante, setVilleExistante] = useState(false);
  const localisationRef = collection(db, "Localisation");

  //requête pour récupérer la base de données
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Localisation"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        const villes = data.map((item) => item.nomVille);
        setVilles(villes);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  
  const handleSubmit = async (newVille) => {
    try {
      // Vérifier si la ville entrée par l'utilisateur existe déjà dans le tableau
      if (villes.includes(newVille)) {
        setVilleExistante(true);
        return;
      }
  
      // Ajouter la ville dans la base de données
      const docRef = await addDoc(localisationRef, { nomVille: newVille });
      console.log("Ville ajoutée avec succès", docRef);
  
      // Mettre à jour la liste des villes
      setVilles([...villes, newVille]);
  
      // Réinitialiser la ville entrée par l'utilisateur
      setNewVille("");
      setVilleExistante(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ville : ", error);
    }
  };  

  const handleVilleChange = (text) => {
    setNewVille(text);
  };

  return (
    <View style={styles.container}>
        <View  style={styles.containerImage}>
              <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
              <View style={styles.textContainer}>
                  {villes.length > 0 && (
                  <Text style={styles.titre}>
                    Bienvenue à {villes[villes.length - 1]}
                  </Text>
                  )}
              </View>
              <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
        </View>
      
      <View style={styles.paragraphes}>
        <Text style={styles.titre2}>Ajouter une ville </Text>
        <View>
          <Input
              placeholder="Ajoutez une ville"
              onSubmit={handleSubmit}
              onChangeText={handleVilleChange}
              value={villes}
            />
        </View>
      </View>

      <View style={styles.paragraphes}>
        <Text style={styles.titre2} >Vos villes</Text>
              <View>
                   {villes.map((ville, index) => (
                    <Text key={index}> {ville}</Text>
                  ))}
              </View>
      </View>

      <View style={styles.paragraphes}>
        <Text style={styles.titre2}>Mon impact </Text>
        <Text>Merci de trier vos déchets ! C'est une action importante pour l'environnement et cela contribue à un avenir plus durable. Bravo à vous !</Text>
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
  },
});
