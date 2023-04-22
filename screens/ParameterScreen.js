import React from 'react';
import { Text, View, StyleSheet, Alert, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import 'firebase/firestore';
import Input from "../component/Input"; 
import { db } from "../firebase";
import { collection, getDocs, addDoc } from 'firebase/firestore';

const ParameterScreen = ({navigation}) => {
  const [villes, setVilles] = useState([]);
  //nouvelle ville dans la base de données
  const [newVille, setNewVille] = useState("");
  const [villeExistante, setVilleExistante] = useState(false);
  const [villeSelectionnee, setVilleSelectionnee] = useState("");
  //autre moyen d'importer ma collection Localisation
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
        Alert.alert("Alerte", "Cette ville a déjà été ajoutée.");
        return;
      }
  
      // Ajouter la ville dans la base de données
      const docRef = await addDoc(localisationRef, { nomVille: newVille });
  
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

  // pour afficher la ville cliquée 
  const handleVilleClick = (ville) => {
    setVilleSelectionnee(ville);
  };
  

  return (
    <ScrollView style={styles.container}>
    <View>
        <View  style={styles.containerImage}>
              <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
              <View style={styles.textContainer}>
                  {villes.length > 0 && (
                  <Text style={styles.titre}>
                  Bienvenue à {villeSelectionnee ? villeSelectionnee : villes[villes.length - 1]}
                </Text>                
                  )}
              </View>
              <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
        </View>
      
      <View style={styles.paragraphes}>
      <View style={styles.icon}>
        <Ionicons name="add-circle-outline" size={30} color='#0E5CAD' />
        <Text style={styles.titre2}>Ajouter une ville </Text>
      </View>  
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="home-outline" size={35} color='gray' />
          </View>
          <Input
              placeholder="Ajoutez une ville"
              onSubmit={handleSubmit}
              onChangeText={handleVilleChange}
              value={villes}
            />
        </View>
      </View>

      <View style={styles.paragraphes}>
        <View style={styles.icon}>
          <Ionicons name="business-outline" size={30} color='#0E5CAD' />
          <Text style={styles.titre2}>Vos villes</Text>
        </View>
        <Text style={styles.text} >Vous pouvez changer de ville en cliquant sur la ville souhaitée : </Text>
        <View>
          {villes.map((ville, index) => (
            <TouchableOpacity key={index} onPress={() => handleVilleClick(ville)}>
              <Text  style={styles.villeSelect}> {"\u2022"} {ville}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.paragraphes}>
        <View  style={styles.icon}>
          <Ionicons name="leaf-outline" size={30} color='#0E5CAD' />
          <Text style={styles.titre2}>Mon impact </Text>
        </View>
        <Text style={styles.text}>Merci de trier vos déchets ! C'est une action importante pour l'environnement et cela contribue à un avenir plus durable. Bravo à vous !</Text>
      </View>
      
      <View style={styles.paragraphes}>
        <View  style={styles.icon}> 
          <Ionicons name="folder-outline" size={30} color='#0E5CAD' />
          <Text style={styles.titre2}>Mentions légales </Text>
        </View>
        <Text style={styles.text}>Made by Clémence Monnier for PII project</Text>
        <Text style={styles.text}>Cette application a été conçue dans le cadre d'un projet à l'ENSC</Text>
        <Text style={styles.text}>Elle n'est pas commercialisable.</Text>
      </View>
    </View>
    </ScrollView>
  );
};

export default ParameterScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#DDF3EF", 
    padding: 10, 
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
    paddingBottom: 5,
    color:"#0E5CAD",
    marginLeft : 5,
  }, 
  paragraphes:{
    marginTop : 5, 
    marginBottom : 10,
  },
  villeSelect : {
    marginLeft : 10 ,
    fontSize : 16, 
    textDecorationLine: 'underline',
    fontStyle : "italic" 
  }, 
  text : {
    fontSize : 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    alignItems: 'center',
  },
  icon : {
    flexDirection: 'row',
  }
});
