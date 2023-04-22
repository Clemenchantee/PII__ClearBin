import React from "react";
import { Text, View, Image, StyleSheet, TextInput, Switch, Button, ScrollView} from "react-native";
import {Picker} from '@react-native-picker/picker';
import Ionicons from "react-native-vector-icons/Ionicons";
import 'firebase/firestore';
import { useState, useEffect } from 'react';
import { déchetsCollection, PoubelleCollection } from '../firebase';
import { getDocs, query, where, addDoc, doc } from 'firebase/firestore';

const InfosAddScreen = () => {
    const [nomDéchets, setNomDéchets] = useState('');
    const [description, setDescription] = useState('');
    const [danger, setDanger] = useState(false);
    const [selectedBac, setSelectedBac] = useState(null);
    const [bacs, setBacs] = useState([]);
  
    useEffect(() => {
        // Fonction pour récupérer les bacs de la collection Poubelle
        const getBacs = async () => {
            try {
              const querySnapshot = await getDocs(PoubelleCollection);
              const data = querySnapshot.docs.map((doc) => doc.data());
              const bacs = data.map((item) => ({ nom: item.bac, value: item.id }));
              setBacs(bacs);
            } catch (error) {
              console.log("Error fetching data: ", error);
            }
          };
        getBacs();
      }, []);
      
  
    const handleSubmit = async () => {
      try {
        const nouveauDéchet = {
          nomDéchets: nomDéchets,
          description: description,
          danger: danger,
          poubelleRef: selectedBac ? PoubelleCollection.doc(selectedBac) : null // marche pas

        };
        await addDoc(déchetsCollection, nouveauDéchet);
        setNomDéchets('');
        setDescription('');
        setDanger(false);
        setSelectedBac(null);
        alert('Déchet ajouté avec succès ! ');
      } catch (error) {
        console.error("Erreur lors de l'ajout de déchet : ", error);
        alert("Erreur lors de l'ajout de déchet");
      }
    };
  
    return (
    <ScrollView>
      <View style={styles.container}>
        <View  style={styles.containerImage}>
            <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
            <View style={styles.textContainer}>
                <Text style={styles.question}>Ajouter des déchets</Text>
            </View>
            <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
        </View>

        <View style={styles.vueDescription}>
            <Text style={styles.textDescription}>Vous êtes sur cette page pour pouvoir participer à l'aventure Clearbin ! </Text>
            <Text style={styles.textDescription}>S'il manque des informations sur cette application n'hésitez pas à les rajouter vous même en remplissant ce formulaire </Text>
        </View>
        
        <View style={styles.icon}>
        <Ionicons name="document-text-outline" size={30} color='#0E5CAD' />
        <Text style={styles.form}> Formulaire d'ajout de déchet </Text>
        </View>  
        
        <View style={styles.vueform}>
        <View style={styles.vueAjout}>
            <Text style={styles.descriptionAjout}>Nom du déchet</Text>
            <TextInput
            style={styles.input}
            value={nomDéchets}
            onChangeText={setNomDéchets}
            placeholder="Entrer un nom de déchet"
            />
        </View>
        
        <View style={styles.vueAjout}>
        <Text style={styles.descriptionAjout}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Entrer sa description"
        />
        </View>
        
        <View style={styles.vueSwitchcentre}>
        <View style={styles.vueAjout}>
          <Text style={styles.descriptionAjout}>Est ce que le déchet peut être dangereux ?</Text>
          <Text style={styles.aide}>Si oui vous pouvez cocher le bouton</Text>
          <Switch value={danger} onValueChange={setDanger} />
        </View>
        </View>
  
        {/* Menu déroulant pour sélectionner le bac */}
        <View style={styles.vueAjout}>
          <Text style={styles.descriptionAjout}>Couleur du bac</Text>
          <Picker
                selectedValue={selectedBac}
                onValueChange={value => setSelectedBac(value)}
                >
                <Picker.Item label="Sélectionner un bac" value={null} />
                {bacs.map(bac => (
                    <Picker.Item key={bac.value} label={bac.nom} value={bac.value} />
                ))}
                </Picker>
        </View>
  
        <Button style={styles.bouton} title="Ajouter le déchet" onPress={handleSubmit} />
        </View>
      </View>
      </ScrollView>
    );
  };

  export default InfosAddScreen;


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
      question: {
        fontSize: 25,
        paddingBottom: 10,
        marginBottom: 5,
        marginTop: 10,
        textAlign: "center"
      },
      descriptionAjout : {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 1, 
        color : "#0E5CAD"
      }, 
      input : {
        fontSize: 18,
        fontStyle : 'italic', 
        padding : 8,
        backgroundColor : 'white' , 
        borderRadius : 10, 
      }, 
      vueAjout : {
        marginVertical : 15,
        marginHorizontal : 20, 
      }, 
      vueSwitchcentre : {
        alignItems: 'center', 
      },
      vueDescription : {
        marginVertical : 10,
        marginHorizontal : 5, 
      },
      textDescription : {
        textAlign :'center', 
        fontSize: 16,
        marginVertical : 10,
        marginHorizontal : 20, 
      }, 
      bouton : {
      }, 
      aide: {
        fontSize : 14, 
        textAlign: 'center', 
        fontStyle : 'italic', 
        color : 'gray', 
      }, 
      form : {
        fontSize : 24, 
        fontWeight:'bold', 
        color : "#0E5CAD",
      }, 
      vueform : {
        borderColor : "#0E5CAD", 
        borderWidth : 2, 
        padding : 10,
        marginVertical:10, 
        borderRadius : 5
      }, 
      icon : {
        flexDirection: 'row',
      }, 
});