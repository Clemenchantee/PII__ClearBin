import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import Input from "../component/Input";
import 'firebase/firestore';
import { déchetsCollection, PoubelleCollection } from '../firebase';
import Ionicons from "react-native-vector-icons/Ionicons";
import { db, collection, doc, firebase, getDocs, query, where } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";

const InfosSearchScreen = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [name, setName] = useState('');
  const [poubelles, setPoubelles] = useState([]);
  const navigation = useNavigation();

    //requete pour récupérer mes données de la table Poubelle 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const poubellesSnapshot = await getDocs(PoubelleCollection);
          const poubellesData = poubellesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setPoubelles(poubellesData);
        } catch (error) {
        }
      };
      fetchData();
    }, []);
    
    //requête pour rechercher mes déchets avec l'input
    const searchDechets = async (name) => {
      setLoading(true);
      //pour récupérer le nom du déchet 
      setName(name);

      //requête bdd firestore
      const q = query(déchetsCollection, where("nomDéchets", "==", name));
      const querySnapshot = await getDocs(q);
      const results = [];

      //requête pour trouver les déchets et récupérer l'identifiant de la poubelle associée
      querySnapshot.forEach((doc) => {
        const docdéchets = doc.data();
        const { description, nomDéchets } = docdéchets;
        const poubelleRef = docdéchets.bac;//récupère la référence dans la table déchets
        const poubelleId = poubelleRef.id; //récupère l'id dans la référence dans la table déchet
        
        // rechercher la poubelle correspondante dans la liste des poubelles
        const poubelle = poubelles.find((poubelle) => poubelle.id === poubelleId);
  
        if (poubelle) {
          const poubelleCouleur = poubelle.bac;
          const poubelleJour = poubelle.jour;
          const poubelleHeure = poubelle.heure;
          const poubelleConseil = poubelle.conseil;
          results.push({ name, description, poubelleCouleur, poubelleJour, poubelleHeure, poubelleConseil});
        } else {
          console.log(`La poubelle avec l'id ${poubelleId} n'a pas été trouvée.`);
        }
      });

      setLoading(false);
      setResults(results);
 }
    

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
        <Ionicons name="search-circle-outline" size={40} color='gray' />
      </View>
      <Input
        placeholder="Entrer un nom de déchet"
        onSubmit={searchDechets}
        style={styles.input}
      />
    </View>
    {loading ? (
      <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
    ) : results.length === 0 ? (
            <Text style={styles.noResults}>Pas de résultats</Text>
    ) : (
      results.map((item, index) => (
        <View style={styles.reponses} key={index}>
          <Text style={styles.nomdéchet}>Déchet : {name} </Text>
          {item.description ? (
            <>
              <View style={styles.itemHeader}>
                <Ionicons name="ios-trash-bin" size={25} color={'#0E5CAD'} style={styles.icon} />
                <Text style={styles.PoubelleConcernee}>Poubelle concernée : </Text>
              </View>
              <Text style={styles.poubelle}>{item.poubelleCouleur}</Text>
              <Text style={styles.descReponses}>Description du déchet : </Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.descReponses}>Rappel sortie : </Text>
              <Text style={styles.description}>{item.poubelleJour}</Text>
              <Text style={styles.description}>{item.poubelleHeure}</Text>
              <Text style={styles.description}>{item.poubelleConseil}</Text>
            </>
          ) : (
            <Text style={styles.noResults}>Nous ne savons pas comment trier ce déchet</Text>
          )}
        </View>
      ))
    )}
  </View>
);
};

export default InfosSearchScreen;

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
    fontSize: 25,
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
    textAlign: "center",
    marginBottom: 1, 
    textDecorationLine : 'underline',
    color : "#0E5CAD"
  }, 
  noResults : {
    textAlign: "center",
    fontSize: 20,
    marginTop: 10
  }, 
  nomdéchet :{
    fontSize: 20,
    textAlign: "center",
    marginTop: 10, 
    marginBottom : 10, 
    fontWeight: 'bold', 
    color : "#0E5CAD"
  }, 
  itemHeader:{
    justifyContent:'center',
    alignItems:'center', 
    marginBottom :5, 
    marginTop : 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    flexWrap: 'wrap'
  },
  icon: { 
    marginRight: 10,
  },
  PoubelleConcernee : {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 1, 
    textDecorationLine : 'underline',
    color : "#0E5CAD"
  },
});