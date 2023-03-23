/*import React from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { useState } from 'react';
import Input from "../component/Input";
import 'firebase/firestore';
import { déchetsCollection } from '../firebase';
import { getDocs, query, where } from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";


const InfosScreen = ({navigation}) => {

  const [loading, setLoading] = useState(false);
  const [déchets, setDechets] = useState([]);

  const searchDechets = async (name) => {
    setLoading(true);

    //requête bdd firestore
    const q = query(déchetsCollection, where("nomDéchets", "==", name));
    const querySnapshot = await getDocs(q);
    const data = [];

    querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const { description, Poubelle } = docData;
        data.push({ description, Poubelle });
    });

    setDechets(data);
    setLoading(false);
};

  let mainComponent;
  if (loading)
    mainComponent = (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );

  //voir cocktail search screen pour le else
  const ResultList = ({data}) => {
      <View>
        {data.map((item, index) => (
          <View key={index}>
            <Text>{item.description}</Text>
            <Text>{item.Poubelle}</Text>
          </View>
        ))}
      </View>
  }
  
  {déchets.length > 0 && <ResultList data={déchets} />}

  return (
      <View style={[styles.container]}>
        <Text style={[styles.titre]}> Bienvenue à Bordeaux :))</Text>
        <Text style={styles.text}>ClearBin est là pour t'aider dans la gestion de tes déchets !</Text>
        <Text style={styles.question}>Quels déchets souhaites-tu trier ?</Text>
        <Input style= {styles.inputContainer}
          placeholder="Entrer un nom de déchet"
          onSubmit={searchDechets}
          renderLeftAccessory={() => (<Ionicons name="search-circle-outline" size={25} />)}/> 
          {data.map((item, index) => (
          <View key={index}>
            <Text>{item.description}</Text>
            <Text>{item.Poubelle}</Text>
          </View>
        ))}
      </View>
    );
  };

export default InfosScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  titre:{fontSize: 40, textAlign: 'center', marginBottom:20}, 
  text: { fontSize: 18, paddingBottom: 10, textAlign: 'center', marginBottom:20},
  question : { fontSize: 16, paddingBottom: 10 },
  inputContainer: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc",
    borderRadius: 20, paddingLeft: 10, paddingRight: 10, height: 40, marginBottom: 10,},
})*/

import React from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { useState } from 'react';
import Input from "../component/Input";
import 'firebase/firestore';
import { déchetsCollection } from '../firebase';
import { getDocs, query, where } from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";

const InfosScreen = ({navigation}) => {

  const [loading, setLoading] = useState(false);
  const [déchets, setDechets] = useState([]);

  const searchDechets = async (name) => {
    setLoading(true);

    //requête bdd firestore
    const q = query(déchetsCollection, where("nomDéchets", "==", name));
    const querySnapshot = await getDocs(q);
    const data = [];

    querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const { description, Poubelle } = docData;
        data.push({ description, Poubelle });
    });

    setDechets(data);
    setLoading(false);
  };

  let mainComponent;
  if (loading) {
    mainComponent = (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    mainComponent = (
      <>
        {déchets.length > 0 && <ResultList data={déchets} />}
        <Input style={styles.inputContainer}
          placeholder="Entrer un nom de déchet"
          onSubmitEditing={({ nativeEvent: { text } }) => searchDechets(text)}
          renderLeftAccessory={() => (<Ionicons name="search-circle-outline" size={25} />)}
        />
      </>
    );
  }

  return (
    <View style={[styles.container]}>
      <Text style={[styles.titre]}> Bienvenue à Bordeaux :))</Text>
      <Text style={styles.text}>ClearBin est là pour t'aider dans la gestion de tes déchets !</Text>
      <Text style={styles.question}>Quels déchets souhaites-tu trier ?</Text>
      {mainComponent}
    </View>
  );
};

const ResultList = ({data}) => {
  return (
    <View>
      {data.map((item, index) => (
        <View key={index}>
          <Text>{item.description}</Text>
          <Text>{item.Poubelle}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  titre:{fontSize: 40, textAlign: 'center', marginBottom:20}, 
  text: { fontSize: 18, paddingBottom: 10, textAlign: 'center', marginBottom:20},
  question : { fontSize: 16, paddingBottom: 10 },
  inputContainer: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc",
    borderRadius: 20, paddingLeft: 10, paddingRight: 10}
  })
