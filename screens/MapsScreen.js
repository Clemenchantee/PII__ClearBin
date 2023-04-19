import React from "react";
import { Text, View, Button, Image, StyleSheet} from "react-native";
import { useState, useEffect } from 'react';
import 'firebase/firestore';
import { getDocs } from "firebase/firestore";
import MapView, { Marker } from 'react-native-maps';

const MapsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.titre}>Bienvenue à Bordeaux</Text>
        </View>
        <Image style={styles.image} source={require('../assets/ClearBin_App.png')} />
      </View>

      <Text>Je n'arrive pas à mettre la maps et je n'ai pas le temps</Text>

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
          title="My Marker"
          description="Some description"
        />
      </MapView>
    </View>
  );
};

export default MapsScreen;


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
  }
});



