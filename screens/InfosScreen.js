import React from "react";
import { Text, View, ScrollView, ActivityIndicator, StyleSheet , FlatList, TouchableOpacity, Image} from "react-native";
import { useState, useEffect } from 'react';
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
  if (item.bac === "Verte") {
    textColor = "green";
  } else if (item.bac === "Grise") {
    textColor = "#5D5D5D";
  } else if (item.bac === "Compost") {
    textColor = "#469F9A";
  } 

  //informations dans la flatList
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Ionicons name="ios-trash-bin" size={25} color={textColor} style={styles.icon} />
        <Text style={[styles.itemHeaderText, { color: textColor }]}>
          Poubelle {item.bac}
        </Text>
      </View>
      <Text style={styles.itemRecyclable}>
          {item.recyclable ? "Recyclable" : "Non recyclable"}
      </Text>
      <Text style={styles.itemText}>
        <Text style={styles.itemDescription}>Comment trier ?</Text> {' '}
        {item.FormeTri}
      </Text>
      <Text style={styles.itemText}>
        <Text style={styles.itemDescription}>Que mettre dans cette poubelle ?</Text> {' '}
        {item.contenant}
      </Text>
      <Text style={styles.itemText}>
        <Text style={styles.itemDescription}>Jour de sortie</Text> {' '}
        {item.jour}
      </Text>
      <Text style={styles.itemText}>
        <Text style={styles.itemDescription}>Heure de sortie</Text> {' '}
        {item.heure}
      </Text>
      <Text style={styles.itemDescription}>Description :</Text>
      <Text style={styles.itemText}>{item.description}</Text>
    </View>
  );
};


const InfosScreen = () => {
  const [poubelles, setPoubelles] = useState([]);
  const navigation = useNavigation();

  //requete pour récupérer mes données de la table Poubelle 
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
    <ScrollView style={styles.container}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.titre}>Bienvenue à Bordeaux</Text>
          </View>
        <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
      </View>
      <Text style={styles.soustext}> ClearBin est là pour t'aider dans la gestion de tes déchets !</Text>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate('Recherche'); }}>
      <Text style={styles.question}>Clique ici si tu veux savoir comment trier tes déchets</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Informations générales </Text>
      <FlatList
        data={poubelles} //afficher mes données de la table poubelle
        renderItem={renderPoubelle}
        keyExtractor={(item) => item.bac}
        contentContainerStyle={styles.flatListContainer}
        nestedScrollEnabled //pour pouvoir scroller la page entière
      />
    </ScrollView>
  );  
}

export default InfosScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:"#DDF3EF",
    padding: 10 
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
  titre:{
    fontWeight: 'bold', 
    fontSize: 35, 
    textAlign: 'center', 
    marginBottom: 10, 
    marginTop :5, 
    color : "#469F9A",
  },
  soustext: {
    fontSize: 20, 
    paddingBottom: 10, 
    textAlign: 'center', 
    marginBottom:10, 
    padding : 10
  },
  text: {
    fontWeight: 'bold', 
    fontSize: 20, 
    paddingBottom: 10,
    textAlign: 'center',
    color : "#0E5CAD"
  },
  question : {
    textDecorationLine: 'underline', 
    textAlign:'center', 
    fontStyle: 'italic', 
    fontSize: 20, 
    paddingBottom: 10, 
    marginBottom:10
  },
  inputContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    paddingLeft: 10, 
    paddingRight: 10, 
    height: 40, 
    marginBottom: 5,
  },
  itemContainer:{ 
    justifyContent:'space-around', 
    marginBottom:15, 
    padding:10, 
    backgroundColor:'#FFFF', 
    borderRadius:20,
    borderWidth: 2, 
    borderColor: "#0E5CAD", 
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
  itemHeaderText:{
    fontSize: 20, 
    fontWeight: 'bold'
  },
  itemRecyclable:{
    textAlign:'center', 
    fontSize: 18, 
    fontStyle: 'italic', 
    fontWeight: 'bold', 
    marginBottom :5
},
  itemText:{
    fontSize: 14.5, 
    padding: 10,
    textAlign: 'center',  
    marginBottom :5
  },
  itemDescription: {
    fontSize: 16, 
    textDecorationLine: 'underline', 
    textAlign: 'center'
  },
})