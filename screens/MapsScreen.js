import React from "react";
import { Text, View, Image, StyleSheet, ScrollView} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// Pour la maps 
//import MapView, { Marker } from 'react-native-maps';

const MapsScreen = () => {
  

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.titre}>Bienvenue à Bordeaux</Text>
        </View>
        <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
      </View>

        <View  style={styles.icon}> 
          <Ionicons name="location-outline" size={30} color='#0E5CAD' />
          <Text style={styles.textDescription}>Point de collecte de verre à Bordeaux</Text>
        </View>

      <View style={styles.containerImage}>
        <Image style={styles.imageCarte} source={require('../assets/poubelleVerre.png')} />
      </View>

    {/* Tentative d'insérer une carte maps mais pas le temps d'aller jusqu'au bout du processus
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Ma maps"
          description="Bordeaux"
        />
      </MapView>*/}

    </View>
    </ScrollView>
  );
};

export default MapsScreen;


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:"#DDF3EF",
    padding : 10, 
  },
  containerImage:{
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
  textDescription:{
    fontSize : 18, 
    textAlign: 'center', 
    marginHorizontal:5,
    marginVertical: 5,
  },
  icon : {
    flexDirection: 'row',
    alignItems : 'center',
    marginHorizontal : 2,
  },
  imageCarte :{
    height : 550, 
    width: 350,
    borderRadius : 5, 
    borderWidth: 5, 
    borderColor: "#0E5CAD", 
  }
});



