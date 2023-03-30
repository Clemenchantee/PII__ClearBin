import React from "react";
import { Text, View, ActivityIndicator, StyleSheet , FlatList} from "react-native";
import { useState, useEffect } from 'react';
import Input from "../component/Input";
import 'firebase/firestore';
import { déchetsCollection } from '../firebase';
import { PoubelleCollection } from "../firebase";
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Ionicons from "react-native-vector-icons/Ionicons";

const InfosScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const searchDechets = async (name) => {
    setLoading(true);

    //requête bdd firestore
    const q = query(déchetsCollection, where("nomDéchets", "==", name));
    const querySnapshot = await getDocs(q);
    console.log('querySnapshot',querySnapshot)
    // Récupérer le document de déchets correspondant au nom recherché
    /*const querySnapshot = await db.collection('déchets').where('nomDéchets', '==', name).get(); */
    const results = [];

   //requête pour trouver les déchets 
    querySnapshot.forEach((doc) => {
        const docdéchets = doc.data();
        const { description, Poubelle, nomDéchets } = docdéchets;
        if (nomDéchets == name) {
          const poubelle = docdéchets.bac.couleur; // récupère la couleur du bas associé
          results.push({ description, Poubelle: `couleur: ${poubelle}` });
        }
    });

    console.log('results', results);
    console.log(`Nombre de résultats trouvés : ${results.length}`);

    setResults(results);
    setLoading(false);
  };

  let mainComponent;
  if (loading) {
    mainComponent = (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  //requête pour afficher les poubelles
  const PoubelleScreen = () => {
    const [poubelles, setPoubelles] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const poubellesSnapshot = await PoubelleCollection.get();
        const poubellesData = poubellesSnapshot.docs.map((doc) => doc.data());
        setPoubelles(poubellesData);
      };
      fetchData();
    }, []);
  
    const renderPoubelle = ({ item }) => (
      <View>
        <Text>{item.couleur}</Text>
        <Text>{item.description}</Text>
        <Text>{item.formeTri}</Text>
        <Text>{item.recyclable}</Text>
      </View>
    );
    }

  return (
      <View style={[styles.container]}>
        <Text style={[styles.titre]}> Bienvenue à Bordeaux :))</Text>
        <Text style={styles.text}> ClearBin est là pour t'aider dans la gestion de tes déchets !</Text>
        <Text style={styles.question}>Quels déchets souhaites-tu trier ?</Text>
        <Input style={styles.inputContainer}
          placeholder="Entrer un nom de déchet"
          onSubmit={searchDechets}
          renderLeftAccessory={() => (<Ionicons name="search-circle-outline" size={25} />)}/> 
           {results.map((item, index) => (
          <View key={index}>
            <Text>{item.description}</Text>
            <Text>{item.Poubelle}</Text>
          </View>
           ))}
        <Text style={styles.text}> Informations générales </Text>
        <FlatList
          data={poubelles}
          renderItem={renderPoubelle}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
}



export default InfosScreen;

const styles = StyleSheet.create({
  container: { flex: 1},
  titre:{fontSize: 40, textAlign: 'center', marginBottom:20}, 
  text: { fontSize: 18, paddingBottom: 10, textAlign: 'center', marginBottom:20, marginLeft: 10, marginRight : 10},
  question : { fontSize: 16, paddingBottom: 10, marginLeft: 15},
  inputContainer: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc",
    borderRadius: 20, paddingLeft: 10, paddingRight: 10, height: 40, marginBottom: 10,},
})

