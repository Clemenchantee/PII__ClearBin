import React from "react";
import { Text, View, ScrollView, ActivityIndicator, StyleSheet , FlatList, TouchableOpacity} from "react-native";
import { useState, useEffect } from 'react';
import Input from "../component/Input";
import 'firebase/firestore';
import { PoubelleCollection } from "../firebase";
import { db } from "../firebase";
import { collection, getDocs, query, where } from 'firebase/firestore';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

//pour afficher les informations de la poubelle dans la Flatlist
const renderPoubelle = ({ item }) => {
  //pour mettre des couleurs associées
  let textColor = "#000"; // couleur par défaut
  if (item.couleur === "Verte") {
    textColor = "green";
  } else if (item.couleur === "Grise") {
    textColor = "#5D5D5D";
  }

  //informations dans la flatList
  return (
    <View style={styles.itemContainer} key={item.id}>
      <View style={styles.itemHeader}>
        <Ionicons name="ios-trash-bin" size={25} color={textColor} style={styles.icon} />
        <Text style={[styles.itemHeaderText, { color: textColor }]}>
          Poubelle {item.couleur}
        </Text>
      </View>
      <Text style={styles.itemRecyclable}>
          {item.recyclable ? "Recyclable" : "Non recyclable"}
      </Text>
      <Text style={styles.itemText}>
        <Text style={styles.itemDescription}>Comment trier ?</Text> {' '}
        {item.FormeTri}
      </Text>
      <Text style={styles.itemDescription}>Description :</Text>
      <Text style={styles.itemText}>{item.description}</Text>
    </View>
  );
};


const InfosScreen = () => {
  const [poubelles, setPoubelles] = useState([]);
  const navigation = useNavigation();

  //requete pour récupérer et afficher mes données 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const poubellesSnapshot = await getDocs(PoubelleCollection);
          const poubellesData = poubellesSnapshot.docs.map((doc) => doc.data());
          setPoubelles(poubellesData);
        } catch (error) {
        }
      };
      fetchData();
    }, []);

  //affichage de la page Acceuil/informations
  return (
    <ScrollView style={[styles.container]}>
      <View >
        <Text style={[styles.titre]}> Bienvenue à Bordeaux</Text>
        <Text style={styles.soustext}> ClearBin est là pour t'aider dans la gestion de tes déchets !</Text>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            navigation.navigate('Recherche'); }}>
        <Text style={styles.question}>Quels déchets souhaites-tu trier ?</Text>
      </TouchableOpacity>
        <Text style={styles.text}>Informations générales </Text>
          <FlatList
            data={poubelles}
            renderItem={renderPoubelle}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContainer}
          />
      </View>
    </ScrollView>
    );
}

export default InfosScreen;

const styles = StyleSheet.create({
  container: { flex: 1},
  titre:{fontWeight: 'bold', fontSize: 35, textAlign: 'center', marginBottom:5, marginTop :20},
  soustext: {fontSize: 20, paddingBottom: 10, textAlign: 'center', marginBottom:10, marginLeft: 10, marginRight : 10},
  text: {fontWeight: 'bold', fontSize: 20, paddingBottom: 10, textAlign: 'center'},
  question : {textDecorationLine: 'underline', textAlign:'center', fontSize: 20, paddingBottom: 10, marginLeft: 15, marginBottom:10},
  inputContainer: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc",
    borderRadius: 20, paddingLeft: 10, paddingRight: 10, height: 40, marginBottom: 5,},
  itemContainer:{ justifyContent:'space-around', marginBottom:15, marginLeft :10, marginRight :10,  backgroundColor:'#FFFF', borderRadius:20 },
  itemHeader:{justifyContent:'center', alignItems:'center', marginBottom :5, marginTop : 10, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'},
  icon: { marginRight: 10,},
  itemHeaderText:{fontSize: 20, fontWeight: 'bold'},
  itemRecyclable:{textAlign:'center', fontSize: 18, fontStyle: 'italic', fontWeight: 'bold', marginBottom :5},
  itemText:{fontSize: 14.5, marginLeft :10, marginRight :10, textAlign: 'center',  marginBottom :5},
  itemDescription: {fontSize: 16, textDecorationLine: 'underline', textAlign: 'center'},
})