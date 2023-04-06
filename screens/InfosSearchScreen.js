import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Input from "../component/Input";
import 'firebase/firestore';
import { déchetsCollection } from '../firebase';
import Ionicons from "react-native-vector-icons/Ionicons";
import { collection, getDocs, query, where } from 'firebase/firestore';

const InfosSearchScreen = ({ navigation }) => {
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
        console.log({docdéchets})
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
  if (loading)
    mainComponent = (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default InfosSearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1},
  titre:{fontSize: 40, textAlign: 'center', marginBottom:20}, 
  text: { fontSize: 18, paddingBottom: 10, textAlign: 'center', marginBottom:20, marginLeft: 10, marginRight : 10},
  question : { fontSize: 16, paddingBottom: 10, marginLeft: 15},
  inputContainer: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc",
    borderRadius: 20, paddingLeft: 10, paddingRight: 10, height: 40, marginBottom: 10,},
})