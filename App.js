import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import firebase from 'firebase';
import { db } from './firebase';
firebase.PIIClearBin();

export default function App() {
  return (
    <View style={styles.header}>
      <Image style={styles.logo}
        source={require('./assets/ClearBin_Long.png')} />
      <Text style={styles.police}> Bienvenue sur ClearBin ! </Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'B3DED7',
    alignItems: 'center',
    marginTop : 50,
  },

  logo:{
    height: 50,
    width: 300,
    alignItems: 'center'
  }, 

  police :{
    fontWeight: 'bold',
    fontSize : 15,
  }
});
