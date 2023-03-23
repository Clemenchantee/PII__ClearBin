import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

const DechetListe = ({ cocktails, navigation }) => {
  if (cocktails.length > 0)
    return (
      <FlatList
        style={styles.cocktailList}
        data={cocktails}
        keyExtractor={(cocktail) => cocktail.id.toString()}
        renderItem={({ item }) => {
          return <CocktailItem cocktail={item} navigation={navigation} />;
        }}
      />
    );
  else
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nothing to drink yet!</Text>
      </View>
    );
};

export default CocktailList;

const styles = StyleSheet.create({
  cocktailList: {
    flex: 1,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
