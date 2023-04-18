import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import Input from "../component/Input";
import 'firebase/firestore';
import { déchetsCollection, PoubelleCollection } from '../firebase';
import Ionicons from "react-native-vector-icons/Ionicons";
import { collection, doc, getDocs, query, where } from 'firebase/firestore';

const InfosSearchScreen = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [rechercheCount, setRechercheCount] = useState(0);

    const searchDechets = async (name) => {
      setLoading(true);

      //requete qui marche sans la couleur de poubelle
      /*
          //requête bdd firestore
    const q = query(déchetsCollection, where("nomDéchets", "==", name));
    const querySnapshot = await getDocs(q);
    // Récupérer le document de déchets correspondant au nom recherché
    const results = [];

    //requête pour trouver les déchets 
    querySnapshot.forEach((doc) => {
      const docdéchets = doc.data();
      const { description, Poubelle, nomDéchets } = docdéchets;
      if (nomDéchets == name) {
        const poubelle = docdéchets.bac.couleur; // récupère la couleur du bas associé
        results.push({ description, Poubelle: `couleur: ${poubelle}` });
      }
    });*/
    
      //requête bdd firestore
      const q = query(déchetsCollection, where("nomDéchets", "==", name));
      const querySnapshot = await getDocs(q);
      const results = [];
      console.log('results', results)
    
      //requête pour trouver les déchets 
      querySnapshot.forEach(async (doc) => {
        const docdéchets = doc.data();
        const { description, Poubelle, nomDéchets } = docdéchets;
        if (nomDéchets === name) {
          // récupère la référence à la poubelle
          const poubelleRef = docdéchets.bac;
          console.log('poubelleRef', poubelleRef)
          // récupère les données de la poubelle
          const poubelleSnapshot = await getDocs(poubelleRef);
          console.log('poubelleSnapchot', poubelleSnapshot)
          const poubelleData = poubelleSnapshot.data();
          console.log('poubelleData', poubelleData)
          // extrait la couleur de la poubelle
          const poubelleCouleur = poubelleData.couleur;
          console.log('poubelleCouleur', poubelleCouleur)
          results.push({ description, Poubelle: `couleur: ${poubelleCouleur}` });
          console.log('results2', results)
        }
      });
    
      // augmenter le compteur de recherche pour l'afficher dans mes paramètres
      setRechercheCount(rechercheCount + 1);
      console.log('nb',rechercheCount)
    
      setResults(results);
      setLoading(false);
    };    

  return (
    <View style={styles.container}>
      <View  style={styles.containerImage}>
            <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
              <View style={styles.textContainer}>
              <Text style={styles.question}>Quels déchets souhaites-tu trier ?</Text>
              </View>
            <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
      </View>
      <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="search-circle-outline" size={30} color='gray' />
          </View>
          <Input
            placeholder="Entrer un nom de déchet"
            onSubmit={searchDechets}
            style={styles.input}
          />
      </View>
    {results.map((item, index) => (
        <View style={styles.reponses} key={index}>
          <Text style={styles.descReponses}>Poubelle concernée : </Text>
          <Text style={styles.poubelle}>{item.Poubelle}</Text>
          <Text style={styles.descReponses}>Description du déchet : </Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDF3EF", 
    padding: 10 
  },
  containerImage:{
    backgroundColor: "#DDF3EF",
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop : 10, 
    padding : 10
  },
  image:{
    width: 50, 
    height: 50
  },
  textContainer : {
    flex : 1
  },
  question: {
    fontSize: 25,
    paddingBottom: 10,
    marginBottom: 5,
    marginTop: 10,
    textAlign: "center"
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
  input: {
    fontSize: 18,
    marginLeft: 5,
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  },
  poubelle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  },
  descReponses: {
    fontSize: 20,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 1
  }, 
  
});

export default InfosSearchScreen;
